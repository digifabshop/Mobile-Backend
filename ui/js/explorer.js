$( function() {

  var base = window.location.protocol + '//' + window.location.hostname + '/api/'

  $( '.filter' ).on( 'click', '.filter-heading', function() {

    var $filter = $( this ).parent( '.filter' ),
        $expanded = $filter.toggleClass( 'show-expanded' ).find( '.expanded' ),
        $inner = $expanded.find( '.inner' )

    $expanded.height( $filter.hasClass( 'show-expanded' ) ? $inner.height() : 0 )
    
  })

} )