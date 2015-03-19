/* jshint devel:true */

(function() {
  var data = {};
  var address;
  var isFormSubmit = false;
  var yOffset = 0;

  $(window).resize(handleResize);
  $(window).trigger('resize');

  var controller = new ScrollMagic.Controller();

  if(!isMobile.any) {
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

    // confetti-left
    new ScrollMagic.Scene({
    triggerElement: '.section-header',
      triggerHook: 'onLeave',
      duration: $(document).height()
    })
    .setTween(TweenMax.fromTo('.left-confetti', 1, {y: '-20%' }, {y: '40%' }))
    .addTo(controller);

    // confetti-right
    new ScrollMagic.Scene({
    triggerElement: '.section-header',
      triggerHook: 'onLeave',
      duration: $(document).height()
    })
    .setTween(TweenMax.fromTo('.right-confetti', 1, {y: '-20%' }, {y: '40%' }))
    .addTo(controller);
  }

  controller.scrollTo(function (newpos) {
    TweenMax.to(window, 1, {scrollTo: {y: newpos}, ease: Expo.easeOut});
  });

  //  bind scroll to anchor links
  $(document).on("click", "a[href^=#]", function (e) {
    var id = $(this).attr("href");
    if ($(id).length > 0) {
      e.preventDefault();

      if(id === "#registry") {
        yOffset = $(document).height() - $('.section-registry').offset().top
      } else {
        yOffset = 0;
      }
      // trigger scroll
      controller.scrollTo(id);

        // if supported by the browser we can even update the URL.
      if (window.history && window.history.pushState) {
        history.pushState("", document.title, id);
      }
    }
  });

  $('#form').on('submit', function() {
    if(isFormSubmit) {
      return false;
    }

    postToForm();
    return false;
  });

  function postToForm() {
    if(validateForm() == false) {
      return;
    }

    $('.send-text').hide();
    $('.sending-text').show();
    
    isFormSubmit = true;

    data = {
      name: $('#name').val(),
      email: $('#email').val(),
      attending: $('#attending').val(),
      party: $('#party').val(),
      message: $('#message').val(),
    };

    var timeline = new TimelineMax({
      onComplete: sendForm
    });

    var tt = 1.2;
    timeline.add([
      TweenMax.to($('.form-name'), tt, {x: "+=100px", autoAlpha: 0, ease: Elastic.easeInOut, easeParams:[1.2, .7]}),
      TweenMax.to($('.form-email'), tt, {x: "+=100px", autoAlpha: 0, ease: Elastic.easeInOut, easeParams:[1.2, .7]}),
      TweenMax.to($('.form-attending'), tt, {x: "+=100px", autoAlpha: 0, ease: Elastic.easeInOut, easeParams:[1.2, .7]}),
      TweenMax.to($('.form-party'), tt, {x: "+=100px", autoAlpha: 0, ease: Elastic.easeInOut, easeParams:[1.2, .7]}),
      TweenMax.to($('.form-message'), tt, {x: "+=100px", autoAlpha: 0, ease: Elastic.easeInOut, easeParams:[1.2, .7]}),
      TweenMax.to($('.sending-miimii'), 1, {autoAlpha: 1, ease: Expo.easeInOut, delay: .35}),
      TweenMax.to($('.btn'), 1, {y: -$('.rsvp-container').height() + $('.sending-miimii').height() - 20, backgroundColor: 'rgba(46, 58, 118, 0)', outline: 'none', ease: Expo.easeInOut, delay: .3}),
      TweenMax.to($(window), 1, {scrollTo: {y: $('.section-rsvp').offset().top }, ease: Expo.easeOut, delay: .5}),
      TweenMax.to($('.section-rsvp'), 1, {css: {'height': 470, 'min-height': 470}, ease: Expo.easeOut, delay: .5})
    ], 0, 'sequence', -tt + .05).play();
    console.log($('.section-rsvp').offset().top);
    $('.btn').addClass('disable');
  }

  function sendForm() {
    $('.form').addClass('u-hide');
    $.ajax({
      url: $('.rsvp').attr('action'),
      data: {
        'name': data.name,
        'email': data.email,
        'attending': data.attending,
        'party': data.party,
        'message': data.message
      },
      accepts: 'application/javascript',
      type: 'POST',
      statusCode: {
        200: function() {
          hideForm(200);
        },
        0: function() {
          hideForm(0);
        },
        404: function() {
          hideForm(404);
        }
      }
    });

    // hideForm(200);
  }

  function hideForm(statusCode) {
    var ttOut = .3;
    var timelineOut = new TimelineMax({
      onComplete: function() {
        $('.form-group').css({
          'display': 'none'
        });

        bg.style.height = ch;
        decoration.style.height = ch;
      }
    });

    $('input').blur();
    TweenMax.to($('.btn'), ttOut, {autoAlpha: 0});

    switch(statusCode) {
      case 200:
      case 0:
        TweenMax.fromTo($('.confirmation-container'), ttOut + .7, {autoAlpha: 0, y: '+= 12', x: '-50%'}, {autoAlpha: 1, y: 0, x: '-50%', delay: ttOut - .2, ease: Expo.easeOut});
        break;
      case 404:
      case 406:
        TweenMax.fromTo($('.submit-error-container'), ttOut + .7, {autoAlpha: 0, y: '+= 12', x: '-50%'}, {autoAlpha: 1, y: 0, x: '-50%', delay: ttOut - .2, ease: Expo.easeOut});
        break;
    }
  }

  function validateForm() {
    if(!$('.form-name input').val()) {
      error('.form-name input');
      return false;
    } else if(!$('.form-email input').val()) {
      error('.form-email input');
      return false;
    }
  }

  function error(selector) {
    TweenMax.to(window, .2, {
      scrollTo: $(selector).offset().top - 50,
      ease: Expo.easeOut,
      onComplete: function() {
        var timeline = new TimelineMax();
        timeline.add([
          TweenMax.to($(selector), .1, {x: 5, ease: Expo.easeOut}),
          TweenMax.to($(selector), .1, {x: -5, ease: Expo.easeOut}),
          TweenMax.to($(selector), .1, {x: 5, ease: Expo.easeOut}),
          TweenMax.to($(selector), .1, {x: -5, ease: Expo.easeOut}),
          TweenMax.to($(selector), .1, {x: 0, ease: Expo.easeOut}),
          TweenMax.to($(selector), .1, {x: -5, ease: Expo.easeOut}),
          TweenMax.to($(selector), .1, {x: 0, ease: Expo.easeOut})
        ], 0, 'sequence', 0).play();

        var pulse = new TimelineMax();
        pulse.add([
          TweenMax.to($(selector), .1, {backgroundColor: '#f8c5c5', ease: Expo.easeOut}),
          TweenMax.to($(selector), .1, {backgroundColor: '#FFE4DB', ease: Expo.easeOut}),
          TweenMax.to($(selector), .1, {backgroundColor: '#f8c5c5', ease: Expo.easeOut}),
          TweenMax.to($(selector), .1, {backgroundColor: '#FFE4DB', ease: Expo.easeOut}),
          TweenMax.to($(selector), .1, {backgroundColor: '#f8c5c5', ease: Expo.easeOut}),
          TweenMax.to($(selector), .1, {backgroundColor: '#FFE4DB', ease: Expo.easeOut})
        ], 0, 'sequence', 0).play();
      }
    });
  }

  function errorForm() {
    TweenMax.fromTo($('.confirmation-container'), 2, {autoAlpha: 0}, {autoAlpha: 1, delay: timelineOut.duration() - .2});
  }

  function handleResize() {
    $('.section').css( {
      'width': $(window).width(),
      'min-height': $(window).height()
    });

    $('.section-rsvp').css({
      'min-height': isFormSubmit ? 470 : $(window).height()
    });

    $('.section-registry').css({
      'min-height': 450
    });

    $('.section-header-bg').css({
      'width': $(window).width(),
      'height': $(window).height()
    });

    $('.left-confetti, .right-confetti').css({
      'height': $(window).height()
    });

    $('.rsvp-bg-tl, .rsvp-bg-tr').css({
      'height': 324 * ($(window).width() / $('.rsvp-bg-tl').width())
    });
  }
}());
