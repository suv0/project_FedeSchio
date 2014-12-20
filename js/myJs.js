/**
 * Created by aaJahid on 12/17/14.
 */


    function isThisVideoSlide() {

/*

        console.log('changed...');
         $('.video-type').html('');
         var activeSlide = $('.fp-section.active').find('.fp-slide.active'),
             video_id = activeSlide.data('video_id');
         if(activeSlide.hasClass('video-type'))
         {
         console.log('do something...');

         console.log(activeSlide.data('video_id'));

         */
/*activeSlide.html('' +
         '<iframe' +
         ' width=' ($(window).width() + 50) +
         ' title="Alvin Golf &amp; Country Club 2010-2011 AHS Sponsorship Commercial"' +
         ' type="text/html"' +
         ' width="100%"' +
         ' height="100%"' +
         ' src="http://www.youtube.com/embed/'+activeSlide.data('video_id')+'?rel=0&autoplay=1&autohide=1&showinfo=0&controls=1&disablekb=1 "' +
         ' frameborder=0' +
         ' allowfullscreen="true">' +
         '</iframe>' +
         '')*//*


         activeSlide.html("<iframe width='" + ($(window).width() + 50) + "' height='" + ($(window).height() - 50) + "'frameborder='0' src='https://www.youtube.com/embed/" + video_id + "?autoplay=1&autohide=1&controls=1&modestbranding=1&color=white&theme=light&showinfo=0&playsinline=0'></iframe>");
         }
         else
         {
         $('.video-type').html('');
         }

*/




        /*tesing.....*/

        $('.video-type').html('');

        var activeSlide = $('.fp-section.active').find('.fp-slide.active'),
            video_id = activeSlide.data('video_id');

        if(activeSlide.hasClass('video-type'))
        {
            console.log('do something...');

            console.log(activeSlide.data('video_id'));

            video = new video_background($(activeSlide), {
                "position": "absolute",	//Follow page scroll
                "z-index": "0",		//Behind everything

                "loop": true, 			//Loop when it reaches the end
                "autoplay": true,		//Autoplay at start
                "muted": false,			//Muted at start

                "youtube": video_id,	//Youtube video id
                "start": 1,					//Start with 6 seconds offset (to pass black introduction in this case for example)
                "video_ratio": 1.7778, 		// width/height -> If none provided sizing of the video is set to adjust

                "fallback_image": ""	//Fallback image path
            });
            $(activeSlide).css('z-index',9999).fadeIn("slow");
            //current_bg = video_id;
        }
        else
        {
            $('.video-type').html('');
        }



        /*tesing.....*/


    /*Testing the new fullpage youtube video plugin*/
    /*console.log('changed...');
    $('.video-type').html('');
    var activeSlide = $('.fp-section.active').find('.fp-slide.active'),
        video_id = activeSlide.data('video_id');
    if(activeSlide.hasClass('video-type'))
    {
        console.log('do something...');

        console.log(activeSlide.data('video_id'));

        $(activeSlide).YTPlayer({
            fitToBackground: false,
            videoId: video_id,
            pauseOnScroll: false,
            playerVars: {
                modestbranding: 0,
                autoplay: 1,
                controls: 1,
                showinfo: 0,
                wmode: 'transparent',
                branding: 0,
                rel: 0,
                autohide: 0,
                origin: window.location.origin
            }
        });

    }
    else
    {
        $('.video-type').html('');
    }*/


    /*Testing the new fullpage youtube video plugin*/





    }


