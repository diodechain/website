(function () {
  var CONTAINER_ID = 'globe-network';
  var RPC_WS_URL = window.DIODE_GLOBE_RPC_WS || 'wss://prenet.diode.io:8443/ws';
  var IP_GEO_URL = window.DIODE_GLOBE_IP_GEO || 'https://monitor.testnet.diode.io/ip/';
  var RADIUS = 1;
  var ROTATION_SPEED = 0.15;
  var MAP_CANVAS_W = 1024;
  var MAP_CANVAS_H = 512;
  var DRAG_SENSITIVITY = 0.004;
  var INERTIA_FRICTION = 0.94;
  var INERTIA_TRANSFER = 0.25;
  var ROTATION_X_MIN = -Math.PI / 2 + 0.15;
  var ROTATION_X_MAX = Math.PI / 2 - 0.15;

  function latLngToVector3(lat, lng) {
    var phi = (90 - lat) * (Math.PI / 180);
    var theta = (lng + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -RADIUS * Math.sin(phi) * Math.cos(theta),
      RADIUS * Math.cos(phi),
      RADIUS * Math.sin(phi) * Math.sin(theta)
    );
  }

  /**
   * Map projection config (override via window.DIODE_GLOBE_MAP_CONFIG or _data/globe_map_config.json).
   * Must match the world-map.svg / prenet projection:
   *   viewBoxWidth, viewBoxHeight: SVG viewBox (e.g. 1000 x 647).
   *   bboxX, bboxY, bboxW, bboxH: Mercator bounds used to scale (x_raw, y_raw) into viewBox (prenet bbox).
   *   lon0: Longitude center (degrees). 0 = Greenwich.
   *   textureNorthAtTop: true if SVG y=0 is north (prenet convention).
   */
  var MAP_CONFIG = (function () {
    var c = window.DIODE_GLOBE_MAP_CONFIG || {};
    return {
      viewBoxWidth: c.viewBoxWidth != null ? c.viewBoxWidth : 1000,
      viewBoxHeight: c.viewBoxHeight != null ? c.viewBoxHeight : 647,
      bboxX: c.bboxX != null ? c.bboxX : -3141.59,
      bboxY: c.bboxY != null ? c.bboxY : -2891.13,
      bboxW: c.bboxW != null ? c.bboxW : 6283.19,
      bboxH: c.bboxH != null ? c.bboxH : 4064.12,
      lon0: c.lon0 != null ? c.lon0 : 0,
      textureNorthAtTop: c.textureNorthAtTop !== false
    };
  })();

  function geographicToSvg(lat, lng) {
    var lon0 = MAP_CONFIG.lon0;
    var clon = lng - lon0;
    if (clon < -180) clon += 360;
    else if (clon > 180) clon -= 360;
    var lam = clon * (Math.PI / 180);
    var phi = -lat * (Math.PI / 180);
    var xRaw = lam * 1000;
    var yRaw = Math.log((1 + Math.sin(phi)) / Math.cos(phi)) * 1000;
    var x = ((xRaw - MAP_CONFIG.bboxX) / MAP_CONFIG.bboxW) * MAP_CONFIG.viewBoxWidth;
    var y = ((yRaw - MAP_CONFIG.bboxY) / MAP_CONFIG.bboxH) * MAP_CONFIG.viewBoxHeight;
    return { x: x, y: y };
  }

  function svgToVector3(xSvg, ySvg) {
    var u = xSvg / MAP_CONFIG.viewBoxWidth;
    var v = MAP_CONFIG.textureNorthAtTop ? (1 - ySvg / MAP_CONFIG.viewBoxHeight) : (ySvg / MAP_CONFIG.viewBoxHeight);
    u = Math.max(0, Math.min(1, u));
    v = Math.max(0, Math.min(1, v));
    var latDeg = (v - 0.5) * 180;
    var lonDeg = (u - 0.5) * 360;
    return latLngToVector3(latDeg, lonDeg);
  }

  function latLngToVector3MatchingMap(lat, lng) {
    var svg = geographicToSvg(lat, lng);
    return svgToVector3(svg.x, svg.y);
  }

  function isLocalIP(ip) {
    if (!ip || typeof ip !== 'string') return true;
    if (ip.indexOf('127.') === 0 || ip.indexOf('10.') === 0 || ip.indexOf('192.168') === 0) return true;
    if (ip.indexOf('172.') === 0) {
      var parts = ip.split('.');
      if (parts.length >= 2 && parseInt(parts[1], 10) >= 16 && parseInt(parts[1], 10) < 32) return true;
    }
    return false;
  }

  function fetchNetworkPoints(onPoint) {
    var staticFallback = window.DIODE_NETWORK_POINTS;
    var done = false;
    function useStatic() {
      if (done || !staticFallback || !Array.isArray(staticFallback)) return;
      done = true;
      staticFallback.forEach(function (p) {
        if (p && typeof p.lat === 'number' && typeof p.lng === 'number') onPoint(p);
      });
    }
    var fallbackTimer = setTimeout(function () { ws.close(); useStatic(); }, 12000);
    var ws = new WebSocket(RPC_WS_URL);
    ws.onopen = function () {
      ws.send(JSON.stringify({ jsonrpc: '2.0', method: 'dio_network', params: [], id: 1 }));
    };
    ws.onmessage = function (event) {
      try {
        var msg = JSON.parse(event.data);
        if (!msg.result) return;
        var result = Array.isArray(msg.result) ? msg.result : (msg.result.nodes || msg.result.entries || []);
        if (!Array.isArray(result) || result.length === 0) return;
        clearTimeout(fallbackTimer);
        done = true;
        ws.close();
        var byIp = {};
        result.forEach(function (entry) {
          var node = entry[1] != null ? entry[1] : entry.node;
          var nodeId = entry[0] != null ? entry[0] : entry.node_id;
          if (!node || nodeId == null) return;
          var ip = Array.isArray(node) ? node[1] : (node.ip || node.address || node[1]);
          if (!ip || typeof ip !== 'string' || isLocalIP(ip)) return;
          if (!byIp[ip]) byIp[ip] = { nodeIds: [] };
          byIp[ip].nodeIds.push(nodeId);
        });
        var ips = Object.keys(byIp);
        if (ips.length === 0) {
          ws.close();
          useStatic();
          return;
        }
        ips.forEach(function (ip) {
          var nodeIds = byIp[ip].nodeIds;
          fetch(IP_GEO_URL + ip, { headers: { 'Accept': 'application/json' } })
            .then(function (r) { return r.json(); })
            .then(function (loc) {
              if (!loc) return;
              var lat = loc.latitude != null ? Number(loc.latitude) : null;
              var lng = loc.longitude != null ? Number(loc.longitude) : null;
              if (lat == null || lng == null || isNaN(lat) || isNaN(lng)) return;
              var countryCode = loc.country_code || loc.countryCode || '';
              nodeIds.forEach(function (nodeId) {
                onPoint({
                  lat: lat,
                  lng: lng,
                  city: loc.city || '',
                  countryCode: countryCode,
                  nodeId: nodeId,
                  ip: ip
                });
              });
            })
            .catch(function () {});
        });
      } catch (e) {}
    };
    ws.onerror = function () { clearTimeout(fallbackTimer); ws.close(); useStatic(); };
    ws.onclose = function () { if (!done) useStatic(); };
  }

  function createMapTexture(mapImageUrl, callback) {
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function () {
      var canvas = document.createElement('canvas');
      canvas.width = MAP_CANVAS_W;
      canvas.height = MAP_CANVAS_H;
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, canvas.width, canvas.height);

      var vw = MAP_CONFIG.viewBoxWidth;
      var vh = MAP_CONFIG.viewBoxHeight;
      var scaleX = MAP_CANVAS_W / vw;
      var scaleY = MAP_CANVAS_H / vh;

      ctx.strokeStyle = 'rgba(40,40,40,0.2)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      var lngStep = 15;
      var lng = -180;
      while (lng <= 180) {
        var s = geographicToSvg(0, lng);
        var x = s.x * scaleX;
        if (x >= 0 && x <= MAP_CANVAS_W) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, MAP_CANVAS_H);
        }
        lng += lngStep;
      }
      var latStep = 15;
      var lat = -60;
      while (lat <= 60) {
        var s = geographicToSvg(lat, 0);
        var y = s.y * scaleY;
        if (y >= 0 && y <= MAP_CANVAS_H) {
          ctx.moveTo(0, y);
          ctx.lineTo(MAP_CANVAS_W, y);
        }
        lat += latStep;
      }
      ctx.stroke();

      var texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      callback(texture);
    };
    img.onerror = function () { callback(null); };
    img.src = mapImageUrl;
  }

  function init() {
    var el = document.getElementById(CONTAINER_ID);
    if (!el || !window.THREE) return;

    tooltipEl = document.getElementById('globe-network-tooltip');
    var size = Math.min(el.offsetWidth, el.offsetHeight);
    var width = size;
    var height = size;
    var mapImageUrl = el.getAttribute('data-world-map') || '';

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 2.8;

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.innerHTML = '';
    el.appendChild(renderer.domElement);

    var sphereGeom = new THREE.SphereGeometry(RADIUS, 32, 24);
    var globe;
    var pointsGroup = new THREE.Group();
    var globeGroup = new THREE.Group();
    scene.add(globeGroup);

    var rotationX = 0;
    var rotationY = 0;
    var velocityX = 0;
    var velocityY = 0;
    var isDragging = false;
    var lastClientX = 0;
    var lastClientY = 0;
    var dragStartX = 0;
    var dragStartY = 0;
    var canvas = null;
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var tooltipEl = null;
    var autoRotationStopped = false;

    function buildGlobe(texture) {
      var sphereMat;
      if (texture) {
        texture.transparent = true;
        sphereMat = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          opacity: 1,
          side: THREE.DoubleSide,
          depthWrite: true
        });
      } else {
        sphereMat = new THREE.MeshBasicMaterial({
          color: 0x1a1a2e,
          wireframe: true,
          transparent: true,
          opacity: 0.6
        });
      }
      globe = new THREE.Mesh(sphereGeom, sphereMat);
      globeGroup.add(globe);
      runAnimation();
    }

    function onMouseDown(e) {
      if (!globe || e.button !== 0) return;
      e.preventDefault();
      autoRotationStopped = true;
      hideTooltip();
      isDragging = true;
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      if (canvas) canvas.style.cursor = 'grabbing';
    }

    function onMouseMove(e) {
      if (isDragging) {
        var deltaX = e.clientX - lastClientX;
        var deltaY = e.clientY - lastClientY;
        rotationY += deltaX * DRAG_SENSITIVITY;
        rotationX += deltaY * DRAG_SENSITIVITY;
        rotationX = Math.max(ROTATION_X_MIN, Math.min(ROTATION_X_MAX, rotationX));
        velocityX = deltaY * DRAG_SENSITIVITY * INERTIA_TRANSFER;
        velocityY = deltaX * DRAG_SENSITIVITY * INERTIA_TRANSFER;
        lastClientX = e.clientX;
        lastClientY = e.clientY;
      } else if (canvas) {
        var rect = canvas.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        scene.updateMatrixWorld(true);
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects([globeGroup], true);
        var overPoint = false;
        for (var i = 0; i < intersects.length; i++) {
          if (intersects[i].object.userData && intersects[i].object.userData.lat != null) {
            overPoint = true;
            break;
          }
        }
        canvas.style.cursor = overPoint ? 'pointer' : 'grab';
      }
    }

    function showTooltip(pointData, clientX, clientY) {
      var tip = tooltipEl || document.getElementById('globe-network-tooltip');
      if (!tip) return;
      var city = pointData.city || '';
      var countryCode = pointData.countryCode || pointData.country || '';
      var locationText = city && countryCode ? city + ', ' + countryCode : (city || countryCode || 'Unknown');
      var base = (typeof window.location !== 'undefined' && window.location.origin) ? window.location.origin : '';
      var nodeBase = base + '/network/#/node/';
      var networkMapSectionUrl = 'https://diodenetwork.io/#network-map-section';
      var nodeEntries = pointData.nodeEntries || [];
      var nodeIds = pointData.nodeIds || [];
      if (nodeEntries.length === 0 && nodeIds.length > 0) {
        nodeIds.forEach(function (id) { nodeEntries.push({ nodeId: id, ip: '' }); });
      }
      var linkParts = [];
      var n = Math.min(3, nodeEntries.length);
      var targetBlank = ' target="_blank" rel="noopener noreferrer"';
      for (var i = 0; i < n; i++) {
        var ent = nodeEntries[i];
        var nodeId = ent.nodeId != null ? ent.nodeId : nodeIds[i];
        var label = (ent.ip ? escapeHtml(ent.ip) + ' ' : '') + '(' + escapeHtml(truncateAddress(nodeId)) + ')';
        if (!label.trim()) label = 'View node';
        linkParts.push('<a href="' + nodeBase + encodeURIComponent(nodeId) + '"' + targetBlank + '>' + label + '</a>');
      }
      if (nodeEntries.length > 3) {
        linkParts.push('<a href="' + networkMapSectionUrl + '"' + targetBlank + '>' + (nodeEntries.length - 3) + ' more...</a>');
      }
      if (linkParts.length === 0) {
        linkParts.push('<a href="' + networkMapSectionUrl + '"' + targetBlank + '>View on Network Map</a>');
      }
      tip.innerHTML = '<div class="globe-tooltip__inner">' +
        escapeHtml(locationText) + '<br>' +
        '<div class="globe-tooltip__links">' + linkParts.join('<br>') + '</div>' +
        '</div>';
      tip.setAttribute('aria-hidden', 'false');
      tip.style.display = 'block';
      var rect = tip.getBoundingClientRect();
      var offset = 12;
      var left = clientX + offset;
      var top = clientY + offset;
      if (left + rect.width > window.innerWidth) left = clientX - rect.width - offset;
      if (top + rect.height > window.innerHeight) top = clientY - rect.height - offset;
      if (left < 0) left = offset;
      if (top < 0) top = offset;
      tip.style.left = left + 'px';
      tip.style.top = top + 'px';
    }

    function hideTooltip() {
      var tip = tooltipEl || document.getElementById('globe-network-tooltip');
      if (!tip) return;
      tip.style.display = 'none';
      tip.setAttribute('aria-hidden', 'true');
    }

    function escapeHtml(str) {
      var div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }

    function truncateAddress(id) {
      if (id == null) return '';
      var s = String(id);
      if (s.length <= 14) return s;
      if (s.indexOf('0x') === 0) return s.slice(0, 6) + '\u2026' + s.slice(-4);
      return s.slice(0, 6) + '\u2026' + s.slice(-4);
    }

    function onMouseUp(e) {
      if (!isDragging) return;
      var wasDragging = isDragging;
      isDragging = false;
      if (canvas) canvas.style.cursor = 'grab';

      if (wasDragging && e && e.button === 0 && canvas) {
        var dx = e.clientX - dragStartX;
        var dy = e.clientY - dragStartY;
        if (dx * dx + dy * dy < 36) {
          var rect = canvas.getBoundingClientRect();
          mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
          scene.updateMatrixWorld(true);
          raycaster.setFromCamera(mouse, camera);
          var intersects = raycaster.intersectObjects([globeGroup], true);
          var pointHit = null;
          for (var i = 0; i < intersects.length; i++) {
            var obj = intersects[i].object;
            if (obj.userData && obj.userData.lat != null) {
              pointHit = obj.userData;
              break;
            }
          }
          if (pointHit) {
            showTooltip(pointHit, e.clientX, e.clientY);
          } else {
            hideTooltip();
          }
        }
      }
    }

    function runAnimation() {
      canvas = renderer.domElement;
      canvas.style.cursor = 'grab';
      canvas.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      canvas.addEventListener('mouseleave', onMouseUp);

      var clock = new THREE.Clock();
      var glowStates = [];
      var GLOW_BURST_SIZE = 5;
      var GLOW_DURATION = 1.4;
      var GLOW_PEAK_OPACITY = 0.95;
      var GLOW_START_DELAY = 0.5;
      var BURST_2_DELAY = 0.35;
      var PAUSE_AFTER_BURSTS = 1.5;
      var glowBurstPhase = 0;
      var glowNextTime = GLOW_START_DELAY;

      function pickRandomGlowIndices(count, excludeIndices) {
        var n = glowMeshes.length;
        if (n === 0 || count <= 0) return [];
        var exclude = {};
        for (var i = 0; i < excludeIndices.length; i++) exclude[excludeIndices[i]] = true;
        var candidates = [];
        for (var j = 0; j < n; j++) if (!exclude[j]) candidates.push(j);
        var result = [];
        for (var k = 0; k < count && candidates.length > 0; k++) {
          var idx = Math.floor(Math.random() * candidates.length);
          result.push(candidates[idx]);
          exclude[candidates[idx]] = true;
          candidates.splice(idx, 1);
        }
        return result;
      }

      function startGlowBurst(count, now) {
        var activeIndices = glowStates.map(function (g) { return g.index; });
        var indices = pickRandomGlowIndices(count, activeIndices);
        for (var i = 0; i < indices.length; i++) {
          glowStates.push({
            index: indices[i],
            startTime: now,
            duration: GLOW_DURATION
          });
        }
      }

      function animate() {
        if (!el.isConnected) return;
        requestAnimationFrame(animate);
        var dt = clock.getDelta();
        var now = clock.getElapsedTime();

        if (!isDragging) {
          rotationX += velocityX;
          rotationY += velocityY;
          rotationX = Math.max(ROTATION_X_MIN, Math.min(ROTATION_X_MAX, rotationX));
          velocityX *= INERTIA_FRICTION;
          velocityY *= INERTIA_FRICTION;
          if (Math.abs(velocityX) < 1e-5) velocityX = 0;
          if (Math.abs(velocityY) < 1e-5) velocityY = 0;
          if (!autoRotationStopped && Math.abs(velocityX) < 1e-5 && Math.abs(velocityY) < 1e-5) {
            rotationY += ROTATION_SPEED * dt;
          }
        }

        if (glowMeshes.length > 0) {
          scene.updateMatrixWorld(true);
          for (var gi = 0; gi < glowMeshes.length; gi++) {
            glowMeshes[gi].mesh.lookAt(camera.position);
          }
          for (var i = glowStates.length - 1; i >= 0; i--) {
            var g = glowStates[i];
            var t = (now - g.startTime) / g.duration;
            if (t >= 1) {
              glowMeshes[g.index].material.opacity = 0;
              glowStates.splice(i, 1);
            } else {
              glowMeshes[g.index].material.opacity = GLOW_PEAK_OPACITY * Math.sin(Math.PI * t);
            }
          }
          if (glowBurstPhase === 0 && now >= glowNextTime) {
            startGlowBurst(GLOW_BURST_SIZE, now);
            glowBurstPhase = 1;
            glowNextTime = now + BURST_2_DELAY;
          } else if (glowBurstPhase === 1 && now >= glowNextTime) {
            startGlowBurst(GLOW_BURST_SIZE, now);
            glowBurstPhase = 2;
          } else if (glowBurstPhase === 2 && glowStates.length === 0) {
            glowBurstPhase = 0;
            glowNextTime = now + PAUSE_AFTER_BURSTS;
          }
        }

        globeGroup.rotation.x = rotationX;
        globeGroup.rotation.y = rotationY;
        renderer.render(scene, camera);
      }
      animate();
    }

    // Points: clustered by overlap; one sphere per cluster, size proportional to count
    var pointRadiusBase = 0.01875;
    var OVERLAP_THRESHOLD = 0.045;
    var clusters = [];
    var pointMatOuter = new THREE.MeshBasicMaterial({
      color: 0xf15d2f,
      transparent: true,
      opacity: 0.5
    });
    var pointMatInner = new THREE.MeshBasicMaterial({ color: 0xf15d2f });
    var glowMeshes = [];

    function scaleRadius(n) {
      return Math.pow(n, 0.4);
    }

    function createClusterMeshes(centerLat, centerLng, count, representative, nodeEntries) {
      var s = scaleRadius(count);
      var rOuter = pointRadiusBase * s;
      var rInner = rOuter * 0.35;
      var rGlow = rOuter * 1.3;
      var pos = latLngToVector3MatchingMap(centerLat, centerLng);
      var geomOuter = new THREE.SphereGeometry(rOuter, 8, 6);
      var geomInner = new THREE.SphereGeometry(rInner, 8, 6);
      var ringInner = rGlow * 0.97;
      var ringOuter = rGlow * 1.03;
      var geomGlow = new THREE.RingGeometry(ringInner, ringOuter, 64);
      var outerMesh = new THREE.Mesh(geomOuter, pointMatOuter.clone());
      outerMesh.position.copy(pos);
      var entries = nodeEntries || [];
      var nodeIds = entries.map(function (e) { return e.nodeId; });
      outerMesh.userData = {
        lat: representative.lat,
        lng: representative.lng,
        city: representative.city || '',
        countryCode: representative.countryCode || '',
        count: count,
        nodeEntries: entries,
        nodeIds: nodeIds
      };
      pointsGroup.add(outerMesh);
      var innerMesh = new THREE.Mesh(geomInner, pointMatInner.clone());
      innerMesh.position.copy(pos);
      pointsGroup.add(innerMesh);
      var glowMat = new THREE.MeshBasicMaterial({
        color: 0xaaefff,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        depthTest: false,
        side: THREE.DoubleSide
      });
      var glowMesh = new THREE.Mesh(geomGlow, glowMat);
      glowMesh.position.copy(pos);
      pointsGroup.add(glowMesh);
      return { outerMesh: outerMesh, innerMesh: innerMesh, glowMesh: glowMesh, glowMat: glowMat };
    }

    function removeClusterMeshes(cluster) {
      pointsGroup.remove(cluster.outerMesh);
      pointsGroup.remove(cluster.innerMesh);
      pointsGroup.remove(cluster.glowMesh);
    }

    function addPoint(p) {
      var pos = latLngToVector3MatchingMap(p.lat, p.lng);
      for (var i = 0; i < clusters.length; i++) {
        var c = clusters[i];
        var cPos = latLngToVector3MatchingMap(c.center.lat, c.center.lng);
        if (pos.distanceTo(cPos) < OVERLAP_THRESHOLD) {
          removeClusterMeshes(c);
          if (p.nodeId != null) c.nodeEntries.push({ nodeId: p.nodeId, ip: p.ip || '' });
          var newCount = c.count + 1;
          var meshes = createClusterMeshes(c.center.lat, c.center.lng, newCount, c.representative, c.nodeEntries);
          c.outerMesh = meshes.outerMesh;
          c.innerMesh = meshes.innerMesh;
          c.glowMesh = meshes.glowMesh;
          c.glowMat = meshes.glowMat;
          c.count = newCount;
          glowMeshes[c.glowIndex] = { material: meshes.glowMat, mesh: meshes.glowMesh };
          return;
        }
      }
      var nodeEntries = p.nodeId != null ? [{ nodeId: p.nodeId, ip: p.ip || '' }] : [];
      var meshes = createClusterMeshes(p.lat, p.lng, 1, p, nodeEntries);
      clusters.push({
        center: { lat: p.lat, lng: p.lng },
        representative: { lat: p.lat, lng: p.lng, city: p.city || '', countryCode: p.countryCode || '' },
        nodeEntries: nodeEntries,
        count: 1,
        outerMesh: meshes.outerMesh,
        innerMesh: meshes.innerMesh,
        glowMesh: meshes.glowMesh,
        glowMat: meshes.glowMat,
        glowIndex: glowMeshes.length
      });
      glowMeshes.push({ material: meshes.glowMat, mesh: meshes.glowMesh });
    }

    globeGroup.add(pointsGroup);

    if (mapImageUrl) {
      createMapTexture(mapImageUrl, function (texture) {
        buildGlobe(texture);
        fetchNetworkPoints(addPoint);
      });
    } else {
      buildGlobe(null);
      fetchNetworkPoints(addPoint);
    }

    function onResize() {
      var size = Math.min(el.offsetWidth, el.offsetHeight);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
      renderer.setSize(size, size);
    }
    window.addEventListener('resize', onResize);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
