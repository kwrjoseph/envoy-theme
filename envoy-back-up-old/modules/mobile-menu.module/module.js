/*--
        Commons Variables
    -----------------------------------*/
    var $window = $(window),
        $body = $('body');   

/*--
        Off Canvas Function
    -----------------------------------*/
    $('.header-mobile-menu-toggle, .mobile-menu-close').on('click', '.toggle', function () {
        $body.toggleClass('mobile-menu-open');
    });
    $('.site-mobile-menu').on('click', '.menu-toggle', function (e) {
        e.preventDefault();
        var $this = $(this);
        if ($this.siblings('.sub-menu-2:visible, .mega-menu:visible').length) {
            $this.siblings('.sub-menu-2, .mega-menu').slideUp().parent().removeClass('open').find('.sub-menu-2, .mega-menu').slideUp().parent().removeClass('open');
        } else {
            $this.siblings('.sub-menu-2, .mega-menu').slideDown().parent().addClass('open').siblings().find('.sub-menu-2, .mega-menu').slideUp().parent().removeClass('open');
        }
    });


    $('.header-search-toggle').on('click', function (e) {
        e.preventDefault();
        $(this).siblings('.header-search-form, .header-search-form-2').slideToggle().parent().toggleClass('open');
    });

    $('.header-fs-search-toggle').on('click', function () {
        $('#fullscreen-search').addClass('open');
    });
    $('.fullscreen-search-close').on('click', '.toggle', function () {
        $('#fullscreen-search').removeClass('open');
    });

    $body.on('click', function (e) {
        if (!$(e.target).closest('.header-search').length && $window.width() < 768) {
            $('.header-search-form, .header-search-form-2').slideUp().parent().removeClass('open');
        }
        if (!$(e.target).closest('.site-main-mobile-menu-inner').length && !$(e.target).closest('.header-mobile-menu-toggle').length) {
            $body.removeClass('mobile-menu-open');
        }
    });

    $('.max-popup-close').on('click', function () {
        var $this = $(this),
            $popup = $this.closest('#max-popup'),
            $dialog = $this.parent('.max-popup-dialog');
        $popup.addClass('close');
        $dialog.removeClass('fadeInUp').addClass('fadeOutUp');
    });

