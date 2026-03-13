(function ($) {
    "use strict";

    /*--
        Commons Variables
    -----------------------------------*/
    var $window = $(window),
        $body = $('body');

    /*--
        Custom script to call Background
        Image & Color from html data attribute
    -----------------------------------*/
    $('[data-bg-image]').each(function () {
        var $this = $(this),
            $image = $this.data('bg-image');
        $this.css('background-image', 'url(' + $image + ')');
    });
    $('[data-bg-color]').each(function () {
        var $this = $(this),
            $color = $this.data('bg-color');
        $this.css('background-color', $color);
    });

    /*------------------------------
        Parallax Motion Animation 
    -------------------------------*/
    $('.scene').each(function () {
        new Parallax($(this)[0]);
    });

    /* ----------------------------
        AOS Scroll Animation 
    -------------------------------*/
    AOS.init({
        offset: 80,
        duration: 1000,
        once: true,
        easing: 'ease',
    });


    





  


  
    









   
    
    /*----- 
        Quantity
    --------------------------------*/
    $('.pro-qty').prepend('<button class="dec qtybtn">-</button>');
    $('.pro-qty').append('<button class="inc qtybtn">+</button>');
    $('.qtybtn').on('click', function() {
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('inc')) {
        var newVal = parseFloat(oldValue) + 1;
        } else {
        // Don't allow decrementing below zero
        if (oldValue > 0) {
            var newVal = parseFloat(oldValue) - 1;
            } else {
            newVal = 0;
        }
        }
        $button.parent().find('input').val(newVal);
    });

    /*----- 
	Shipping Form Toggle
    --------------------------------*/ 
    $('[data-shipping]').on('click', function(){
        if( $('[data-shipping]:checked').length > 0 ) {
            $('#shipping-form').slideDown();
        } else {
            $('#shipping-form').slideUp();
        }
    })
        
    /*----- 
        Payment Method Select
    --------------------------------*/
    $('[name="payment-method"]').on('click', function(){
        
        var $value = $(this).attr('value');

        $('.single-method p').slideUp();
        $('[data-method="'+$value+'"]').slideDown();
        
    })

    /*--
        On Load Function
    -----------------------------------*/
    $window.on('load', function () {});

    /*--
        Resize Function
    -----------------------------------*/
    $window.resize(function () {});

})(jQuery);