// Speaker Slider
    var speakerSlider = new Swiper('.speaker-slider', {
        watchSlidesVisibility: true,
        loop: false,
        spaceBetween: 30,
        slidesPerView: 5,
        breakpoints: {
            1200: {
                slidesPerView: 5
            },
            992: {
                slidesPerView: 4
            },
            768: {
                slidesPerView: 3
            },
            576: {
                slidesPerView: 2
            },
            320: {
                slidesPerView: 1
            }
        }
    })