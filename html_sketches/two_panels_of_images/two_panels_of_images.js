$(function () {

	var $bod = $('body'),
			$menu_button = $('#menu-button'),
			$menu_close_button = $('#menu-close-button')

	$bod.on('click', function() {
		$bod.toggleClass('hide-hud')
	})

	$(window).on('load', function() {
		setTimeout( function() {
			$bod.addClass('hide-hud')
		}, 2000)
	})

	$menu_button.on( 'click', function(e) {
	  $bod.addClass('show-menu')
	  e.preventDefault()
	} )

	$menu_close_button.on( 'click', function(e) {
	  $bod.removeClass('show-menu')
	  e.preventDefault()
	} )

	$(window).on('load', function() {
		$('#completed-images').flickity()
	})

})