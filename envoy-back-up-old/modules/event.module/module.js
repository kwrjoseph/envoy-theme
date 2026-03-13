// Event Slider
    var eventSlider = new Swiper('.event-slider', {
        watchSlidesVisibility: true,
        loop: true,
        spaceBetween: 30,
        slidesPerView: 3,
        slidesPerGroup: 1,
        autoHeight: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
          },
        breakpoints: {
            1200: {
                slidesPerView: 3
            },
            992: {
                slidesPerView: 3
            },
            768: {
                slidesPerView: 2
            },
            576: {
                slidesPerView: 1
            },
            320: {
                slidesPerView: 1
            }
        }
    })