/* jshint devel:true */

(function() {
  $(window).resize(handleResize);
  $(window).trigger('resize');

  var controller = new ScrollMagic.Controller();
  var headerBgTween = TweenMax.to('.hero-header', {
    y: '-1000px'
  });

  // var headerTxtTween = TweenMax.fromTo($('.hero-header', {

  // }, {

  // });

  var headerTimeline = new TimelineMax();
  headerTimeline.add([
    headerBgTween,
    // headerTxtTween
  ]);
  var headerScene = new ScrollMagic.Scene({
    triggerElement: '.section-header',
    duration: 400
  })
  .setTween(headerBgTween)
  .addTo(controller);


  function handleResize() {
    $('.section').css( {
      'width': $(window).width(),
      // 'height': $(window).height(),
      'min-height': $(window).height()
    });

    $('.section-registry').css({
      'min-height': 450
    });

  }
}());
