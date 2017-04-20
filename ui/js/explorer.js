$( function() {

  var BASE = window.location.protocol + '//' + window.location.hostname + '/api/',
      TAGS = [],
      $material_categories = $( '#material-categories' ),
      $content_categories = $( '#content-categories' )

  $( '.filter' ).on( 'click', '.filter-heading', function() {

    var $filter = $( this ).parent( '.filter' ),
        $expanded = $filter.toggleClass( 'show-expanded' ).find( '.expanded' ),
        $inner = $expanded.find( '.inner' )

    $expanded.height( $filter.hasClass( 'show-expanded' ) ? $inner.height() : 0 )
    
  })

  var build_2_level_tag_filter = function( section_name, $section_el ) {

    // Find the id of the tag with name of the section
    var section_id = _.find( TAGS, { 'name': section_name } ).id

    // Collect all the tags that have that id as their parent, these are categories
    var categories = _.filter( TAGS, { 'parent_id': section_id } )
    console.log( categories )

    // For each one of the categories… 
    _.forEach( categories, function( tag ) {

      // Create DOM elements of all of the categories
      var $cat_tag = $( '<div class="tag parent" data-category-id="'+tag.id+'">'+tag.name+'<span class="triangle"></span></div>' )

      // Attach them to the DOM
      $material_categories.append( $cat_tag )

      // Create a DOM element to contain the items in that category
      var $children_wrapper = $( '<div class="children hide" data-category-id="'+tag.id+'" />')

      var this_cat_id = tag.id

      // Collect all of the tags with that tag as their parent id
      var children = _.filter( TAGS, { 'parent_id': this_cat_id } )

      _.forEach( children, function ( child ) {
        // Create DOM elements for these tags
        // Attach it to the container
        $( '<span class="tag">' + child.name + '</span>' ).appendTo( $children_wrapper )
      } )

      // Attach the container to the DOM
      $material_categories.after( $children_wrapper )
      
      // Attach click events to material categories to toggle visibilty of related container of children
      $cat_tag.on( 'click', function() {
        
        var $this = $( this ),
            clicked_category_id = $this.data( 'category-id' ),
            $this_wrapper = $( '#materials-filter .children[data-category-id='+clicked_category_id+']' )

        $( '#materials-filter .tag.parent' ).not( $this ).hide()

        if( $this.hasClass( 'active' ) ) {
          $( '#materials-filter .tag.parent' ).show()
          $this.removeClass( 'active' )
          $this_wrapper.addClass( 'hide' )
        } else {
          $( '#materials-filter .tag.parent.active').removeClass( 'active' )
          $this.addClass( 'active' )
          $( '#materials-filter .children').addClass( 'hide' )
          $this_wrapper.removeClass( 'hide' )
          $( '#materials-filter .tag.parent' ).not( $this ).hide()
        }

        $( '#materials-filter .expanded').height( $( '#materials-filter .expanded .inner').height() )

      } )

    } )

  }

  $.getJSON( BASE + 'tags', function( r ) {

    TAGS = r.data

    build_2_level_tag_filter( 'Materials', $material_categories )
    build_2_level_tag_filter( 'Content', $content_categories )

  } )

} )