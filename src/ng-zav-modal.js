'use strict';

angular.module('ngZavModal', []);

angular.module('ngZavModal')
  .provider('zavModalOptions', function () {

    var options = {

      // duration (in seconds) of the entire animation
      speed: 0.5,

      // set to false to disable animation
      animate: true,

      // open animation
      animOpen: function (box, shadow, speed) {
        TweenMax.set(box, { opacity: 0, y: 50 });
        TweenMax.set(shadow, { opacity: 0 });
        return new TimelineMax()
          .to(shadow, speed, { opacity: 1 })
          .to(box, speed, { opacity: 1, y: 0, ease: 'Back.easeOut', delay: -speed });
      },

      // close animation
      animClose: function (box, shadow, speed) {
        return new TimelineMax()
          .to(box, speed, { opacity: 0, y: 50, ease: 'Power1.easeOut' })
          .to(shadow, speed, { opacity: 0, delay: -speed });
      }

    };

    this.$get = function () {
      return {

        /**
         * get/set the animation speedo
         *
         * @param {Number} speed - Optional: the speed to set
         */
        speed: function (speed) {
          if (speed) { options.speed = speed; }
          return options.speed;
        },

        /**
         * get/set the animated state
         *
         * @param {Boolean} animate - Optional: the animate state
         */
        animate: function (animate) {
          if (typeof animate !== 'undefined') { options.animate = animate; }
          return options.animate;
        },

        /**
         * set or execute the open animation
         *
         * @param {element|Function} box - The box element, or the animation fn
         * @param {element} - The shadow element
         * @param {speed} - The speed of animation
         */
        animOpen: function (box, shadow, speed) {
          /* istanbul ignore if */
          if (typeof box === 'function') {
            options.animOpen = box;
            return true;
          }
          return options.animOpen(box, shadow, speed);
        },

        /**
         * set or execute the close animation
         *
         * @param {element|Function} box - The box element, or the animation fn
         * @param {element} - The shadow element
         * @param {speed} - The speed of animation
         */
        animClose: function (box, shadow, speed) {
          /* istanbul ignore if */
          if (typeof box === 'function') {
            options.animClose = box;
            return true;
          }
          return options.animClose(box, shadow, speed);
        }

      };
    };

  });

angular.module('ngZavModal')
  .directive('zavModal', function (zavModalOptions) {
    return {
      restrict: 'E',
      transclude: true,
      scope: { trigger: '=' },
      template: '<div class="zav-modal--shadow"><div class="zav-modal--container"><div class="zav-modal--content" ng-transclude></div></div></div>',
      link: function (scope, element, attrs) {

        var state = {
          hidden: true,
          currentAnim: null,
          noAnim: typeof attrs.noAnim !== 'undefined',
          customSpeed: typeof attrs.speed !== 'undefined' ? attrs.speed : false
        };

        var $element = $(element);
        var $shadow = $element.find('.zav-modal--shadow');
        var $container = $element.find('.zav-modal--container');
        var $content = $element.find('.zav-modal--content');

        element[0].style.display = 'none';
        element[0].style.visibility = 'hidden';

        scope.$watch('trigger', function (val) {
          [showModal, hideModal][val ? 0 : 1]();
        });

        $shadow.on('click', function (e) {
          var $e = $(e.target);
          if ($e.is($content) || $content.has($e).length) { return; }
          scope.trigger = false;
          scope.$apply();
        });

        function showModal () {
          state.hidden = false;
          killCurrentAnim();
          element[0].style.display = 'block';
          element[0].style.visibility = 'visible';
          if (zavModalOptions.animate() && !state.noAnim) {
            state.currentAnim = zavModalOptions.animOpen($container, $shadow, getSpeed())
              .addCallback(function () {
                state.currentAnim = null;
              });
          }
        }

        function hideModal () {
          if (state.hidden) { return; }
          state.hidden = true;
          killCurrentAnim();
          if (zavModalOptions.animate() && !state.noAnim) {
            state.currentAnim = zavModalOptions.animClose($container, $shadow, getSpeed())
              .addCallback(function () {
                element[0].style.display = 'none';
                element[0].style.visibility = 'hidden';
                state.currentAnim = null;
              });
          } else {
            element[0].style.display = 'none';
            element[0].style.visibility = 'hidden';
          }
        }

        function killCurrentAnim () {
          if (state.currentAnim) {
            state.currentAnim.kill();
            state.currentAnim = null;
          }
        }

        function getSpeed () {
          return state.customSpeed || zavModalOptions.speed();
        }

      }
    };
  });
