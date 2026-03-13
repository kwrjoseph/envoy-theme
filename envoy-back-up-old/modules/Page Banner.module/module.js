 // Banner Slider
    var bannerSlider = new Swiper('.banner-slider', {
        loop: true,
        speed: 750,
        spaceBetween: 30,
        effect: 'fade',
        navigation: {
            nextEl: '.banner-slider-next',
            prevEl: '.banner-slider-prev',
        },
        //autoplay: {},
    });

 $('[data-countdown]:not(.pro-countdown-1,.pro-countdown-2)').each(function() {
        var $this = $(this), finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function(event) {
            $this.html(event.strftime('<div class="single-countdown-box"><span>%D</span>Day</div><div class="single-countdown-box"><span>%H</span>Hours</div><div class="single-countdown-box"><span>%M</span>Mins</div><div class="single-countdown-box"><span>%S</span>Secs</div>'));
        });
    });
    $('[data-countdown].pro-countdown-1').each(function() {
        var $this = $(this), finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function(event) {
            $this.html(event.strftime('<div class="single-countdown-box-1"><span>%D</span>Day</div><div class="single-countdown-box-1"><span>%H</span>Hours</div><div class="single-countdown-box-1"><span>%M</span>Mins</div><div class="single-countdown-box-1"><span>%S</span>Secs</div>'));
        });
    });
