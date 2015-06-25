(function($) {

	// Textarea
	autosize($('textarea'));
	$('.js-comment-textarea').on('focus', function() {
		$(this).parent().toggleClass('active');
	});

  $(window).load(function(){   
    $("#previous-clip").mCustomScrollbar({
      theme:"minimal"
    });
  });

  // Tab in submenu in desktop navbar 
  $('.js-nav-desktop a').on('mouseenter',function(){
    $(this).click().tab('show');
  });
  
  if (Modernizr.touch){
    $('.js-nav-desktop a').on('click', function(e){
      event.preventDefault();
    });
  }

  $(window).scroll(function() {
    if ($(document).scrollTop() > 658) {
      $('#nation-nav-theme').addClass('shrink');
    } else {
      $('#nation-nav-theme').removeClass('shrink');
    }
  });
})(jQuery);