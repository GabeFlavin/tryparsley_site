
$(document).ready(function() 
{

    var lightbox_html = '<!-- lightbox --><div class="lightbox"></div><!-- END lightbox -->';
    var bodyScroll = 0;
    var _gallery = [];
    var _path = "";
    var _imgCount = 0;
    var _total = 0;
    
    console.log('lightbox loaded');
    
  $('body').append(lightbox_html);
    
    
    // LIGHTBOX OPEN 
    var lightboxAnimation = new TimelineMax({paused: true, onComplete:lightboxAnimationDone, repeat:0, repeatDelay:0, yoyo:false});
    
    lightboxAnimation.set($(".lightbox"), { display: "flex" }, 0)
    
    .to('.lightbox', .3, {left: 0, ease:Power3.easeOut}, 0)   
        
    .to('.lightbox', .5, {opacity: 1, ease:Power3.easeOut}, "-=.1");
    
    function lightboxAnimationDone(){}


   
    function lightboxcloseAnimationDone(){
       // TweenMax.set($("body"), { overflow: "auto" });
        TweenMax.set($(".lightbox"), { display: "none" });
        $('.lightboxContent').html('');
    }
    
    
    
    $('.lightbox_link').bind('click',function(event){
    
        event.preventDefault();
        
        _path = $(this).attr("rel");
        _gallery = [];
        _imgCount = 0;
        _total = 0;
        
        console.log(_gallery);
        
        var _isGallery = (_path.indexOf(",")!=0) ? true : false;
        var _isPage = _path.indexOf(".html");
        
        if(_isPage != -1){
            
        }else if(_isGallery){
            
            _gallery = _path.split(",");
            popLightbox(_gallery[0]); 
            
        }else{
           popLightbox(_path); 
        }
        
    });
    
    
   
   
    
    
    function swapImage(_n){
        event.preventDefault();
        // TweenMax.killChildTweensOf('.lightboxImg'); causes issues 
        
        console.log('swap image 1');
        
        TweenMax.set(".lightboxImg", {opacity:0});
        
        $(".lightboxImg").attr("src", _n);
        
        TweenMax.set(".preloader", {display:'block'});

        $('.lightboxImg').on('load', function () {
            TweenMax.to(this, .8, {opacity:1, ease:Power4.easeOut});
            TweenMax.set(".preloader", {display:'none'});
        });
    }
    
    
    function popLightbox(_n){
        
        var _count = _n.indexOf("mp4");
        
        if(_count != -1){
            
            var _path   = _n.substring(0, (_count - 1));
                          
            $('.lightbox').html('<div class="lightboxClose"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 359.2 359.2" style="enable-background:new 0 0 359.2 359.2;" xml:space="preserve"><style type="text/css">.st0{fill:none;stroke:#333333;stroke-width:9;stroke-linecap:round;stroke-miterlimit:10;}</style><title>close_1</title><g id="Layer_2_1_"><g id="Layer_1-2"><line class="st0" x1="4.5" y1="4.5" x2="354.7" y2="354.7"/><line class="st0" x1="354.7" y1="4.5" x2="4.5" y2="354.7"/></g></g></svg></div><video width="996" height="538" controls  poster=""><source src='+_n+' type="video/mp4"><source  src="'+path+'.ogg" type="video/ogg"><source src="'+_path+'.webm" type="video/webm">Your browser does not support the video tag or the file format of this video.</video>');
            
        }else{
            
            var _thumbs = "";
            
            for(i=0;i<_gallery.length;i++){
                var _targetpath = _gallery[i];
                var _classname = (i!=0)? "thumbnail_target" : "thumbnail_first";
                //_thumbs += "<div class='thumbnail_lightbox'><div class="+_classname+"  rel="+_targetpath+"></div></div>";
            }
            
            if(_gallery.length > 1){
                
                
                console.log(_n);
                
                
                $('.lightbox').html('<div class="preloader"><img src="img/loader.svg"/></div><div class="lightboxClose"><svg version="1.1" id="close" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 359.2 359.2" style="enable-background:new 0 0 359.2 359.2;" xml:space="preserve"><style type="text/css">.st0{fill:none;stroke:#333333;stroke-width:9;stroke-linecap:round;stroke-miterlimit:10;}</style><title>close_1</title><g id="Layer_2_1_"><g id="Layer_1-2"><line class="st0" x1="4.5" y1="4.5" x2="354.7" y2="354.7"/><line class="st0" x1="354.7" y1="4.5" x2="4.5" y2="354.7"/></g></g></svg></div><div class="imgCon"><img class="lightboxImg" height="auto" width="auto" src='+_n+'></div><div class="controls_con"><div class="left"><img src="img/arrow_left.svg" /></div> <div class="numbers"></div> <div class="right"><img src="img/arrow_right.svg" /></div></div>');

                $('.controls_con .left').bind('click',function(event){
                    event.preventDefault();
                    if(_imgCount <= 0) { 
                        _imgCount = _gallery.length-1 
                    }else{ 
                        _imgCount--;
                    }
                    var _path = _gallery[_imgCount];
                    changeCount();
                    swapImage(_path); 
                });

                $('.controls_con .right').bind('click',function(event){
                    event.preventDefault();
                    if(_imgCount >= _gallery.length-1) { 
                        _imgCount = 0; 
                    }else{
                        _imgCount++;
                    }
                    var _path = _gallery[_imgCount];
                    changeCount();
                    swapImage(_path); 
                });
            }else{
                
                $('.lightbox').html('<div class="preloader"><img src="img/loader.svg"/></div><div class="lightboxClose"><svg version="1.1" id="close" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 359.2 359.2" style="enable-background:new 0 0 359.2 359.2;" xml:space="preserve"><style type="text/css">.st0{fill:none;stroke:#333333;stroke-width:9;stroke-linecap:round;stroke-miterlimit:10;}</style><title>close_1</title><g id="Layer_2_1_"><g id="Layer_1-2"><line class="st0" x1="4.5" y1="4.5" x2="354.7" y2="354.7"/><line class="st0" x1="354.7" y1="4.5" x2="4.5" y2="354.7"/></g></g></svg></div><img class="lightboxImg" src='+_n+'>');
            }
            
            TweenMax.set(".preloader", {display:'block'});
            $('.lightboxImg').on('load', function () {
                TweenMax.to(this, .8, {opacity:1, ease:Power4.easeOut});
                TweenMax.set(".preloader", {display:'none'});
            });
            
            $('.lightboxClose').bind('click',function(event){
              closeLightbox();
              event.preventDefault();
            });
            $('.lightboxClose').bind('mouseenter',function(event){
             TweenMax.to('#close', .4, {scale:.8, ease:Power2.easeOut});
              event.preventDefault();
            });
            $('.lightboxClose').bind('mouseleave',function(event){
              TweenMax.to('#close', .4, {scale:1, ease:Power2.easeOut});
              event.preventDefault();
            });
            
            
            function changeCount(){
                var _min = _imgCount + 1;
                
                var _numbersStr = _min +' / '+(_gallery.length).toString();
                $('.numbers').html(_numbersStr);
            }
            
            changeCount();
        
            
            lightboxAnimation.restart(); 
        
            
        }

         
    }
    
    
    //
    function closeLightbox(){
        TweenMax.to('.lightbox', .5, {opacity: 0, ease:Power3.easeOut, onComplete:hide}, 0);
        function hide(){
            TweenMax.set(".lightbox", {display:'none'});
        }
    }
    

});
$(document).ready(function(){
    
  // Populate images from data attributes.
  $('.parallax').each(function(index) {
      var imageSrc = $(this).data('image-src')
      var imageHeight = $(this).data('height')
      $(this).css('background-image','url(' + imageSrc + ')')
      $(this).css('height', imageHeight)
  })
    
  // Attach scroll event to window. Calculate the scroll ratio of each element
  // and change the image position with that ratio.
  // https://codepen.io/lemagus/pen/RWxEYz
  $(window).scroll(function() {
    var scrolled = $(window).scrollTop()
    $('.parallax').each(function(index, element) {
      var initY = $(this).offset().top - 450
      var height = $(this).height()
      var endY  = initY + $(this).height()

      // Check if the element is in the viewport.
      var visible = isInViewport(this)
      if(visible) {
        var diff = scrolled - initY
        var ratio = Math.round((diff / height) * 100)
        $(this).css('background-position','center ' + parseInt(-(ratio * 1.5)) + 'px')
      }
    })
  })
})

// Check if the element is in the viewport.
// http://www.hnldesign.nl/work/code/check-if-element-is-visible/
function isInViewport(node) {
  // Am I visible? Height and Width are not explicitly necessary in visibility
  // detection, the bottom, right, top and left are the essential checks. If an
  // image is 0x0, it is technically not visible, so it should not be marked as
  // such. That is why either width or height have to be > 0.
  var rect = node.getBoundingClientRect()
  return (
    (rect.height > 0 || rect.width > 0) &&
    rect.bottom >= 0 &&
    rect.right >= 0 &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

$(document).ready(function(){
    
    //var _copy = $(this).attr("rel");
    //_descriptions.html(_copy);
    $('.dropnav').html($('.menu-name-container').html());
    
    
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
    
    // .call(teeth)
     
    .to('.smile_teeth', .5, {opacity: 1, ease:Power3.easeOut}, "-=.1")
    
    .to('.green', .2, {opacity: 1, ease:Power3.easeOut}, "+=.4")
    
    .add( function(){ console.log('ding') } )
    
    .to('.logo', .6, {opacity: 1, ease:Power3.easeInOut}, "+=.5")
    
    .to('.home_nav', 1.2, {y: -25, opacity: 1, ease:Power1.easeInOut}, "+=.4");
    
    
    function smileAnimationDone(){}
    
    
    var audio = $('.teeth')[0];
    function teeth(){
        audio.play();
    }
    
    
    
    // TEST VIDEOS FOR PROTOTYPING WILL REMOVE ONCE IN WP!
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
    
    $('#hamburger').bind('click',function(event){
        event.preventDefault();
        //TweenMax.to('.dropnav', .5, {opacity:1, ease:Power4.easeInOut, delay: .1});
        
        if($('.dropnav').css('display')!='flex'){
            $(this).stop().addClass("is-active");
            TweenMax.set(".dropnav", {display:'flex'});
        }else{
            $(this).stop().removeClass("is-active");
            TweenMax.set(".dropnav", {display:'none'});
        }
    
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