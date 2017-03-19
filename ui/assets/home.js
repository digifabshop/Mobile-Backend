$( function() {

  var base = window.location.protocol + '//' + window.location.hostname + '/api/'

  var create_slide = function( data ) {

    var $slide = $( '<div />' )
                  .attr( 'style', 'background-image: url('+base + data.url+')' )
                  .addClass( 'slide' )

    // PROJECT LOCATION
    if( data.project && data.project.address ) {
      $( '<span />' )
        .html( '<strong>Project Location</strong>' + data.project.address )
        .addClass( 'info location' )
        .appendTo( $slide )
    }

    // ASSET TAGS
    if( data.tags ) {
      for ( var i = 0; i < data.tags.length; i++ ) {
        $( '<a />' )
          .attr( 'href', 'http://example.com' )
          .text( data.tags[ i ].name )
          .addClass( 'info tag' )
          .appendTo( $slide )
      }
    }

    //  PHOTOGRAPHER CREDIT
    if( data.credit_name ) {
      if( data.credit_url )
        var $credit = $( '<a />' ).attr( 'href', data.credit_url ).attr( 'target', '_blank' )
      else
        var $credit = $( '<span />' )

      $credit
        .text( 'Photography by ' + data.credit_name )
        .addClass( 'info photographer' )
        .appendTo( $slide )
    }

    return $slide

  }

  $.getJSON( base + 'assets?visible=1', function( r ) {
    var assets = r.data

    for ( var i = 0; i < assets.length; i++ ) {
      $( '#flickity' ).append( create_slide( assets[ i ] ) )
    }

    var flkty = new Flickity( '#flickity', {
      pageDots: false,
      prevNextButtons: false
    } )

  } )

} )