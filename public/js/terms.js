let termsRead = false;

function init() {
  const scrollTop = $('.terms').scrollTop();
  const innerHeight = $('.terms').innerHeight();
  const scrollHeight = $('.terms').prop('scrollHeight');

  if(scrollTop + innerHeight >= scrollHeight) {
    $('.check').addClass('open');
  }
}

$('.terms').scroll(function () {
  const scrollTop = $(this).scrollTop();
  const innerHeight = $(this).innerHeight();
  const scrollHeight = $(this).prop('scrollHeight');

  if(scrollTop + innerHeight >= scrollHeight) {
    $('.check').addClass('open');
  }
});