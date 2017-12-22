'use strict';

(function () {
  window.initializeScale = function (scaleElement, adjustScale) {
    var resizeStep = 25;
    var resizeMin = 25;
    var resizeMax = 100;

    var uploadResize = document.querySelector('.upload-resize-controls');
    var resizeDecButton = uploadResize.querySelector('.upload-resize-controls-button-dec');
    var resizeIncButton = uploadResize.querySelector('.upload-resize-controls-button-inc');
    var resizeInput = uploadResize.querySelector('.upload-resize-controls-value');

    var resizePicture = function (changeSign) {
      var initialValue = +resizeInput.value.slice(0, -1);
      var finishValue;

      if (changeSign === -1 && (initialValue === resizeMin || initialValue - resizeStep < resizeMin)) {
        finishValue = resizeMin;
      } else if (changeSign === 1 && (initialValue === resizeMax || initialValue + resizeStep > resizeMax)) {
        finishValue = resizeMax;
      } else {
        finishValue = initialValue + resizeStep * changeSign;
      }
      resizeInput.value = finishValue + '%';
      adjustScale(finishValue);
    };

    resizeDecButton.addEventListener('click', function () {
      resizePicture(-1);
    });
    resizeIncButton.addEventListener('click', function () {
      resizePicture(+1);
    });
  };
})();
