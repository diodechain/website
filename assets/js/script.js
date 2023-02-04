var ready = (callback) => {
  if (document.readyState !== 'loading') callback();
  else document.addEventListener('DOMContentLoaded', callback);
}

// On Ready
ready(() => {
  initHeader();
  initPartners();
});

function initHeader() {
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

  function toggleClick(event) {
    event.preventDefault();
    if (nav.classList.contains('visible')) {
      setTimeout(function () {
        nav.classList.remove('open');
        document.body.classList.remove('menu-open');
        enableScroll();
        setTimeout(function () {
          nav.classList.remove('visible');
        }, 250);
      }, 25);
    } else {
      nav.classList.add('visible');
      setTimeout(function () {
        nav.classList.add('open');
      }, 25);
      setTimeout(function () {
        document.body.classList.add('menu-open');
        disableScroll();
      }, 300);
    }
    return false;
  }

  var nav = document.querySelector('.header__nav');

  document.querySelector('.header__toggle').addEventListener('click', toggleClick);
  nav.querySelector('.header__close').addEventListener('click', toggleClick);
}

function initPartners() {
  document.querySelector('.partners__logos').classList.add('init');
  const swiper = new Swiper('.partners__logos .swiper', {
    slidesPerView: 3,
    spaceBetween: 15,
    centeredSlides: true,
    loop: true,
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
      992: {
        slidesPerView: 4,
        centeredSlides: false
      },
    }
  });
}