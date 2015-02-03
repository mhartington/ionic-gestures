angular.module('ionicApp', ['ionic'])
  .controller('MyCtrl', function($scope) {
    console.clear();
  })
  .directive('ionPinch', function($timeout) {
    return {
      restrict: 'A',
      link: function($scope, $element) {

        $timeout(function() {
          var square = $element[0],
            posX = 0,
            posY = 0,
            lastPosX = 0,
            lastPosY = 0,
            bufferX = 0,
            bufferY = 0,
            scale = 1,
            lastScale,
            rotation = 1,
            last_rotation, dragReady = 0;
          ionic.onGesture('touch drag transform dragend', function(e) {
            e.gesture.srcEvent.preventDefault();
            e.gesture.preventDefault();
            switch (e.type) {
              case 'touch':
                last_scale = scale;
                last_rotation = rotation;
                break;
              case 'drag':
                posX = e.gesture.deltaX + lastPosX;
                posY = e.gesture.deltaY + lastPosY;
                break;
              case 'transform':
                rotation = e.gesture.rotation + last_rotation;
                scale = e.gesture.scale * lastScale
                break;
              case 'dragend':
                lastPosX = posX;
                lastPosY = posY;
                lastScale = scale;
                break;
            }
            var transform =
              "translate3d(" + posX + "px," + posY + "px, 0) " +
              "scale(" + scale + ")" +
              "rotate(" + rotation + "deg) ";
            e.target.style.transform = transform;
            e.target.style.webkitTransform = transform;
          }, $element[0]);
        });
      }
    };
  });
