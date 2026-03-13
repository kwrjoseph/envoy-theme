

$('[data-countdown].pro-countdown-2').each(function() {
  var $this = $(this), finalDate = $(this).data('countdown');
  $this.countdown(finalDate, function(event) {
    $this.html(event.strftime('<div class="countdown-item before-none"><span>%D</span></div><div class="countdown-item"><span>%H</span></div><div class="countdown-item"><span>%M</span></div><div class="countdown-item"><span>%S</span></div>'));
  });
});