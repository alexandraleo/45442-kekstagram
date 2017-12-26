'use strict';

(function () {
  window.initializeScale = function (scaleElement, adjustScale) {
    var resizeStep = 25;
    var resizeMin = 25;
    var resizeMax = 100;

    var resizeControlsNode = document.querySelector('.upload-resize-controls');
    var decButtonNode = resizeControlsNode.querySelector('.upload-resize-controls-button-dec');
    var incButtonNode = resizeControlsNode.querySelector('.upload-resize-controls-button-inc');
    var resizeInputNode = resizeControlsNode.querySelector('.upload-resize-controls-value');

    var resizePicture = function (changeSign) {
      var initialValue = +resizeInputNode.value.slice(0, -1);
      var finishValue;

      if (changeSign === -1 && (initialValue === resizeMin || initialValue - resizeStep < resizeMin)) {
        finishValue = resizeMin;
      } else if (changeSign === 1 && (initialValue === resizeMax || initialValue + resizeStep > resizeMax)) {
        finishValue = resizeMax;
      } else {
        finishValue = initialValue + resizeStep * changeSign;
      }
      resizeInputNode.value = finishValue + '%';
      adjustScale(finishValue);
    };

    decButtonNode.addEventListener('click', function () {
      resizePicture(-1);
    });
    incButtonNode.addEventListener('click', function () {
      resizePicture(+1);
    });
  };
})();
