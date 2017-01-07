$(function () {

	var $bod = $('body')

	$bod.on('click', function() {
		$bod.removeClass('hide-info')
		setTimeout( function() {
			$bod.addClass('hide-info')
		}, 3000)		
	})

	$(window).on('load', function() {
		setTimeout( function() {
			$bod.addClass('hide-info')
		}, 2000)
	})

})