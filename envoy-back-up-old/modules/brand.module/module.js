var brandSlider = new Swiper('.brand-carousel', {
        watchSlidesVisibility: true,
        loop: true,
        spaceBetween: 30,
        slidesPerView: 6,
        breakpoints: {
            1200: {
                slidesPerView: 6
            },
            992: {
                slidesPerView: 5
            },
            768: {
                slidesPerView: 5
            },
            576: {
                slidesPerView: 4
            },
            320: {
                slidesPerView: 2
            }
        }
    })