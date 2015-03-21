/* jshint devel:true */
'use strict';

(function() {
  var data = {};
  var isFormSubmit = false;
  var yOffset = 0;
  var controller = new ScrollMagic.Controller();

  function handleResize() {
    $('.section').css( {
      'width': $(window).width(),
      'min-height': $(window).height()
    });

    $('.section-rsvp').css({
      'min-height': isFormSubmit ? 470 : $(window).height()
    });

    $('.section-registry').css({
      'min-height': $(window).width() > 736 ? 600 : 460
    });

    $('.section-header-bg').css({
      'width': $(window).width(),
      'height': $(window).height()
    });

    $('.registry-bg').css({
      'width': $(window).width()
    });

    $('.left-confetti, .right-confetti').css({
      'height': $(window).height()
    });

    $('.rsvp-bg-tl, .rsvp-bg-tr').css({
      'height': 324 * ($(window).width() / $('.rsvp-bg-tl').width())
    });
  }

  $(window).resize(handleResize);
  $(window).trigger('resize');

    new ScrollMagic.Scene({
    triggerElement: '#header-trigger',
      triggerHook: 'onLeave',
      duration: $('.section-header').height()
    })
    .setTween(TweenMax.to('.hero-header', 1, {y: '40%', ease: Linear.easeNone}))
    .addTo(controller);

    // Stars
    new ScrollMagic.Scene({
    triggerElement: '#header-trigger',
      triggerHook: 'onLeave',
      duration: $('.section-header').height()
    })
    .setTween(TweenMax.to('.stars', 1, {y: '-7', ease: Linear.easeNone}))
    .addTo(controller);

    // Circles
    new ScrollMagic.Scene({
    triggerElement: '#header-trigger',
      triggerHook: 'onLeave',
      duration: $('.section-header').height()
    })
    .setTween(TweenMax.to('.circles', 1, {y: '-15', ease: Linear.easeNone}))
    .addTo(controller);

    // Dots
    new ScrollMagic.Scene({
    triggerElement: '#header-trigger',
      triggerHook: 'onLeave',
      duration: $('.section-header').height()
    })
    .setTween(TweenMax.to('.dots', 1, {y: '-20', ease: Linear.easeNone}))
    .addTo(controller);

    // bg
    new ScrollMagic.Scene({
    triggerElement: '#header-trigger',
      triggerHook: 'onLeave',
      duration: $('.section-header').height()
    })
    .setTween(TweenMax.to('.section-header-bg', 1, {y: '200', ease: Linear.easeNone}))
    .addTo(controller);

    // confetti-left
    new ScrollMagic.Scene({
    triggerElement: '.section-header',
      triggerHook: 'onLeave',
      duration: $(document).height()
    })
    .setTween(TweenMax.fromTo('.left-confetti', 1, {y: '-20%' }, {y: '40%', ease: Linear.easeNone}))
    .addTo(controller);

    // confetti-right
    new ScrollMagic.Scene({
    triggerElement: '.section-header',
      triggerHook: 'onLeave',
      duration: $(document).height()
    })
    .setTween(TweenMax.fromTo('.right-confetti', 1, {y: '-20%' }, {y: '40%', ease: Linear.easeNone}))
    .addTo(controller);

    // nav-header
    // new ScrollMagic.Scene({
    // triggerElement: '.section-wedding',
    //   triggerHook: 'onLeave',
    //   duration: $(document).height() - $('.section-header').height()
    // })
    // .setPin('.nav-header')
    // .addTo(controller);

    new Waypoint.Sticky({
      element: $('.nav-header')[0],
      offset: 0
    });

    // new ScrollMagic.Scene({
    // triggerElement: '.section-rsvp',
    //   triggerHook: 'onEnter',
    //   duration: 20
    // })
    // .setTween(TweenMax.fromTo('.rsvp-bg-tl', 1, {y: 0 }, {y: -100 }))
    // .addTo(controller);

    // // rsvp-tr
    // new ScrollMagic.Scene({
    // triggerElement: '.section-rsvp',
    //   triggerHook: 'onEnter',
    //   duration: $('.section-rsvp').height()
    // })
    // .setTween(TweenMax.fromTo('.rsvp-bg-tr', 1, {y: 0 }, {y: -100 }))
    // .addTo(controller);

    // // rsvp-bl
    // new ScrollMagic.Scene({
    // triggerElement: '.section-rsvp',
    //   triggerHook: 'onEnter',
    //   duration: $('.section-rsvp').height()
    // })
    // .setTween(TweenMax.fromTo('.rsvp-bg-bl', 1, {y: 200 }, {y: 0 }))
    // .addTo(controller);

    // // rsvp-br
    // new ScrollMagic.Scene({
    // triggerElement: '.section-rsvp',
    //   triggerHook: 'onEnter',
    //   duration: $('.section-rsvp').height()
    // })
    // .setTween(TweenMax.fromTo('.rsvp-bg-br', 1, {y: 200 }, {y: 0 }))
    // .addTo(controller);

    // // rsvp-bm
    // new ScrollMagic.Scene({
    // triggerElement: '.section-rsvp',
    //   triggerHook: 'onEnter',
    //   duration: $('.section-rsvp').height()
    // })
    // .setTween(TweenMax.fromTo('.rsvp-bg-bm', 1, {y: 200 }, {y: 0 }))
    // .addTo(controller);

  // }

  controller.scrollTo(function (newpos) {
    TweenMax.to(window, 1, {scrollTo: {y: newpos}, ease: Expo.easeOut});
  });

  //  bind scroll to anchor links
  $(document).on('click', 'a[href^=#]', function (e) {
    var id = $(this).attr('href');
    if ($(id).length > 0) {
      e.preventDefault();

      if(id === '#registry') {
        yOffset = $(document).height() - $('.section-registry').offset().top;
      } else {
        yOffset = 0;
      }
      // trigger scroll
      controller.scrollTo(id);

        // if supported by the browser we can even update the URL.
      if (window.history && window.history.pushState) {
        history.pushState('', document.title, id);
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
    if(validateForm() === false) {
      return;
    }

    $('.send-text').hide();
    $('.sending-text').show();
    
    isFormSubmit = true;

    data = {
      name: $('#rsvp_name').val(),
      email: $('#rsvp_email').val(),
      attending: $('#rsvp_attending').val(),
      party: $('#rsvp_party').val(),
      message: $('#rsvp_message').val(),
    };

    console.log(data);

    var timeline = new TimelineMax({
      onComplete: sendForm
    });

    var tt = 1.2;
    timeline.add([
      TweenMax.to($('.rsvp-copy'), tt, {autoAlpha: 0}),
      TweenMax.to($('.form-name'), tt, {x: '+=100px', autoAlpha: 0, ease: Elastic.easeInOut, easeParams:[1.2, 0.7]}),
      TweenMax.to($('.form-email'), tt, {x: '+=100px', autoAlpha: 0, ease: Elastic.easeInOut, easeParams:[1.2, 0.7]}),
      TweenMax.to($('.form-attending'), tt, {x: '+=100px', autoAlpha: 0, ease: Elastic.easeInOut, easeParams:[1.2, 0.7]}),
      TweenMax.to($('.form-party'), tt, {x: '+=100px', autoAlpha: 0, ease: Elastic.easeInOut, easeParams:[1.2, 0.7]}),
      TweenMax.to($('.form-message'), tt, {x: '+=100px', autoAlpha: 0, ease: Elastic.easeInOut, easeParams:[1.2, 0.7]}),
      TweenMax.to($('.required-copy'), tt, {x: '+=100px', autoAlpha: 0, ease: Elastic.easeInOut, easeParams:[1.2, 0.7]}),
      TweenMax.to($('.sending-miimii'), 1, {autoAlpha: 1, ease: Expo.easeInOut, delay: 0.35}),
      TweenMax.to($('.btn'), 1, {y: -$('.rsvp-container').height() + $('.sending-miimii').height() - 20, backgroundColor: 'rgba(46, 58, 118, 0)', outline: 'none', ease: Expo.easeInOut, delay: 0.3}),
      TweenMax.to($(window), 1, {scrollTo: {y: $('.section-rsvp').offset().top }, ease: Expo.easeOut, delay: 0.5}),
      TweenMax.to($('.section-rsvp'), 1, {css: {'height': 470, 'min-height': 470}, ease: Expo.easeOut, delay: 0.5})
    ], 0, 'sequence', -tt + 0.05).play();
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
        },
        406: function() {
          hideForm(404);
        }
      }
    });

  }

  function hideForm(statusCode) {
    var ttOut = 0.3;
    // var timelineOut = new TimelineMax({
    //   onComplete: function() {
    //     $('.form-group').css({
    //       'display': 'none'
    //     });

    //     bg.style.height = ch;
    //     decoration.style.height = ch;
    //   }
    // });

    $('input').blur();
    TweenMax.to($('.btn'), ttOut, {autoAlpha: 0});

    switch(statusCode) {
      case 200:
      case 0:
        TweenMax.fromTo($('.confirmation-container'), ttOut + 0.7, {autoAlpha: 0, y: '+= 12', x: '-50%'}, {autoAlpha: 1, y: 0, x: '-50%', delay: ttOut - 0.2, ease: Expo.easeOut});
        break;
      case 404:
      case 406:
        TweenMax.fromTo($('.submit-error-container'), ttOut + 0.7, {autoAlpha: 0, y: '+= 12', x: '-50%'}, {autoAlpha: 1, y: 0, x: '-50%', delay: ttOut - 0.2, ease: Expo.easeOut});
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
    } else if($('.form-attending-select').val() === 'na') {
      error('.form-attending-select');
      return false;
    }
  }

  function error(selector) {
    TweenMax.to(window, 0.2, {
      scrollTo: $(selector).offset().top - ($(window).width() > 736 ? 50 : 100),
      ease: Expo.easeOut,
      onComplete: function() {
        var timeline = new TimelineMax();
        timeline.add([
          TweenMax.to($(selector), 0.1, {x: 5, ease: Expo.easeOut}),
          TweenMax.to($(selector), 0.1, {x: -5, ease: Expo.easeOut}),
          TweenMax.to($(selector), 0.1, {x: 5, ease: Expo.easeOut}),
          TweenMax.to($(selector), 0.1, {x: -5, ease: Expo.easeOut}),
          TweenMax.to($(selector), 0.1, {x: 0, ease: Expo.easeOut}),
          TweenMax.to($(selector), 0.1, {x: -5, ease: Expo.easeOut}),
          TweenMax.to($(selector), 0.1, {x: 0, ease: Expo.easeOut})
        ], 0, 'sequence', 0).play();

        var pulse = new TimelineMax();
        pulse.add([
          TweenMax.to($(selector), 0.1, {backgroundColor: '#f8c5c5', ease: Expo.easeOut}),
          TweenMax.to($(selector), 0.1, {backgroundColor: '#FFE4DB', ease: Expo.easeOut}),
          TweenMax.to($(selector), 0.1, {backgroundColor: '#f8c5c5', ease: Expo.easeOut}),
          TweenMax.to($(selector), 0.1, {backgroundColor: '#FFE4DB', ease: Expo.easeOut}),
          TweenMax.to($(selector), 0.1, {backgroundColor: '#f8c5c5', ease: Expo.easeOut}),
          TweenMax.to($(selector), 0.1, {backgroundColor: '#FFE4DB', ease: Expo.easeOut})
        ], 0, 'sequence', 0).play();
      }
    });
  }

  // function errorForm() {
  //   TweenMax.fromTo($('.confirmation-container'), 2, {autoAlpha: 0}, {autoAlpha: 1, delay: timelineOut.duration() - 0.2});
  // }

  
}());
