/* jshint devel:true */

(function() {
  $(window).resize(handleResize);
  $(window).trigger('resize');

  var controller = new ScrollMagic.Controller();

  // Hero header
  new ScrollMagic.Scene({
  triggerElement: '#header-trigger',
    triggerHook: 'onLeave',
    duration: $('.section-header').height()
  })
  .setTween(TweenMax.to('.hero-header', 1, {y: '40%' }))
  .addTo(controller);

  // Stars
  new ScrollMagic.Scene({
  triggerElement: '#header-trigger',
    triggerHook: 'onLeave',
    duration: $('.section-header').height()
  })
  .setTween(TweenMax.to('.stars', 1, {y: '-7' }))
  .addTo(controller);

  // Circles
  new ScrollMagic.Scene({
  triggerElement: '#header-trigger',
    triggerHook: 'onLeave',
    duration: $('.section-header').height()
  })
  .setTween(TweenMax.to('.circles', 1, {y: '-15' }))
  .addTo(controller);

  // Dots
  new ScrollMagic.Scene({
  triggerElement: '#header-trigger',
    triggerHook: 'onLeave',
    duration: $('.section-header').height()
  })
  .setTween(TweenMax.to('.dots', 1, {y: '-20' }))
  .addTo(controller);

  // bg
  new ScrollMagic.Scene({
  triggerElement: '#header-trigger',
    triggerHook: 'onLeave',
    duration: $('.section-header').height()
  })
  .setTween(TweenMax.to('.section-header-bg', 1, {y: '200' }))
  .addTo(controller);

  // nav-header
  new ScrollMagic.Scene({
  triggerElement: '.section-wedding',
    triggerHook: 'onLeave',
    duration: $(document).height() - $('.section-header').height()
  })
  .setPin('.nav-header')
  .setTween(TweenMax.to('.section-header-bg', 1, {y: '200' }))
  .addTo(controller);

  controller.scrollTo(function (newpos) {
    console.log(newpos);
    TweenMax.to(window, 1, {scrollTo: {y: newpos}, ease: Expo.easeOut});
  });

  //  bind scroll to anchor links
  $(document).on("click", "a[href^=#]", function (e) {
    var id = $(this).attr("href");
    if ($(id).length > 0) {
      e.preventDefault();

      // trigger scroll
      controller.scrollTo(id);

        // if supported by the browser we can even update the URL.
      if (window.history && window.history.pushState) {
        history.pushState("", document.title, id);
      }
    }
  });

  function handleResize() {
    $('.section').css( {
      'width': $(window).width(),
      // 'height': $(window).height(),
      'min-height': $(window).height()
    });

    $('.section-registry').css({
      'min-height': 450
    });

    $('.section-header-bg').css({
      'width': $(window).width(),
      'height': $(window).height()
    });

  }
}());
