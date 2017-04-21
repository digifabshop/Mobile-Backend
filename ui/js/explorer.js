$( function() {

  var BASE = window.location.protocol + '//' + window.location.hostname + '/api/',
      TAGS = [],
      CLIENTS = [],
      $client_tags = $( '#client-tags' ),
      $materials_categories = $( '#materials-categories' ),
      $content_categories = $( '#content-categories' ),
      $related_tags = $( '#related-tags' )

  $( '.filter' ).on( 'click', '.filter-heading', function() {

    var $filter = $( this ).parent( '.filter' ),
        $expanded = $filter.toggleClass( 'show-expanded' ).find( '.expanded' ),
        $inner = $expanded.find( '.inner' )

    $expanded.height( $filter.hasClass( 'show-expanded' ) ? $inner.height() : 0 )
    
  })

  var build_2_level_tag_filter = function( section_name ) {

    var section_name_lower = section_name.toLowerCase(),
        $section_el = $( '#' + section_name_lower + '-categories' )

    // Find the id of the tag with name of the section
    var section_id = _.find( TAGS, { 'name': section_name } ).id

    // Collect all the tags that have that id as their parent, these are categories
    var categories = _.filter( TAGS, { 'parent_id': section_id } )

    // For each one of the categories… 
    _.forEach( categories, function( tag ) {

      // Create DOM elements of all of the categories
      var $cat_tag = $( '<div class="tag parent" data-category-id="'+tag.id+'">'+tag.name+'<span class="triangle"></span></div>' )

      // Attach them to the DOM
      $section_el.append( $cat_tag )

      // Create a DOM element to contain the items in that category
      var $children_wrapper = $( '<div class="children hide" data-category-id="'+tag.id+'" />')

      var this_cat_id = tag.id

      // Collect all of the tags with that tag as their parent id
      var children = _.filter( TAGS, { 'parent_id': this_cat_id } )

      _.forEach( children, function ( child ) {
        // Create DOM elements for these tags
        // Attach it to the container
        $( '<span class="tag">' + child.name + '</span>' ).appendTo( $children_wrapper )
        $( '<span class="tag">' + child.name + '</span>' ).appendTo( $related_tags )
      } )

      // Attach the container to the DOM
      $section_el.after( $children_wrapper )
      
      // Attach click events to material categories to toggle visibilty of related container of children
      $cat_tag.on( 'click', function() {
        
        var $this = $( this ),
            clicked_category_id = $this.data( 'category-id' ),
            $this_wrapper = $( '#'+section_name_lower+'-filter .children[data-category-id='+clicked_category_id+']' )

        $( '#'+section_name_lower+'-filter .tag.parent' ).not( $this ).hide()

        if( $this.hasClass( 'active' ) ) {
          $( '#'+section_name_lower+'-filter .tag.parent' ).show()
          $this.removeClass( 'active' )
          $this_wrapper.addClass( 'hide' )
        } else {
          $( '#'+section_name_lower+'-filter .tag.parent.active').removeClass( 'active' )
          $this.addClass( 'active' )
          $( '#'+section_name_lower+'-filter .children').addClass( 'hide' )
          $this_wrapper.removeClass( 'hide' )
          $( '#'+section_name_lower+'-filter .tag.parent' ).not( $this ).hide()
        }

        $( '#'+section_name_lower+'-filter .expanded').height( $( '#'+section_name_lower+'-filter .expanded .inner').height() )

      } )

    } )

  }

  var build_clients = function() {

    _.forEach( CLIENTS, function( client ) {

      $( '<span class="tag">' + client.name + '</span>' ).appendTo( $client_tags )

    } )

  }

  $.getJSON( BASE + 'tags', function( r ) {

    TAGS = r.data

    build_2_level_tag_filter( 'Materials' )
    build_2_level_tag_filter( 'Content' )

  } )

  $.getJSON( BASE + 'clients', function( r ) {

    CLIENTS = r.data

    build_clients()

  } )


} )