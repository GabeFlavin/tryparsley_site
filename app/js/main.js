$(document).ready(function(){
    
    //var _copy = $(this).attr("rel");
    //_descriptions.html(_copy);
    
    window.onscroll = function() {
        if($(window).scrollTop() >= $(window).height()){
            if($('.backtotop').css('opacity') == 0){
                TweenMax.to('.backtotop', .5, {opacity:1, ease:Power4.easeOut});
            }
        }else{
            if($('.backtotop').css('opacity') == 1){
                TweenMax.to('.backtotop', .5, {opacity:0, ease:Power4.easeOut});
            }
        }
    };
    
    
    
    // LIGHTBOX OPEN 
    var smileAnimation = new TimelineMax({paused: true, onComplete:smileAnimationDone, repeat:0, repeatDelay:0, yoyo:false});
    
    smileAnimation.to('.noteeth', 1, {opacity: 1, ease:Power3.easeOut}, 1)   
     
    .to('.smile_teeth', .5, {opacity: 1, ease:Power3.easeOut}, "-=.1")
    
    .to('.green', .2, {opacity: 1, ease:Power3.easeOut}, "+=.4")
    
    .to('.logo', .6, {opacity: 1, ease:Power3.easeInOut}, "+=.5")
    
    .to('.home_nav', 1.2, {y: -25, opacity: 1, ease:Power1.easeInOut}, "+=.4");
    
    
    function smileAnimationDone(){}

    
    var url1 = 'https://player.vimeo.com/video/211748556?app_id=122963';
    var url2 = 'https://player.vimeo.com/video/264459449?app_id=122963';
    

    $('a.left').bind('click',function(event){
        event.preventDefault();
        nextVid(url1);
    });
    
    $('a.right').bind('click',function(event){
        event.preventDefault();
        nextVid(url2);
    });
    
    function nextVid(n){
        TweenMax.to('.video1', .5, {opacity:0, ease:Power4.easeOut, onComplete:switchVid}, 0);
        function switchVid(){
            $('.video1').prop('src', n);
            TweenMax.to('.video1', .5, {opacity:1, ease:Power4.easeInOut, delay: .5});
        }
    }
      
    
    window.onload = function() {
        TweenMax.to('body', .5, {opacity:1, ease:Power4.easeOut});
        smileAnimation.restart();
    };
    
    
    
    $('.thumbnail').bind('mouseenter',function(event){
        event.preventDefault();
        var _descriptions = $(this).find('.descriptions');
        TweenMax.to(_descriptions, .4, {opacity:1, ease:Cubic.easeInOut});
    });
    $('.thumbnail').bind('mouseleave',function(event){
        event.preventDefault();
        var _descriptions = $(this).find('.descriptions');
        TweenMax.to(_descriptions, .8, {opacity:0, ease:Cubic.easeInOut});
    });
    
});