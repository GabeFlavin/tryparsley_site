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
    


    $('a.backtotop').bind('click',function(event){
        event.preventDefault();
        TweenMax.to(window, 1.1, {scrollTo:0, ease:Cubic.easeInOut});
    });
    
      
    
    window.onload = function() {
        TweenMax.to('body', .5, {opacity:1, ease:Power4.easeOut});
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