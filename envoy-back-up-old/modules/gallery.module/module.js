var $justifiedGallery = $('.justified-gallery');

    $justifiedGallery.imagesLoaded(function () {
        $justifiedGallery.justifiedGallery({
            rowHeight: 440,
            maxRowHeight: null,
            margins: 10,
            border: 0,
            lastRow: 'nojustify'
        });
        
    });