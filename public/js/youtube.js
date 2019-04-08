
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: 'dl4OzGHNaGk',
      playerVars: {
         //'controls': 0,
         'rel' : 0,
         'showinfo' : 0,
         'modestbranding' : 0,
         'color' : 'white',
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }

  function onPlayerReady(event) {

    $('#trigger').on('click', function(e) {
      if(typeof window.orientation == 'undefined'){
        event.target.playVideo();
      }
    });

    $('#videoModal').on('hidden.bs.modal', function (e) {
       event.target.pauseVideo();
    });
  }

  var done = false;
  var myTimer;
  var pop = false;

  function onPlayerStateChange(event) {

    if (event.data == 1) { //playing
      $('.myblock').hide();
    }

    if (event.data == 1 && !pop) { // playing
        myTimer = setInterval(function(){
            var time;
            time = player.getCurrentTime();

            if ( time > 155) {
              $('.myblock').addClass('full');
              $('.myblock').fadeIn();
              if (!pop) {
                ga( 'send', 'event', 'Watch Video', 'click', 'Finished Watching' );
              }
              pop = true;
            }
        }, 1000);
    }

    if (event.data == 2 ) { //paused
      clearInterval(myTimer);
      $('.myblock').fadeToggle();
      ga( 'send', 'event', 'Watch Video', 'click', 'Pause' );
    }

    if (event.data == 0) { //ended
      clearInterval(myTimer);
      $('.myblock').addClass('full');
      $('.myblock').fadeIn();
    }
  }

