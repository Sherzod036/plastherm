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

  const menu = $('.menu');
  const menuOpen = $('.menu_open');
  const menuOpenSvg = $('.menu_open svg');

  menuOpen.on('click', (e) => {
    e.preventDefault();
    $('.nav__link.menu_open').toggleClass('primary');
    menu.toggleClass('menu_opened');
    menuOpenSvg.toggleClass('menu-svg');
  });
});
