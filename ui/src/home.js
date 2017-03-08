$(function() {

  var base = 'http://localhost/api/'

  $.getJSON(base + 'assets?visible=1', function(r) {
    console.log(r)
    var assets = r.data

    for (var i = 0; i < assets.length; i++) {
      var this_asset = assets[0]
      $('<div />')
        .attr('style', 'background-image: url('+base + this_asset.url+')')
        .addClass('slide')
        .appendTo('#flickity')
    }

    var flkty = new Flickity( '#flickity', {
      pageDots: false,
      prevNextButtons: false
    })

  })

})