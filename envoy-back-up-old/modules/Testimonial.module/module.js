var testimonialSlider = new Swiper('.testimonial-slider', {
        watchSlidesVisibility: true,
        loop: true,
        spaceBetween: 50,
        slidesPerView: 2,
        autoHeight: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
          },
        breakpoints: {
            320: {
                slidesPerView: 1
            },
            992: {
                slidesPerView: 2
            }
        }
    })
  

// Testimonial Slider Two
    var testimonialSlider = new Swiper('.testimonial-slider-two', {
        slidesPerView : 1,
        slidesPerGroup: 1,
        centeredSlides: true,
        loop: true,
        speed: 1000,
        spaceBetween : 50,
        autoHeight: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        breakpoints: {
            1499:{
                slidesPerView : 3
            },

            991:{
                slidesPerView : 2
            },

            767:{
                slidesPerView : 1

            },

            575:{
                slidesPerView : 1
            }
        }
    });

var testimonialSlider = new Swiper('.testimonial-slider-vertical', {
        slidesPerView : 1,
        slidesPerGroup: 1,
        effect: 'coverflow',
        loop: true,
        speed: 1000,
        spaceBetween : 30,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
        breakpoints: {
            1499:{
                slidesPerView : 1
            },

            991:{
                slidesPerView : 1
            },

            767:{
                slidesPerView : 1

            },

            575:{
                slidesPerView : 1
            }
        }
    });


    var testimonialSlider = new Swiper('.h5-testimonial-slider', {
        watchSlidesVisibility: true,
        loop: true,
        spaceBetween: 30,
        slidesPerView: 3,
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
                slidesPerView: 2
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
    
    