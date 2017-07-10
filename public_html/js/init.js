(function($) {
  "use strict";

  /*-------------------------------------------------*/
  /* =  preloader
  /*-------------------------------------------------*/
  $(window).load(function() { 
    $("#preloader").fadeOut("slow"); 
  });

  /*-------------------------------------------------*/
  /* =  preloader
  /*-------------------------------------------------*/
  $(document).ready( function () {

    var window_height = $(window).height() ;
  	var screen_size = $(window).width();
  	$('#subheader, #subheader .rslides li ').css('height', window_height + 100 );
    $(".console").hide();
    $('textarea').autosize();
    $('textarea').css("height", "50px");


    /*-------------------------------------------------*/
    /* =  scroll to top
    /*-------------------------------------------------*/
    var to_top_icon = $('#top');
    $(to_top_icon).hide();
        $(window).scroll(function(){
        if ($(this).scrollTop() > 75 ) {
        to_top_icon.fadeIn();
        } else {
        to_top_icon.fadeOut();
        }
    });


  	/*-------------------------------------------------*/
  	/* =  scroll on link
  	/*-------------------------------------------------*/
    if ($(window).width() < 768) {
      var top_ofset = $('header').height() + 40;
    } 
    else {
      var top_ofset = $('header').height() + 91;
    } 

  	var top_ofset = $('header').height() + 40;

  	$('header nav ul a, .scrl ,.logo, .scroll-down, #top').smoothScroll({
        offset: - top_ofset,
        // one of 'top' or 'left'
        direction: 'top',
        // only use if you want to override default behavior
        scrollTarget: null,
        // fn(opts) function to be called before scrolling occurs.
        // `this` is the element(s) being scrolled
        beforeScroll: function() {},
        // fn(opts) function to be called after scrolling occurs.
        // `this` is the triggering element
        afterScroll: function() {},
        easing: 'easeInOutExpo',
        speed: 1000,
        // coefficient for "auto" speed
        autoCoefficent: 2,
        // $.fn.smoothScroll only: whether to prevent the default click action
        preventDefault: true      
      });


    [].slice.call( document.querySelectorAll( '.rslides_tabs' ) ).forEach( function( nav ) {
      new DotNav( nav, {
        callback : function( idx ) {
          //console.log( idx )
        }
      } );
    } );

    /*-------------------------------------------------*/
    /* =  scroll over 
    /*-------------------------------------------------*/
    var navigation = $('header');
    $(window).scroll(function() {
      if ($(window).scrollTop()>(window_height - 156)) {
        navigation.addClass('change');
        navigation.delay(1000).queue(function(){$(this).addClass('animate')
    });
      }
      else {
        navigation.removeClass('change animate');
      }
    });

    /*-------------------------------------------------*/
    /* =  add text in button
    /*-------------------------------------------------*/
    $('#filters .filter').on('click', function(){ 
        var text = $(this).children('i').html(); 
        $('.filter-section .select-cat').html(text);
    });

    /*-------------------------------------------------*/
    /* =  Close navbar on click
    /*-------------------------------------------------*/
    $('.select-cat').on('click', function(){
      $(".filters").toggleClass('active');
    });
    $('.filter').on('click', function(){
      $('.filters').toggleClass('active');
    });

    /*-------------------------------------------------*/
    /* =  Close navbar on click
    /*-------------------------------------------------*/
    $(".bars").on("click", function() {
      $("nav").toggleClass('active');
      $("html").toggleClass('active-sidebar');
      $(".mobile-overlay").toggleClass('active');

    });

    $('header nav a').on('click', function(){
      $('nav').removeClass('active'); 
      $("html").removeClass('active-sidebar');
      $(".mobile-overlay").removeClass('active');
    });

    /*-------------------------------------------------*/
    /* =  img to background
    /*-------------------------------------------------*/
    $(".white-popup img , .isotope-item >a >img").each(function(i, elem) {
      var img = $(elem);
      var div = $("<div />").css({
        background: "url(" + img.attr("src") + ") no-repeat",
        width: img.width() + "px",
        height: img.height() + "px"
      });
      img.replaceWith(div);
      $(div).addClass('browse-images')
    });

    /*-------------------------------------------------*/
    /* =  Izotope
    /*-------------------------------------------------*/
    $.Isotope.prototype._getCenteredMasonryColumns = function() {
      this.width = this.element.width();
      
      var parentWidth = this.element.parent().width();
      
                    // i.e. options.masonry && options.masonry.columnWidth
      var colW = this.options.masonry && this.options.masonry.columnWidth ||
                    // or use the size of the first item
                    this.$filteredAtoms.outerWidth(true) ||
                    // if there's no items, use size of container
                    parentWidth;
      
      var cols = Math.floor( parentWidth / colW );
      cols = Math.max( cols, 1 );

      // i.e. this.masonry.cols = ....
      this.masonry.cols = cols;
      // i.e. this.masonry.columnWidth = ...
      this.masonry.columnWidth = colW;
    };
    
    $.Isotope.prototype._masonryReset = function() {
      // layout-specific props
      this.masonry = {};
      // FIXME shouldn't have to call this again
      this._getCenteredMasonryColumns();
      var i = this.masonry.cols;
      this.masonry.colYs = [];
      while (i--) {
        this.masonry.colYs.push( 0 );
      }
    };

    $.Isotope.prototype._masonryResizeChanged = function() {
      var prevColCount = this.masonry.cols;
      // get updated colCount
      this._getCenteredMasonryColumns();
      return ( this.masonry.cols !== prevColCount );
    };
    
    $.Isotope.prototype._masonryGetContainerSize = function() {
      var unusedCols = 0,
          i = this.masonry.cols;
      // count unused columns
      while ( --i ) {
        if ( this.masonry.colYs[i] !== 0 ) {
          break;
        }
        unusedCols++;
      }
      
      return {
            height : Math.max.apply( Math, this.masonry.colYs ),
            // fit container to columns that have been used;
            width : (this.masonry.cols - unusedCols) * this.masonry.columnWidth
          };
    };
     $('#filter_content').isotope();

    // cache filter_content
    var $filter_content = $('#filter_content');
    // initialize isotope
    $filter_content.isotope({
      animationOptions: {
         duration: 750,
         queue: false
       }
    });
    // filter items when filter link is clicked
    $('.filters a').click(function(){
      var selector = $(this).attr('data-filter');
      $filter_content.isotope({ filter: selector });
      return false;
    });

    /*-------------------------------------------------*/
    /* =  video 
    /*-------------------------------------------------*/
    $(function(){
      if (self.location.href == top.location.href){
      }

      $('#bgndVideo').on("YTPStart",function(e){
         var currentTime = e.time;
         $("#pause").show();
         $("#play").hide();
         $('.mbYTP_wrapper').removeClass('active');

      });

      $('#bgndVideo').on("YTPUnstarted",function(e){
         var currentTime = e.time;
         $("#pause").hide();
         $("#play").show();
         $('.mbYTP_wrapper').addClass('active');
      });
      $('#bgndVideo').on("YTPPause",function(e){
         var currentTime = e.time;
         $("#pause").hide();
         $("#play").show();
      });
      //debug functions
      $("#bgndVideo").on("YTPStart", function(){
          $("#eventListener").html("YTPStart");
          $("#eventListener").append(" :: (state= "+ $("#bgndVideo").getPlayer().getPlayerState()+")");
          $("#eventListener").append(" :: (quality= "+ $("#bgndVideo").getPlayer().getPlaybackQuality()+")");
      });
      $("#bgndVideo").on("YTPLoop", function(e){
          $("#eventListener").html("YTPLoop");
          $("#eventListener").append(" :: (state= "+ $("#bgndVideo").getPlayer().getPlayerState()+")");
          $("#eventListener").append(" :: "+ e.counter);
      });
      $("#bgndVideo").on("YTPEnd", function(){
          $("#eventListener").html("YTPEnd");
          $("#eventListener").append(" :: (state= "+ $("#bgndVideo").getPlayer().getPlayerState()+")");
          console.debug("YTPEnd")
      });
      $("#bgndVideo").on("YTPPause", function(){
          $("#eventListener").html("YTPPause");
          $("#eventListener").append(" :: (state= "+ $("#bgndVideo").getPlayer().getPlayerState()+")");
      });
      $("#bgndVideo").on("YTPBuffering", function(){
          $("#eventListener").html("YTPBuffering");
          $("#eventListener").append(" :: (state= "+ $("#bgndVideo").getPlayer().getPlayerState()+")");
      });

      $(".player").mb_YTPlayer({
          onReady: function(){
              $("#eventListener").append(" (Player is ready)");
              $(".console").show(); 
          }
      });
    });





    /*-------------------------------------------------*/
    /* =  magnific popup 
    /*-------------------------------------------------*/
    var close_icon = '<svg fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" \
         viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"> \
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.3,42.7c-9.8-9.8-9.8-25.6,0-35.4c9.8-9.8,25.6-9.8,35.4,0 \
        c9.8,9.8,9.8,25.6,0,35.4C32.9,52.4,17.1,52.4,7.3,42.7z M41.3,8.7c-9-9-23.5-9-32.5,0c-9,9-9,23.5,0,32.5c9,9,23.5,9,32.5,0 \
        C50.2,32.3,50.2,17.7,41.3,8.7z"/> \
      <path fill-rule="evenodd" clip-rule="evenodd" d="M32.5,16l1.5,1.5L17.5,34L16,32.5L32.5,16z"/> \
      <path fill-rule="evenodd" clip-rule="evenodd" d="M34,32.5L32.5,34L16,17.5l1.5-1.5L34,32.5z"/> \
      </svg>';

    $('.popup-modal').magnificPopup({
      type:'inline',
      midClick: true,
      removalDelay: 50,
      callbacks: {
        open: function() {
          $('.mfp-close').empty().append(close_icon);
        },
        beforeOpen: function() {
          // just a hack that adds mfp-anim class to markup 
           this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
           this.st.mainClass = this.st.el.attr('data-effect');
        }
      }
    }); 


    $('.mfp-close').magnificPopup({
      mainClass: 'mfp-with-fade',
      removalDelay: 500, //delay removal by X to allow out-animation
      callbacks: {
        beforeClose: function() {
            this.content.addClass('hinge');
        }, 
        close: function() {
            this.content.removeClass('hinge'); 
        }
      },
      midClick: true
    });

    $('.popup-gallery').magnificPopup({
      delegate: 'a',
      type: 'image',
      removalDelay: 500,
      tLoading: 'Loading image #%curr%...',
      mainClass: 'mfp-img-mobile',
      fixedContentPos: true,
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0,1] // Will preload 0 - before current, and 1 after the current image
      },
      image: {
        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
        titleSrc: function(item) {
          return item.el.attr('title') + '<small></small>';
        }
      },
      callbacks: {
        open: function() {
          $('.mfp-close').empty().append(close_icon);
        },
        beforeOpen: function() {
          // just a hack that adds mfp-anim class to markup 
           this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
           this.st.mainClass = this.st.el.attr('data-effect');
        }
      }
    });

    $('.popup-youtube, .popup-vimeo').magnificPopup({
      type: 'iframe',
      // mainClass: 'mfp-fade',
      removalDelay: 50,
      preloader: false,
      fixedContentPos: true,
      callbacks: {
        open: function() {
          $('.mfp-close').empty().append(close_icon);
        },
        beforeOpen: function() {
          // just a hack that adds mfp-anim class to markup 
           this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
           this.st.mainClass = this.st.el.attr('data-effect');
        }
      }
    });

    /*-------------------------------------------------*/
    /* =  slider partners
    /*-------------------------------------------------*/
    $("#owl1").owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 500,
        paginationSpeed: 1000,
        singleItem: true,
        transitionStyle : "fade",
        autoPlay:false 
    });
    $(".follow-slider .next").on('click',function(){
      $("#owl1").trigger('owl.next');
    })
    $(".follow-slider .prev").on('click',function(){
      $("#owl1").trigger('owl.prev');
    })

    $("#owl2").owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 500,
        paginationSpeed: 1000,
        singleItem: true,
        transitionStyle : "fade",
        autoPlay:false 
    });
    $(".follow-slider .next").on('click',function(){
      $("#owl2").trigger('owl.next');
    })
    $(".follow-slider .prev").on('click',function(){
      $("#owl2").trigger('owl.prev');

    $("#owl3").owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 500,
        paginationSpeed: 1000,
        singleItem: true,
        transitionStyle : "fade",
        autoPlay:false 
    });
    $(".follow-slider .next").on('click',function(){
      $("#owl3").trigger('owl.next');
    })
    $(".follow-slider .prev").on('click',function(){
      $("#owl3").trigger('owl.prev');
    })
    })
    $("#owl4").owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 500,
        paginationSpeed: 1000,
        singleItem: true,
        transitionStyle : "fade",
        autoPlay:false 
    });

    $(".follow-slider .next").on('click',function(){
      $("#owl4").trigger('owl.next');
    })
    $(".follow-slider .prev").on('click',function(){
      $("#owl4").trigger('owl.prev');
    })

   /*-------------------------------------------------*/
    /* =  slider how-it-works
    /*-------------------------------------------------*/

    $("#hiw-slider").owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 500,
        paginationSpeed: 1000,
        singleItem: true,
        transitionStyle : "fade",
        autoPlay:false 
    });

    $(".follow-slider .next").on('click',function(){
      $("#hiw-slider").trigger('owl.next');
    })
    $(".follow-slider .prev").on('click',function(){
      $("#hiw-slider").trigger('owl.prev');
    })
    

    /*-------------------------------------------------*/
    /* =  slider pricing
    /*-------------------------------------------------*/
    if ($(window).width() < 670) {
  
       
      $("#pricing-slider").owlCarousel({
        items : 4, //10 items above 1000px browser width
        itemsDesktop : false, //5 items between 1000px and 901px
        itemsDesktopSmall : false, // betweem 900px and 601px
        itemsTablet: false, //2 items between 600 and 0
        itemsMobile : [670,1] // itemsMobile disabled - inherit from itemsTablet option
      });
         
      // Custom Navigation Events
      $(".pricing-section .next").on("click", function(){
      $("#pricing-slider").trigger('owl.next');
      });
      $(".pricing-section .prev").on("click", function(){
      $("#pricing-slider").trigger('owl.prev');
      });
      
    }else {
      if(typeof $("#pricing-slider").data('owlCarousel') != 'undefined') {
          $("#pricing-slider").data('owlCarousel').destroy();
      }
      
    } 


    $(window).on('resize', function() {
      var screen_size = $(window).width();   

      /*@@@@@@@@ KAMIKAZE @@@@@@@@*/
      adjust_content();
      /*@@@@@@@@@@@@@@@@@@@@@@@@@@*/

      if (screen_size <= 670) {
        var owl = $("#pricing-slider");
       
        owl.owlCarousel({
          items : 4, //10 items above 1000px browser width
          itemsDesktop : false, //5 items between 1000px and 901px
          itemsDesktopSmall : false, // betweem 900px and 601px
          itemsTablet: false, //2 items between 600 and 0
          itemsMobile : [670,1] // itemsMobile disabled - inherit from itemsTablet option
        });
           
        // Custom Navigation Events
        $(".pricing-section .next").on("click", function(){
        owl.trigger('owl.next');
        });
        $(".pricing-section .prev").on("click", function(){
        owl.trigger('owl.prev');
        });

      }else {
        if(typeof $("#pricing-slider").data('owlCarousel') != 'undefined') {
            $("#pricing-slider").data('owlCarousel').destroy();
        }
        
      }
    }).trigger('resize');

    /*-------------------------------------------------*/
    /* =  slider team
    /*-------------------------------------------------*/
    $("#bowl1").owlCarousel({
      items : 4,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [700,2],
      itemsTablet: [480,1],
      navigation : true
    });

    /*-------------------------------------------------*/
    /* =  animate numbers
    /*-------------------------------------------------*/
    $('#impact').one('inview', function(event, isInView, visiblePartX, visiblePartY){
      $('#lines1').animateNumber({ number: 452},2000);

      $('#lines2').animateNumber({ number: 43},2000);

      $('#lines3').animateNumber({ number: 87},2000);

      $('#lines4').animateNumber({ number: 229},2000);
    });

    /*-------------------------------------------------*/
    /* =  animate objects
    /*-------------------------------------------------*/

    var $fadeInUp = $('');
    var $fadeInLeft = $('');
    var $fadeInRight = $('');
    var $fadeIn = $('.subheader-section, .features-section, .filter-section, .howitworks-section, .howitworks-section-contd, .video-section, .pricing-section, .partners-section, .follow-section, .blog-section, .contact-section, .map, .theme, .social');


    // InView - fadeIn

    if ($(window).width() >= 1024) {
      $fadeIn.css('opacity', 0);
      $fadeInUp.css('opacity', 0);
      $fadeInLeft.css('opacity', 0);
      $fadeInRight.css('opacity', 0);
      
      $fadeIn.one('inview', function(event, visible) {
        if (visible) { $(this).addClass('animated fadeIn'); }
      });

      // InView - fadeInDown
      $fadeInUp.one('inview', function(event, visible) {
        if (visible) { $(this).addClass('animated fadeInUp'); }
      });
      // InView - fadeInLeft
      $fadeInLeft.one('inview', function(event, visible) {
        if (visible) { $(this).addClass('animated fadeInLeft'); }
      });
      // InView - fadeInRight
      $fadeInRight.one('inview', function(event, visible) {
        if (visible) { $(this).addClass('animated fadeInRight'); }
      });
  
      
    }else {

      $fadeIn.css('opacity', 1);
      $fadeInUp.css('opacity', 1);
      $fadeInLeft.css('opacity', 1);
      $fadeInRight.css('opacity', 1);
      
    } 

    $(window).on('resize', function() {
      var screen_size = $(window).width();   

      if (screen_size >= 1024) {

        $fadeIn.css('opacity', 0);
        $fadeInUp.css('opacity', 0);
        $fadeInLeft.css('opacity', 0);
        $fadeInRight.css('opacity', 0);
        
        $fadeIn.one('inview', function(event, visible) {
          if (visible) { $(this).addClass('animated fadeIn'); }
        });

        // InView - fadeInDown
        $fadeInUp.one('inview', function(event, visible) {
          if (visible) { $(this).addClass('animated fadeInUp'); }
        });
        // InView - fadeInLeft
        $fadeInLeft.one('inview', function(event, visible) {
          if (visible) { $(this).addClass('animated fadeInLeft'); }
        });
        // InView - fadeInRight
        $fadeInRight.one('inview', function(event, visible) {
          if (visible) { $(this).addClass('animated fadeInRight'); }
        });

      }else {

        $fadeIn.css('opacity', 1);
        $fadeInUp.css('opacity', 1);
        $fadeInLeft.css('opacity', 1);
        $fadeInRight.css('opacity', 1);
        
      }
    }).trigger('resize');


    /*-------------------------------------------------*/
    /* =  Generate random number for form check
    /*-------------------------------------------------*/
    var generateRandom = function(element) {
        var word = ['one', 'two', 'three', 'four', 'five'];
        var rand = (Math.floor(Math.random() * 4));
        var correct = word[rand];
        $(element).html(correct);
        return correct;
    }        

    var correct = generateRandom('.test p span');

    /*-------------------------------------------------*/
    /* =  Highlighting checked radio button 
    /*-------------------------------------------------*/         
    $('input[name=rand]').on('click', function() {
        $('input[name=rand]').parent().removeClass('active1');
        $('input[name=rand]:checked').parent().addClass('active1');
    });

    /*-------------------------------------------------*/
    /* =  Popup notification 
    /*-------------------------------------------------*/ 
    var showNotification = function(message, className) {
        $('.popup-email').fadeIn('fast');
        $('.element p').remove();
        $('.element').prepend('<p class="' + className + '">' + message + '</p>');
    }

    var closeNotification = function(element) {
        $(element).fadeOut('fast');
    }

    $('#btn').on('click', function() {
        closeNotification('.popup-email');
    });

    /*-------------------------------------------------*/
    /* =  Form validation
    /*-------------------------------------------------*/

     $('.contact-form').validate({
        errorElement: 'p',
        errorClass: 'notify',
        rules: {
            name: "required",
            subject: "required",
            mail: {required: true, email: true},
            message: "required"
        },
        submitHandler: function(form) {               
            if($('input[name=rand]:checked').val() === correct) {                
                $.post('form_data.php', $(form).serialize(), function(response) {
                    $(form)[0].reset();
                    correct = generateRandom('.test p span');
                    closeNotification('.contact-wrap');
                    showNotification(response.msg, response.class);
                }, 'json');
            } else showNotification('Incorrect number selected!', 'error');              
            
        }
    });  

  });
  
})(jQuery);















    











































 
