// owl carousel

$(document).ready(function() {
    const owl = $('.owl-carousel');
    owl.owlCarousel({
        autoplay: true,
        autoplaySpeed: 5000,
        autoplayTimeout: 5000,
        rewind: true,
        autoplayHoverPause: true,
        dotsEach: true,
        items: 1,
        animateIn: 'fadeIn',
        animateOut: 'fadeOutLeft',
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
        center: true,
        nav: true,
        touchDrag: true


    });

    const carousel2 = $('#carousel2');
    carousel2.owlCarousel({
        autoplay: true,
        autoplaySpeed: 5000,
        autoplayTimeout: 5000,
        rewind: true,
        autoplayHoverPause: true,
        dotsEach: true,
        items: 1,
        animateIn: 'fadeIn',
        animateOut: 'fadeOutLeft',
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
        center: false,
        nav: true,
        touchDrag: true


    });
});