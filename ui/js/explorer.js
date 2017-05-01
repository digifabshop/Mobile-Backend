var Utils = function() {

  var OBJ = {}

  OBJ.base_url = function () {
    return window.location.protocol + '//' + window.location.hostname + '/api/'    
  }

  return OBJ

}()


var SearchManager = function() {

  var OBJ = {},
      $pinned_tags = $( '#pinned-tags' )

  OBJ.add_tag = function(name, id, type) {

    $( this ).addClass()

    var $el = $( '<span class="tag">'+name+'<span class="x"></span></span>' )

    $el.data( {'name': name, 'id': id, 'type': type} )

    $el.click( SearchManager.remove_tag )

    $el.appendTo( $pinned_tags )

    Filters.update_status()

  }
  
  var remove_tag = function() {

    var $this = $( this )

    $('.tag[data-id="' + $this.data('id') + '"]').removeClass( 'hide' )

    $this.remove()

    Filters.update_status()

  }
  OBJ.remove_tag = remove_tag

  $( '#clear-all-filters' ).click( function() {
    $pinned_tags.find( '.tag' ).each( remove_tag )
  } )

  return OBJ

}()


var Filters = function() {

  var OBJ = {}

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

  var update_status = function() {

    $( '.filter' ).each( function() {

      var $filter = $( this ),
          $info = $filter.find( '.filter-info' ),
          $tags = $filter.find( '.tag' ).not( '.parent' ),
          $hidden = $tags.filter( '.hide' )

      var str = $tags.length + ' tags'

      if( $hidden.length ) {
        str += ', ' + $hidden.length + ' pinned'
      }

      $info.text( str )

    } )

  }
  OBJ.update_status = update_status

  var build_tag = function (tag, type) {

    var $tag = $( '<span class="tag" data-id="'+tag.id+'" data-tag-type="'+type+'">'+tag.name+'</span>' )

    $tag.click( function() {
      $tag.addClass( 'hide' )
      SearchManager.add_tag( tag.name, tag.id, type)
    } )

    return $tag

  }

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
        build_tag(child, section_name_lower).appendTo( $children_wrapper )
        build_tag(child, section_name_lower).appendTo( $related_tags )
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

      var $client = $( '<span class="tag" data-id="'+client.id+'" data-tag-type="client">'+client.name+'</span>' )

      $client.click( function() {
        $client.addClass( 'hide' )
        SearchManager.add_tag( client.name, client.id, 'client')
      } )

      $client.appendTo( $client_tags )

    } )

  }

  var build_project_information = function() {

    var $types_button = $( '#types-button' ),
        $types_container = $( '#types-container' )
        $status_button = $( '#status-button' ),
        $status_container = $( '#status-container' ),
        $year_button = $( '#year-button' ),
        $year_container = $( '#year-container' )


    // Find the id of the tag with name of the section
    var type_id = _.find( TAGS, { 'name': 'Type' } ).id

    // Collect all the tags that have that id as their parent, these are categories
    var types = _.filter( TAGS, { 'parent_id': type_id } )

    // For each one of the types… 
    _.forEach( types, function( tag ) {

      build_tag(tag, 'type').appendTo( $types_container )

    } )

    $types_button.click( function() {
      if( $types_button.hasClass( 'active' ) ) {
        $types_button.removeClass( 'active' )
        $status_button.removeClass( 'hide' )
        $year_button.removeClass( 'hide' )
        $types_container.addClass( 'hide' )
      } else {
        $types_button.addClass( 'active' )
        $status_button.addClass( 'hide' )
        $year_button.addClass( 'hide' )
        $types_container.removeClass( 'hide' )
      }
      $( '#project-information-filter .expanded' ).height( $( '#project-information-filter .inner').height() )
    } )

    $status_button.click( function() {
      if( $status_button.hasClass( 'active' ) ) {
        $status_button.removeClass( 'active' )
        $types_button.removeClass( 'hide' )
        $year_button.removeClass( 'hide' )
        $status_container.addClass( 'hide' )
      } else {
        $status_button.addClass( 'active' )
        $types_button.addClass( 'hide' )
        $year_button.addClass( 'hide' )
        $status_container.removeClass( 'hide' )
      }
      $( '#project-information-filter .expanded' ).height( $( '#project-information-filter .inner').height() )
    } )

    $year_button.click( function() {
      if( $year_button.hasClass( 'active' ) ) {
        $year_button.removeClass( 'active' )
        $types_button.removeClass( 'hide' )
        $status_button.removeClass( 'hide' )
        $year_container.addClass( 'hide' )
      } else {
        $year_button.addClass( 'active' )
        $status_button.addClass( 'hide' )
        $types_button.addClass( 'hide' )
        $year_container.removeClass( 'hide' )
      }
      $( '#project-information-filter .expanded' ).height( $( '#project-information-filter .inner').height() )
    } )

  }

  var setup = function() {

    $( '#media-filter .tag').each( function() {

      var $this = $( this )

      $this.click( function() {
        $this.addClass( 'hide' )
        SearchManager.add_tag( $this.text(), $this.data('id'), 'media' )
      } )

    } )


    $.getJSON( BASE + 'tags', function( r ) {

      TAGS = r.data

      build_2_level_tag_filter( 'Materials' )
      build_2_level_tag_filter( 'Content' )

      build_project_information()

      update_status()
    } )

    $.getJSON( BASE + 'clients', function( r ) {

      CLIENTS = r.data

      build_clients()

      update_status()
    } )

  }

  setup()

  return OBJ

}()