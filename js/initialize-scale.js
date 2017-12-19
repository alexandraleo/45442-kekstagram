'use strict';

(function () {
  window.initializeScale = function (changeSign, resizeInput, scaleElement) {
    var resizeStep = 25;
    var resizeMin = 25;
    var resizeMax = 100;

    var resizePicture = function () {
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
      scaleElement.style = 'transform: scale(' + finishValue / 100 + ');';
    };
    resizePicture();
  };
}
)();
