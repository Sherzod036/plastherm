$(function () {
  const langLink = $('.lang__link');
  const langCircle = $('.lang__circle');

  langLink.on('click', function (e) {
    e.preventDefault();
    let dataLang = $(this).attr('data-lang');
    langLink.removeClass('lang__link_lighted');
    $(this).addClass('lang__link_lighted');
    langCircle.removeClass(['lang__circle_lefted', 'lang__circle_righted']);
    if (dataLang == 'ru') {
      langCircle.addClass('lang__circle_lefted');
    } else if (dataLang == 'uz') {
      langCircle.addClass('lang__circle_righted');
    }
  });

  $('.menu_open').on('click', (e) => {
    e.preventDefault();
    $('.nav__link.menu_open').toggleClass('primary');
    $('.menu').toggleClass('menu_opened');
    $('.menu_open svg').toggleClass('menu-svg');
  });

  const hamburger = $('.hamburger');

  hamburger.on('click', function () {
    $(this).toggleClass('is-active');
    $('.header__inner').slideToggle().toggleClass('d-block');
  });

  // SLIDERS
  const partnersSlider = $('.partners__slider');
  partnersSlider.owlCarousel({
    items: 4,
    loop: true,
    dots: false,
    nav: false,
    autoplay: true,
    slideTransition: 'linear',
    autoplaySpeed: 10000,
    margin: 100,
    mouseDrag: false,
    rtl: false,
    responsive: {
      0: {
        items: 1,
      },
      1000: {
        items: 3,
      },
      1700: {
        items: 4,
      },
    },
  });

  function initPopupSlider() {
    const prevArrow =
      '<img class="prev_arrow" src="img/prev_arrow.svg" alt="" />';
    const nextArrow =
      '<img class="next_arrow" src="img/next_arrow.svg" alt="" />';

    const popupSlider = $('.popup__slider');
    popupSlider.owlCarousel({
      items: 1,
      loop: true,
      nav: true,
      dots: false,
      navText: [prevArrow, nextArrow],
    });
  }

  // POPUP
  const popup = $('.popup');
  const popupInfo = $('.popup__info');
  const popupForm = $('.popup__form');
  const popupBack = $('.popup__back');

  function popupBackFunc() {
    $(this).removeClass('popup__back_active');
    popupInfo.removeClass('info_anime');
    popupForm.removeClass('form_anime');
  }

  function popupCloseFunc() {
    popup.fadeOut();
    $('body').removeClass('overflow_h');
    popupInfo.removeClass('info_anime');
    popupForm.removeClass('form_anime');
  }

  function popupBtnFunc() {
    popupInfo.addClass('info_anime');
    popupForm.addClass('form_anime');
    popupBack.addClass('popup__back_active');
    $('.popup__content').animate({ scrollTop: 0 }, 500);
  }

  $('.product').on('click', (e) => {
    e.preventDefault();
    $('body').addClass('overflow_h');
    popup.fadeIn().css({ display: 'flex' });
    initPopupSlider();
  });

  popupBack.on('click', popupBackFunc);

  $('.popup__close').on('click', popupCloseFunc);

  $('.popup__btn').on('click', (e) => {
    e.preventDefault();
    popupBtnFunc();
  });

  $('#phone').inputmask('+\\9\\98 (99) 999-99-99');
});
