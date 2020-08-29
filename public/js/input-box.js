$('.inputjs').focus(function (e) {
  $(this).next().addClass('focus');
});

$('.inputjs').focusout(function (e) {
  if($(this).val() === '')
    $(this).next().removeClass('focus');
})

function init() {
  $(`input[type='text'], input[type='password']`).val('');
  $('div[style*="z-index:9999"]').css('display', 'none');
}

init();