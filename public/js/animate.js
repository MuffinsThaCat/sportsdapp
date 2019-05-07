// navbar and video play btn behavior
'use strict';
$(document).ready(function() {


    // veneobox API
    $('.venobox').venobox();

    function toggleButton() {
        const closeX = $('.navbar-toggle');
        const playBtn = $('#playBtn');

        playBtn.on('click', function() {
            closeX.hide();
        });

    }
    toggleButton();

    stickyNav();

    function stickyNav() {
        const coolNav = $('#cool-nav');
        const height = $('#cool-nav').height() + 60;
        $(window).scroll(function() {
            if ($(this).scrollTop() >= height) {
                coolNav.addClass('scrolled').removeClass('initial_header');


            } else {
                coolNav.addClass('initial_header').removeClass('scrolled');

            }

        });


    }

    hideNav();

    function hideNav() {
        let btn = $('#connect_btn');
        let anchor = $('#slider');
        let context = $('#context');
        let venobox = $('.venobox').venobox();


        anchor.on('click', function() {
            btn.hide();
        });
        $(document).on('click', function() {
            btn.show();
            venobox.close();
        });


    }
});