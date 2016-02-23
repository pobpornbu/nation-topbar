(function($) {
    $.fn.mainnav = function( options ) {
		//if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
        var defaults = {
            theme        : null
        };

        var settings = $.extend(defaults, options);

        return this.each( function() {

			var MqL = 768;
            var $this = $(this), opts = settings;

			//move nav element position according to window width
			// moveNavigation();
			$(window).on('resize', function(){
				(!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
			}).resize();

			//mobile - open lateral menu clicking on the menu icon
			$('.js-nav-trigger').on('click', function(event){
				event.preventDefault();
				if( $('.js-main-content').hasClass('nav-is-visible') ) {
					closeNav();
					$('.js-overlay').removeClass('is-visible');
				} else {
					$(this).addClass('nav-is-visible');
					$('.js-primary-nav').addClass('nav-is-visible');
					$('.js-main-header').addClass('nav-is-visible');
					$('.js-main-content').addClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
						$('body').addClass('overflow-hidden');
					});
					toggleSearch('close');
					$('.js-overlay').addClass('is-visible');
				}
			});

			//open search form
			$('.js-search-trigger').on('click', function(event){
				event.preventDefault();
				toggleSearch();
				closeNav();
			});

			//close lateral menu on mobile
			$('.js-overlay').on('swiperight', function(){
				if($('.js-primary-nav').hasClass('nav-is-visible')) {
					closeNav();
					$('.js-overlay').removeClass('is-visible');
				}
			});
			$('.nav-on-left .js-overlay').on('swipeleft', function(){
				if($('.js-primary-nav').hasClass('nav-is-visible')) {
					closeNav();
					$('.js-overlay').removeClass('is-visible');
				}
			});
			$('.js-overlay').on('click', function(){
				closeNav();
				toggleSearch('close')
				$('.js-overlay').removeClass('is-visible');
			});

			//submenu items - go back link
			$('.go-back').on('click', function(){
				$(this).parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('moves-out');
			});

			//prevent default clicking on direct children of .js-primary-nav
			/*$('.js-primary-nav').children('.has-children').children('a').on('click', function(event){
				event.preventDefault();
			});*/
			//open submenu
			var tempType;
			$('.js-nav').on('nav-type', function(e, type){
				if(tempType != type){
					tempType = type;

					var $btn = $('.link-open-submenu'),
							$btnScope = $('.js-nav .js-primary-nav .menu__item.has-children'),
							$primaryLink = $('.js-header-buttons');

					$btn.off('.nav');
					$btnScope.off('.nav');

					if(type == 'desktop'){
						console.log($btnScope);

						var eventName = Detectizr.device.type == 'tablet' ? 'click' : 'mouseenter';
						$btn.on(eventName+'.nav', function(e){
							e.preventDefault();
							var selected = $(this);
							if(eventName == 'click' && selected.hasClass('selected')){
								$btnScope.trigger('mouseleave');
								//console.log('trigger_mouseleave!!');
							}else{
								selected.addClass('selected').parent().next('ul').removeClass('is-hidden').end().parents('.has-children').parent('ul').addClass('moves-out');
								selected.parents('.has-children').siblings('.has-children').children('ul').addClass('is-hidden').end().children('a').removeClass('selected');
								$('.js-overlay').addClass('is-visible');
							}
							toggleSearch('close');
						});
						$btnScope.on('mouseleave.nav', function(event){
							var selected = $(this).children('.js-is-submenu ').find('a');
							selected.removeClass('selected').parent().next('ul').addClass('is-hidden').end().parents('.has-children').parent('ul').removeClass('moves-out');
							$('.js-overlay').removeClass('is-visible');
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

						$primaryLink.children().appendTo('.js-header-buttons');
						$('#main-menu-topnew1').children().text('ลูกค้าบุคคล');
						// console.log($(".js-nav-scroll-gallery"));

					}else if(type == 'mobile'){
						console.log($btn);
						// $btn.on('click.nav', function(e){
						// 	e.preventDefault();

						// 	var selected = $(this);
						// 	var $ul = selected.parent().next('ul');

						// 	selected.addClass('selected');
						// 	$ul.removeClass('is-hidden').end().parents('.has-children').parent('ul').addClass('moves-out');
						// 	selected.parents('.has-children').siblings('.has-children').children('ul').addClass('is-hidden').end().children('a').removeClass('selected');
						// 	$('.js-overlay').addClass('is-visible');
						// });

            // $styledSelect.on("click", function(e){
            //     e.stopPropagation();
            //     if($styledSelect.hasClass('active')){
            //         $styledSelect.removeClass('active');
            //         $list.hide();
            //     }else{
            //         $('.select__selected.active').each(function(){
            //             $(this).removeClass('active').next('ul.select__options').hide();
            //         });
            //         $(this).toggleClass('active').next('ul.select__options').toggle();
            //     }
            // });

						$btn.on('click.nav', function(e){
							e.preventDefault();
							var $submenu = $('.js-toggle-submenu');
							console.log('----------');
							// $submenu.toggleClass('is-hidden');
							// if($btn.hasClass('active')){
							// 	console.log('step1');
							// 	$btn.removeClass('active');
							// 	$submenu.removeClass('active');

							// }else{
								$('.link-open-submenu.active').each(function(){
									console.log('removeClass');
									$('.link-open-submenu').removeClass('active').parent().next('.js-toggle-submenu').removeClass('active');
								});
								console.log('toggleClass');
								$(this).toggleClass('active').parent().next('.js-toggle-submenu').toggleClass('active');
							// }
						});

						$(".js-nav-scroll-news, .js-nav-scroll-gallery, .js-nav-scroll-program").mCustomScrollbar("destroy");

						$primaryLink.children().appendTo('.js-primary-link');
						$('#main-menu-topnew1').children().text('หน้าแรกเอไอเอส');
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
				$('.js-primary-nav').removeClass('nav-is-visible');
				$('.has-children ul').addClass('is-hidden');
				$('.has-children a').removeClass('selected');
				$('.moves-out').removeClass('moves-out');
				$('.js-main-content').removeClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					$('body').removeClass('overflow-hidden');
				});
			}

			function toggleSearch(type) {
				if(type=="close") {
					//close serach
					$('.js-search').removeClass('is-visible');
					$('.js-search-trigger').removeClass('search-is-visible');
					$('.js-overlay').removeClass('search-is-visible');
				} else {
					//toggle search visibility
					$('.js-search').toggleClass('is-visible');
					$('.js-search-trigger').toggleClass('search-is-visible');
					$('.js-overlay').toggleClass('search-is-visible');
					if($(window).width() > MqL && $('.js-search').hasClass('is-visible')) $('.js-search').find('input[type="search"]').focus();
					($('.js-search').hasClass('is-visible')) ? $('.js-overlay').addClass('is-visible') : $('.js-overlay').removeClass('is-visible') ;
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
				var theme = $('#ais_topbar');
				var navigation = $('.js-nav');
		  		var desktop = checkWindowWidth();
		        if ( opts.theme == 'full-menu' ) {
		        	if(desktop){
		        		theme.removeClass('hamberger');
		        		theme.addClass('full-menu');
						navigation.detach();
						navigation.insertBefore('.js-header-buttons');
						navigation.trigger('nav-type','desktop');
		        	}else {
		        		theme.removeClass('full-menu');
		        		theme.addClass('hamberger');
						navigation.detach();
						navigation.insertAfter('.js-main-content');
						navigation.trigger('nav-type','mobile');
		        	}
				} else if(opts.theme == 'extra-menu') {
					theme.addClass('hamberger extra-menu');
					navigation.detach();
					navigation.insertAfter('.js-main-content');
					navigation.trigger('nav-type','mobile');
				} else {
					theme.addClass('hamberger');
					navigation.detach();
					navigation.insertAfter('.js-main-content');
					navigation.trigger('nav-type','mobile');
				}
			}
		});
	}
}(jQuery));