var ready = (callback) => {
  if (document.readyState !== 'loading') callback();
  else document.addEventListener('DOMContentLoaded', callback);
}

// On Ready
ready(() => {
  initPopup();
  initTestimonials();
  initPartners();
  initOS()
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

  function toggleClick(event) {
    event.preventDefault();
    var target = event.currentTarget.area, isNavbar = event.currentTarget.navbar;
    if (target) {
      if (target.classList.contains('visible')) {
        setTimeout(function () {
          target.classList.remove('open');
          if (isNavbar) {
            document.body.classList.remove('menu-open');
            enableScroll();
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
            disableScroll();
          }
        }, 300);
      }
    }
    return false;
  }

  var navbar = document.querySelector('.header__nav'),
    toggle = document.querySelector('.header__toggle'),
    close = navbar.querySelector('.header__close');

  toggle.area = navbar;
  toggle.navbar = true;
  toggle.addEventListener('click', toggleClick, false);

  close.area = navbar;
  close.navbar = true;
  close.addEventListener('click', toggleClick, false);

  document.querySelectorAll('.popup-open').forEach((link) => {
    var target = link.getAttribute('href'),
      popup = document.querySelector(target);

    link.area = popup;
    link.addEventListener('click', toggleClick, false);

    var close = popup.querySelector('.popup__close');
    close.area = popup;
    close.addEventListener('click', toggleClick, false);
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
    } else if (navigator.userAgent.indexOf('Android') !== -1) {
      OSName = 'Android';
    } else {
      OSName = 'Linux';
    }
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
}