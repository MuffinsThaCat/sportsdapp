$(document).ready(function() {

    // veneobox API
    $('.venobox').venobox();


});

(function(){
      
        // responsive navbar fix :p
        $(document).ready(function () {

            var offset = 200;

            $(window).scroll(function () {
                if ($(this).scrollTo() > offset) {
                    $('header').addClass('.scrolled');
                } else {
                    $('.header').removeClass(' scrolled');
                }
            });
        });
    

}())