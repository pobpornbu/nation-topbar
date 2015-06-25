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


  $(window).scroll(function() {
    if ($(document).scrollTop() > 658) {
      $('#nation-nav-theme').addClass('shrink');
    } else {
      $('#nation-nav-theme').removeClass('shrink');
    }
  });

  // Tab in submenu in desktop navbar
  $('.js-tab-list').each(function(){
    var $this = $(this),
        $currentwrap = $this.find('div.active'),
        $currentlink = $currentwrap.find('a'),
        $targetpanel = $($currentlink.data('target'));

    $this.on('mouseover', '.js-tab-control', function(e) {
      e.preventDefault();
      var $currentlink = $(this),
          id = $currentlink.data('target');
      console.log(id);
      if (id && !$currentlink.is('.active')) {
        $targetpanel.removeClass('active');
        $currentwrap.removeClass('active');

        $targetpanel = $(id).addClass('active');
        $currentwrap = $currentlink.parent().addClass('active');
      }
    });

    if (Modernizr.touch){
      $this.on('click', '.js-tab-control', function(e){
        event.preventDefault();
      });
    }
  });
})(jQuery);