$(function() {
	smoothScroll(600);
	memberBelt();
	memberLoad();
	projectStuff();
  google.maps.event.addDomListener(window, 'load', initialize);
	
	$("header h1").fitText(1, { minFontSize: '20px', maxFontSize: '72px' });
	$(".biglink").fitText(1.5);
	
});

// smoothScroll function is applied from the document ready function
function smoothScroll (duration) {
	$('a[href^="#"]').on('click', function(event) {

	    var target = $( $(this).attr('href') );

	    if( target.length ) {
	        event.preventDefault();
	        $('html, body').animate({
	            scrollTop: target.offset().top
	        }, duration);
	    }
	});
}

function initialize() {
  var mapCanvas = document.getElementById('map-canvas');
  var fotoPasja = new google.maps.LatLng(50.062697, 19.926527);
  var mapOptions = {
      center: fotoPasja,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
  map = new google.maps.Map(document.getElementById('map-canvas'),
          mapOptions);
  var image = 'assets/img/marker.png';

  marker = new google.maps.Marker({
    map:map,
    draggable:false,
    animation: google.maps.Animation.DROP,
    position: fotoPasja,
    title:"Foto Pasja",
    icon: image
  });

  var styles = [
  {
    stylers: [
      { hue: "#EDEAEA" },
      { saturation: -100 }
    ]
  },{
    featureType: "road",
    elementType: "geometry",
    stylers: [
      { lightness: 100 },
      { visibility: "simplified" }
    ]
  },{
    featureType: "road",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  }
];

map.setOptions({styles: styles});
   google.maps.event.addListener(marker, 'click', toggleBounce);
}

function toggleBounce() {
  if (marker.getAnimation() != null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

function memberBelt() {
  $(".trigger").remove();
  $(".return").remove();
  $('.thumb-unit').click(function() {
    $('.member-belt').addClass("slided");
    $('.member-container').show();
  });
  $('.member-return').click(function() {
    $('.member-belt').removeClass("slided");
    $('.member-container').hide(800);
  });
}

function  memberLoad() {
  $.ajaxSetup({ cache: true });
  $('.thumb-unit').click(function() {
    var $this = $(this),
        newName = $this.find('strong').text(),
        newfolder = $this.data('folder'),
        spinner = '<div class="loader">Loading...</div>',
        newHTML = 'members/'+ newfolder;
    $('.member-load').html(spinner).load(newHTML);
    $('.member-name').text(newName);
  });
}

function projectStuff() {
  $('.project-unit').first().addClass('active-project');
  $('.project-logo').first().addClass('active-project');
  $('.projects-mobile-nav span').first().addClass('active-project');
  $('.project-logo, .projects-mobile-nav span').click(function() {
    var $this = $(this),
      $siblings = $this.parent().children(),
      position = $siblings.index($this);
    $('.project-unit').removeClass('active-project').eq(position).addClass('active-project');
    $siblings.removeClass('active-project');
    $this.addClass('active-project');
  });
  
  $('.project-control-next, .project-control-prev').click(function() {
    var $this = $(this),
        curActiveProject = $('.projects-belt').find('.active-project'),
        position = $('.projects-belt').children().index(curActiveProject),
        projectNumber = $('.project-unit').length;
        
      if($this.hasClass('project-control-next')) {
        if(position < projectNumber -1){
          $('.active-project').removeClass('active-project').next().addClass('active-project');
        } else {
          $('.project-unit').removeClass('active-project').first().addClass('active-project');
          $('.project-logo').removeClass('active-project').first().addClass('active-project');
        }
      } else {   
        if (position === 0) {
          $('.project-unit').removeClass('active-project').last().addClass('active-project');
          $('.project-logo').removeClass('active-project').last().addClass('active-project');
        } else {
          $('.active-project').removeClass('active-project').prev().addClass('active-project');  
        }
      }
  });
}

(function( $ ){
  $.fn.fitText = function( kompressor, options ) {
    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){
      // Store the object
      var $this = $(this);
      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };
      // Call once to set.
      resizer();
      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);
    });
  };
})( jQuery );