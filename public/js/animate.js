$(document).ready(function() {

    $(".owl-carousel").owlCarousel({

        autoplay: 3000, //Set AutoPlay to 2 seconds
        loop: true,
        nav: true,
        autoplaySpeed: 5000,
        autoPlayHoverPause: true,

        items: 2,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3]

    });

});