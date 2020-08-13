
$(document).ready(function () {
  $('#tweet-text').on('keydown', function () {
    const $countVal = $(this).val().length;
    const $outputVal = $(this).parent().children('div').children('output');
    const counter = 140 - $countVal;
    $($outputVal).text(counter);

    if (counter < 0) {
      $($outputVal).addClass('negative');
    } else {
      $($outputVal).removeClass('negative');
    }
  });
});
