/* jshint devel:true */

(function() {
  $(window).resize(handleResize);
  $(window).trigger('resize');

  var controller = new ScrollMagic.Controller();
  var headerBgTween = TweenMax.to($('hero-bg'), {
    y: '-100px'
  });

  // var headerTxtTween = TweenMax.fromTo($('.hero-header', {

  // }, {

  // });

  var headerTimeline = new TimelineMax();
  headerTimeline.add([
    headerBgTween,
    // headerTxtTween
  ]);
  // var headerScene = new ScrollMagic({
  //     duration: $('.')
  //   })
  //   .setTween(headerTimeline)
  //   .addTo(controller);


  function handleResize() {
    $('.section').css( {
      'width': $(window).width(),
      // 'height': $(window).height(),
      'min-height': $(window).height()
    });

  }
}());
