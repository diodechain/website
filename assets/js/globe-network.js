(function () {
  var POINTS = window.DIODE_NETWORK_POINTS || [];
  var CONTAINER_ID = 'globe-network';
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
      if (!isDragging) return;
      var deltaX = e.clientX - lastClientX;
      var deltaY = e.clientY - lastClientY;
      rotationY += deltaX * DRAG_SENSITIVITY;
      rotationX += deltaY * DRAG_SENSITIVITY;
      rotationX = Math.max(ROTATION_X_MIN, Math.min(ROTATION_X_MAX, rotationX));
      velocityX = deltaY * DRAG_SENSITIVITY * INERTIA_TRANSFER;
      velocityY = deltaX * DRAG_SENSITIVITY * INERTIA_TRANSFER;
      lastClientX = e.clientX;
      lastClientY = e.clientY;
    }

    function showTooltip(pointData, clientX, clientY) {
      var tip = tooltipEl || document.getElementById('globe-network-tooltip');
      if (!tip) return;
      var city = pointData.city || '';
      var country = pointData.country || '';
      var locationText = city && country ? city + ', ' + country : (city || country || 'Unknown');
      var prenetUrl = (typeof window.location !== 'undefined' && window.location.pathname) ? window.location.origin + '/prenet/#/network' : '/prenet/#/network';
      tip.innerHTML = '<div class="globe-tooltip__inner">' +
        '<strong>Location:</strong> ' + escapeHtml(locationText) + '<br>' +
        '<a href="' + prenetUrl + '">View on Network Map</a>' +
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
      function animate() {
        if (!el.isConnected) return;
        requestAnimationFrame(animate);
        var dt = clock.getDelta();
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
        globeGroup.rotation.x = rotationX;
        globeGroup.rotation.y = rotationY;
        renderer.render(scene, camera);
      }
      animate();
    }

    // Points (radius 0.025; globe mesh is skipped when picking so click still works)
    var pointGeom = new THREE.SphereGeometry(0.025, 8, 6);
    var pointMat = new THREE.MeshBasicMaterial({ color: 0xf15d2f });
    POINTS.forEach(function (p) {
      var pos = latLngToVector3MatchingMap(p.lat, p.lng);
      var mesh = new THREE.Mesh(pointGeom, pointMat.clone());
      mesh.position.copy(pos);
      mesh.userData = p;
      pointsGroup.add(mesh);
    });
    globeGroup.add(pointsGroup);

    if (mapImageUrl) {
      createMapTexture(mapImageUrl, buildGlobe);
    } else {
      buildGlobe(null);
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
