$( function() {

  var base = window.location.protocol + '//' + window.location.hostname + '/api/'

  $( '.filter' ).on( 'click', '.filter-toggle', function() {
    $( this ).parent().toggleClass( 'show-expanded' )
  })

} )