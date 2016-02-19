$(function() {
	//if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
	var MqL = 768;
	//move nav element position according to window width
	// moveNavigation();
	$(window).on('resize', function(){
		(!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
	}).resize();

	//mobile - open lateral menu clicking on the menu icon
	$('.js-nav-trigger').on('click', function(event){
		event.preventDefault();
		if( $('.cd-main-content').hasClass('nav-is-visible') ) {
			closeNav();
			$('.cd-overlay').removeClass('is-visible');
		} else {
			$(this).addClass('nav-is-visible');
			$('.cd-primary-nav').addClass('nav-is-visible');
			$('.js-main-header').addClass('nav-is-visible');
			$('.cd-main-content').addClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').addClass('overflow-hidden');
			});
			toggleSearch('close');
			$('.cd-overlay').addClass('is-visible');
		}
	});

	//open search form
	$('.cd-search-trigger').on('click', function(event){
		event.preventDefault();
		toggleSearch();
		closeNav();
	});

	//close lateral menu on mobile 
	$('.cd-overlay').on('swiperight', function(){
		if($('.cd-primary-nav').hasClass('nav-is-visible')) {
			closeNav();
			$('.cd-overlay').removeClass('is-visible');
		}
	});
	$('.nav-on-left .cd-overlay').on('swipeleft', function(){
		if($('.cd-primary-nav').hasClass('nav-is-visible')) {
			closeNav();
			$('.cd-overlay').removeClass('is-visible');
		}
	});
	$('.cd-overlay').on('click', function(){
		closeNav();
		toggleSearch('close')
		$('.cd-overlay').removeClass('is-visible');
	});

	//submenu items - go back link
	$('.go-back').on('click', function(){
		$(this).parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('moves-out');
	});
	
	//prevent default clicking on direct children of .cd-primary-nav 
	/*$('.cd-primary-nav').children('.has-children').children('a').on('click', function(event){
		event.preventDefault();
	});*/
	//open submenu
	var tempType;
	$('.cd-nav').on('nav-type', function(e, type){
		if(tempType != type){
			tempType = type;

			var $btn = $('.cd-nav #cd-primary-nav .menu__item.has-children .js-is-submenu a');
			var $btnScope = $('.cd-nav #cd-primary-nav .menu__item.has-children');
			$btn.off('.nav');
			$btnScope.off('.nav');

			if(type == 'desktop'){
				var eventName = Detectizr.device.type == 'tablet' ? 'click' : 'mouseenter';
				$btn.on(eventName+'.nav', function(e){
					e.preventDefault();
					var selected = $(this);
					if(eventName == 'click' && selected.hasClass('selected')){
						$btnScope.trigger('mouseleave');console.log('trigger_mouseleave!!');
					}else{
						selected.addClass('selected').parent().next('ul').removeClass('is-hidden').end().parents('.has-children').parent('ul').addClass('moves-out');
						selected.parents('.has-children').siblings('.has-children').children('ul').addClass('is-hidden').end().children('a').removeClass('selected');
						$('.cd-overlay').addClass('is-visible');
					}
					toggleSearch('close');
				});
				$btnScope.on('mouseleave.nav', function(event){
					var selected = $(this).children('.js-is-submenu ').find('a');
					selected.removeClass('selected').parent().next('ul').addClass('is-hidden').end().parents('.has-children').parent('ul').removeClass('moves-out');
					$('.cd-overlay').removeClass('is-visible');
				});
				
				// Menu Scrollbar
				$(".js-nav-scroll-news, .js-nav-scroll-program").mCustomScrollbar({
					setHeight: 300,
					theme: 'minimal-dark',
					mouseWheel:{ enable: true, preventDefault: true}
				});

				$(".js-nav-scroll-gallery").mCustomScrollbar({
					setHeight: 300,
					theme: 'minimal-dark',
					mouseWheel:{ enable: true, preventDefault: true, scrollAmount: 600, deltaFactor: 600}
				});
				console.log($(".js-nav-scroll-gallery"));

			}else if(type == 'mobile'){
				$btn.on('click.nav', function(e){ 
					e.preventDefault();

					var selected = $(this);
					var $ul = selected.parent().next('ul');

					selected.addClass('selected');
					$ul.removeClass('is-hidden').end().parents('.has-children').parent('ul').addClass('moves-out');
					selected.parents('.has-children').siblings('.has-children').children('ul').addClass('is-hidden').end().children('a').removeClass('selected');
					$('.cd-overlay').addClass('is-visible');
				});
				
				$(".js-nav-scroll-news, .js-nav-scroll-gallery, .js-nav-scroll-program").mCustomScrollbar("destroy");
			}
		}
	});



	// Tab in submenu in desktop navbar
	$('.js-tab-list').each(function(){
		var $this 				= $(this);
		var $currentwrap 	= $this.find('div.active');
		var $currentlink 	= $currentwrap.find('a');
		var $targetpanel 	= $($currentlink.data('target'));

		//For Desktop
		$this.on('mouseover', '.js-tab-control', function(e) {
			e.preventDefault();
			var $currentlink = $(this);
			var id = $currentlink.data('target');
			if (id && !$currentlink.is('.active')) {
				$targetpanel.removeClass('active');
				$currentwrap.removeClass('active');

				$targetpanel = $(id).addClass('active');
				$currentwrap = $currentlink.parent().addClass('active');
			}
		});

		//For mobile
		/*if(Modernizr.touch){
			$this.on('click', function(e){
				e.preventDefault();
				e.stopPropagation();
			});
			$this.on('click', '.js-tab-control', function(){
				var getLink 		 	= $(this).data('href'); //get attr data-href for open link
				if(getLink){
					window.location.href = getLink;
				}		
			});
		}*/
	});

	function closeNav() {
		$('.js-nav-trigger').removeClass('nav-is-visible');
		$('.js-main-header').removeClass('nav-is-visible');
		$('.cd-primary-nav').removeClass('nav-is-visible');
		$('.has-children ul').addClass('is-hidden');
		$('.has-children a').removeClass('selected');
		$('.moves-out').removeClass('moves-out');
		$('.cd-main-content').removeClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			$('body').removeClass('overflow-hidden');
		});
	}

	function toggleSearch(type) {
		if(type=="close") {
			//close serach 
			$('.cd-search').removeClass('is-visible');
			$('.cd-search-trigger').removeClass('search-is-visible');
			$('.cd-overlay').removeClass('search-is-visible');
		} else {
			//toggle search visibility
			$('.cd-search').toggleClass('is-visible');
			$('.cd-search-trigger').toggleClass('search-is-visible');
			$('.cd-overlay').toggleClass('search-is-visible');
			if($(window).width() > MqL && $('.cd-search').hasClass('is-visible')) $('.cd-search').find('input[type="search"]').focus();
			($('.cd-search').hasClass('is-visible')) ? $('.cd-overlay').addClass('is-visible') : $('.cd-overlay').removeClass('is-visible') ;
		}
	}

	function checkWindowWidth() {
		//check window width (scrollbar included)
		var e = window, 
            a = 'inner';
        if (!('innerWidth' in window )) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        if ( e[ a+'Width' ] >= MqL ) {
			return true;
		} else {
			return false;
		}
	}

	function moveNavigation(){
		var them = $('#menu-theme');
		var navigation = $('.cd-nav');
  		var desktop = checkWindowWidth();
        if ( desktop ) {
        	if(theme === 'mini-menu'){
				navigation.detach();
				navigation.insertAfter('.cd-main-content');
				navigation.trigger('nav-type','mobile');
        	}else {

				navigation.detach();
				navigation.insertBefore('.cd-header-buttons');
				navigation.trigger('nav-type','desktop');
        	}
		} else {
			navigation.detach();
			navigation.insertAfter('.cd-main-content');
			navigation.trigger('nav-type','mobile');
		}
	}
});