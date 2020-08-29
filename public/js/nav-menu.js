var navOpen = false;
var toggle = true;

$('.menu').hover(function () {
  if(toggle){
    $('.back-menu').fadeIn();
    $('.menu-list').fadeIn();
    $(this).animate({
      'top': '-10px',
      'padding-bottom': '10px'
    });
  }
  }, function () {
    if(toggle){
      $('.back-menu').fadeOut();
      $('.menu-list').fadeOut();
      $(this).animate({
        'top': '0px',
        'padding-bottom': '0px'
      });
    }
  }
);

function resizeHandler() {
  if($(window).outerWidth() < 1000 && toggle){
    $('ul.menu').css('display', 'none');
    $('.nav-burger').fadeIn();
    toggle = !toggle;
  }else if($(window).outerWidth() >= 1000 && !toggle) {
    $('ul.menu').fadeIn();
    $('ul.menu').css('display', 'flex');
    $('.nav-burger').fadeOut();
    $('.nav-burger-div').removeClass('open')
    $('body').removeClass('lock-scroll');
    navOpen = false;
    toggle = !toggle;
  }
}$('.nav-burger').click(function (e) {
  e.preventDefault();
  navOpen = !navOpen;
  if(navOpen){
    $('ul.menu').fadeIn();
    $('.nav-burger-div').addClass('open');
    $('body').addClass('lock-scroll');
  }else{
    $('ul.menu').fadeOut();
    $('.nav-burger-div').removeClass('open');
    $('body').removeClass('lock-scroll');
  }
});

$(document).ready(function () {
  resizeHandler();
});

$(window).resize(function () {
  resizeHandler();
});

$(window).scroll(function (e) {
  if($(window).scrollTop() > 0){
    $('.up-window').fadeIn();
    $('nav').addClass('down');
  }else{
    $('.up-window').fadeOut();
    $('nav').removeClass('down');
  }
});

$('.down-angle').click(function (e) {
  e.preventDefault();
  if(toggle)
    $('html, body').animate({scrollTop : $(window).innerHeight() - 100}, 500, 'linear');
  else
    $('html, body').animate({scrollTop : $(window).innerHeight()}, 500, 'linear');
  return false;
});

function fnScroll(req) {
  const offset = $(req).offset();
  if(toggle)
    $('html, body').animate({scrollTop : offset.top - 100}, 500, 'linear');
  else
    $('html, body').animate({scrollTop : offset.top}, 500, 'linear');
  if(navOpen){
    $('ul.menu').fadeOut();
    $('.nav-burger-div').removeClass('open');
    $('body').removeClass('lock-scroll');
    navOpen = !navOpen;
  }
  return false;
}

$('.up-window').click(function (e) {
  e.preventDefault();
  fnScroll('html');
});