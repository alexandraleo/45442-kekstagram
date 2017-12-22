'use strict';

(function () {
  var ESC_KEY = 27;
  var ENTER_KEY = 13;

  window.util = {
    isEscEvent: function (evt) {
      return evt.keyCode === ESC_KEY;
    },
    isEnterEvent: function (evt) {
      return evt.keyCode === ENTER_KEY;
    },
    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    }
  };
})();


