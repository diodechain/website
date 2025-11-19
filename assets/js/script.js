var ready = (callback) => {
  if (document.readyState !== 'loading') callback();
  else document.addEventListener('DOMContentLoaded', callback);
}

// On Ready
ready(() => {
  initPopup();
  initVideoPopup();
  initStoryVideos();
  initTestimonials();
  initPartners();
  initTags();
  initScroll();
  initOS();
  initReveal();
  initRedirect();
});

function initPopup() {
  function preventDefault(e) {
    e.preventDefault();
  }

  // left: 37, up: 38, right: 39, down: 40, spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  var keys = {37: 1, 38: 1, 39: 1, 40: 1};

  function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  }

  // modern Chrome requires { passive: false } when adding event
  var supportsPassive = false;
  try {
    window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
      get: function () {
        supportsPassive = true;
      }
    }));
  } catch (e) {
  }
  var wheelOpt = supportsPassive ? {passive: false} : false;
  var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

  function disableScroll() {
    if (window.innerHeight > 600) {
      window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
      window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
      window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
      window.addEventListener('keydown', preventDefaultForScrollKeys, false);
    }
  }

  function enableScroll() {
    if (window.innerHeight > 600) {
      window.removeEventListener('DOMMouseScroll', preventDefault, false);
      window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
      window.removeEventListener('touchmove', preventDefault, wheelOpt);
      window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
    }
  }

  function togglePopup(event) {
    var target = event.currentTarget.area, isNavbar = event.currentTarget.navbar;
    if (target) {
      if (target.classList.contains('visible')) {
        setTimeout(function () {
          target.classList.remove('open');
          if (isNavbar) {
            document.body.classList.remove('menu-open');
            //enableScroll();
          }
          setTimeout(function () {
            target.classList.remove('visible');
          }, 250);
        }, 25);
      } else {
        target.classList.add('visible');
        setTimeout(function () {
          target.classList.add('open');
        }, 25);
        setTimeout(function () {
          if (isNavbar) {
            document.body.classList.add('menu-open');
            //disableScroll();
          }
        }, 300);
      }
    }
    return false;
  }

  function showPopup(target) {
    target.classList.add('visible');
    setTimeout(function () {
      target.classList.add('open');
    }, 25);
    setTimeout(function () {
      if (isNavbar) {
        document.body.classList.add('menu-open');
      }
    }, 300);
    return false;
  }

  function closePopups(event) {
    var target = event.target.closest('.popup');
    setTimeout(function () {
      target.classList.remove('open');
      setTimeout(function () {
        target.classList.remove('visible');
      }, 250);
    }, 25);
    return false;
  }

  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function acceptConsent(event) {
    setCookie('Consent_Status', 'granted', 90);
    closePopups.call(this, event);
  }

  function rejectConsent(event) {
    setCookie('Consent_Status', 'denied', 90);
    closePopups.call(this, event);
  }

  var navbar = document.querySelector('.header__nav'),
    toggle = document.querySelector('.header__toggle'),
    close = navbar.querySelector('.header__close');

  toggle.area = navbar;
  toggle.navbar = true;
  toggle.addEventListener('click', togglePopup, false);

  close.area = navbar;
  close.navbar = true;
  close.addEventListener('click', togglePopup, false);

  document.querySelectorAll('.close-nav').forEach((link) => {
    link.area = navbar;
    link.addEventListener('click', togglePopup, false);
    link.navbar = true;
  });

  document.querySelectorAll('.popup-open').forEach((link) => {
    var target = link.getAttribute('href'),
      popup = document.querySelector(target);
    link.area = popup;
    link.addEventListener('click', togglePopup, false);
  });

  document.querySelectorAll('.popup').forEach((popup) => {
    let link = popup.querySelector('.popup__close');
    if (link) {
      link.area = popup;
      link.addEventListener('click', closePopups, false);
    }
  });

  let c = getCookie('Consent_Status');
  if (!c) {
    document.querySelectorAll('.cookies-consent').forEach((consent) => {
      consent.querySelector('.cookie-accept').addEventListener('click', acceptConsent, false);
      consent.querySelector('.cookie-reject').addEventListener('click', rejectConsent, false);
    });

    let t = document.querySelector('#cookies-consent');
    showPopup(t);
  }
}

function initVideoPopup() {
  // Create video popup element if it doesn't exist
  let videoPopup = document.querySelector('.popup--video');
  if (!videoPopup) {
    videoPopup = document.createElement('div');
    videoPopup.className = 'popup popup--video';
    videoPopup.innerHTML = `
      <div class="popup--video__container">
        <video class="popup--video__video" controls autoplay muted></video>
        <div class="popup--video__close"></div>
      </div>
      <div class="popup--video__background"></div>
    `;
    document.body.appendChild(videoPopup);
  }

  const videoElement = videoPopup.querySelector('.popup--video__video');
  const closeButton = videoPopup.querySelector('.popup--video__close');
  const background = videoPopup.querySelector('.popup--video__background');

  // Handle video popup triggers
  document.querySelectorAll('.popup-video-trigger').forEach((trigger) => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      const videoSource = this.getAttribute('data-video-source');
      if (videoSource) {
        // Reset video
        videoElement.pause();
        videoElement.currentTime = 0;
        videoElement.src = videoSource;
        videoElement.load(); // Force reload
        
        // Add error handling
        videoElement.addEventListener('error', function(e) {
          console.error('Video error:', e);
          console.error('Video error details:', videoElement.error);
        }, { once: true });
        
        videoPopup.classList.add('visible');
        setTimeout(function() {
          videoPopup.classList.add('open');
          // Wait for video to have enough data before playing
          const tryPlay = () => {
            if (videoElement.readyState >= 2) {
              videoElement.play().catch(function(error) {
                console.log('Autoplay prevented or play failed:', error);
                // User can click play manually
              });
            }
          };
          
          // Try immediately if ready
          tryPlay();
          
          // Also wait for canplay event (video has enough data to start)
          videoElement.addEventListener('canplay', tryPlay, { once: true });
          
          // And wait for loadeddata (metadata loaded)
          videoElement.addEventListener('loadeddata', function() {
            if (videoElement.paused) {
              tryPlay();
            }
          }, { once: true });
        }, 25);
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close popup handlers
  function closeVideoPopup() {
    videoPopup.classList.remove('open');
    setTimeout(function() {
      videoPopup.classList.remove('visible');
      videoElement.pause();
      videoElement.src = '';
      document.body.style.overflow = '';
    }, 250);
  }

  closeButton.addEventListener('click', closeVideoPopup);
  background.addEventListener('click', closeVideoPopup);

  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && videoPopup.classList.contains('visible')) {
      closeVideoPopup();
    }
  });
}

function initStoryVideos() {
  // Preserve playback position and prevent unexpected resets
  document.querySelectorAll('.story__image video').forEach((video) => {
    let savedTime = 0;
    let wasPlaying = false;
    
    // Save current time periodically
    setInterval(() => {
      if (!video.ended && video.currentTime > 0) {
        savedTime = video.currentTime;
      }
    }, 1000);
    
    // If video gets reset to beginning unexpectedly, restore position
    video.addEventListener('loadeddata', function() {
      // If we have a saved time and video is at the beginning, restore it
      if (savedTime > 1 && this.currentTime < 1 && this.duration > savedTime) {
        this.currentTime = savedTime;
        if (wasPlaying) {
          this.play().catch(() => {});
        }
      }
    });
    
    // Track playing state
    video.addEventListener('play', function() {
      wasPlaying = true;
    });
    
    video.addEventListener('pause', function() {
      wasPlaying = false;
      // Save time when paused
      if (this.currentTime > 0) {
        savedTime = this.currentTime;
      }
    });
    
    // If video time jumps to 0 unexpectedly, restore
    let lastKnownTime = 0;
    video.addEventListener('timeupdate', function() {
      if (this.currentTime > 0) {
        lastKnownTime = this.currentTime;
      } else if (lastKnownTime > 1 && this.duration > lastKnownTime) {
        // Time jumped to 0 unexpectedly, restore
        this.currentTime = lastKnownTime;
      }
    });
  });
}

function initTestimonials() {
  const testimonials = document.querySelectorAll('.box__testimonials');
  testimonials.forEach((entry, index) => {
    entry.classList.add('init');
    entry.querySelector('.swiper').classList.add('testimonials-swiper-' + (index + 1));
    new Swiper('.testimonials-swiper-' + (index + 1), {
      slidesPerView: 1,
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 5000,
      },
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });
  });
}

function initPartners() {
  const partners = document.querySelectorAll('.partners');
  partners.forEach((partner, index) => {
    partner.querySelector('.partners__logos').classList.add('init');
    partner.querySelector('.swiper').classList.add('partners-swiper-' + (index + 1));
    new Swiper('.partners-swiper-' + (index + 1), {
      slidesPerView: 3,
      spaceBetween: 15,
      centeredSlides: true,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        576: {
          spaceBetween: 5
        },
        768: {
          spaceBetween: 15
        },
        1200: {
          slidesPerView: 4,
          centeredSlides: false
        },
      }
    });
  });
}

function initTags() {
  if (document.querySelector('.blog__tags')) {

    const tags = document.querySelector('.blog__tags');
    const space = document.querySelector('.blog__space');

    const fixedClass = 'blog__tags-fixed';
    const fixedClassBottom = 'blog__tags-fixed-bottom';

    let offsetTop = 526;
    let offsetbottom = 1130;

    const initOffset = () => {
      offsetTop = 526;
      offsetbottom = 1130;
      if (window.innerWidth >= 1200) {
        offsetTop = 735;
        offsetbottom = 870;
      }
    }

    let allHeight = space.getBoundingClientRect().height + tags.getBoundingClientRect().height - offsetbottom;
    setTimeout(function () {
      allHeight = space.getBoundingClientRect().height + tags.getBoundingClientRect().height - offsetbottom;
    }, 1000);

    let updating = false
    const handleScroll = () => {
      if (window.scrollY >= offsetTop || window.pageYOffset >= offsetTop) {
        tags.classList.add(fixedClass);
        if (window.scrollY >= allHeight || window.pageYOffset >= allHeight) {
          tags.classList.add(fixedClassBottom);
        } else {
          tags.classList.remove(fixedClassBottom);
        }
      } else {
        tags.classList.remove(fixedClass);
      }
      updating = false;
    }

    tags.querySelectorAll('.blog__tags-list a').forEach((link) => {
      var target = link.getAttribute('href');
      target = target.replaceAll('#', '');
      target = document.getElementById(target);
      link.addEventListener('click', function (event) {
        event.preventDefault();
        scrollToView(target);
      }, false);
    });

    window.onscroll = () => {
      if (updating) {
        return;
      } else {
        updating = true;
        requestAnimationFrame(handleScroll);
      }
    }

    window.onresize = () => {
      initOffset();
      handleScroll();
    }
    initOffset();
    handleScroll();
  }
}

function initScroll() {
  const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;

  window.scrollToView = (elem) => {
    if (supportsNativeSmoothScroll) {
      window.scrollTo({
        behavior: 'smooth',
        left: 0,
        top: elem.getBoundingClientRect().top + window.pageYOffset
      });
    } else {
      elem.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }
  }

  document.querySelectorAll('.scrollto').forEach((link) => {
    var target = link.getAttribute('href');
    target = target.replaceAll('#', '');
    target = document.getElementById(target);
    link.addEventListener('click', function (event) {
      event.preventDefault();
      scrollToView(target);
    }, false);
  });
}

function initOS() {
  let OSName = 'Unknown OS';
  if (navigator.userAgent.indexOf('Win') !== -1) {
    OSName = 'Windows';
  }
  if (navigator.userAgent.indexOf('Mac') !== -1) {
    OSName = 'MacOS';
  }
  if (navigator.userAgent.indexOf('iPod') !== -1) {
    OSName = "iOS";
  }
  if (navigator.userAgent.indexOf('iPad') !== -1) {
    OSName = "iOS";
  }
  if (navigator.userAgent.indexOf('iPhone') !== -1) {
    OSName = "iOS";
  }
  if (navigator.userAgent.indexOf('Linux') !== -1) {
    if (navigator.userAgent.indexOf('arm') !== -1) {
      OSName = 'Raspberry Pi';
    } else {
      OSName = 'Linux';
    }
  }
  if (navigator.userAgent.indexOf('Raspberry') !== -1) {
    OSName = 'Raspberry Pi';
  }
  if (navigator.userAgent.indexOf('Raspbian') !== -1) {
    OSName = 'Raspberry Pi';
  }
  if (navigator.userAgent.indexOf('Android') !== -1) {
    OSName = 'Android';
  }

  let os = OSName.toLowerCase().replace(/\s+/g, '-');

  document.querySelectorAll('.detect-os').forEach((entry) => {
    cls = '.' + os;
    var target = entry.querySelector(cls);
    if (target) {
      var all = entry.querySelectorAll('.os');
      all.forEach((one) => {
        one.classList.add('hide');
      });
      target.classList.remove('hide');
    }
  });

  return os;
}

function initReveal() {
  AOS.init();
}

function initRedirect() {
  window.DoTheRedirect = (url) => {
    window.location = url;
  }
  window.ThankYouRedirect = (redirect_link) => {
    var RedirectURL = redirect_link;
    var RedirectPauseSeconds = 5;
    setTimeout("DoTheRedirect('" + RedirectURL + "')", parseInt(RedirectPauseSeconds * 1000));
  }
}
