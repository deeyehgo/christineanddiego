/* jshint devel:true */

(function() {
  $(window).resize(handleResize);
  $(window).trigger('resize');

  function handleResize() {
    $('.section').css( {
      'width': $(window).width(),
      'height': $(window).height()
    })
  }
}());
