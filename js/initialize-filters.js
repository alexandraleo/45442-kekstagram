'use strict';

(function () {
  window.initializeFilters = function (filterElement, applyFilter) {
    var uploadEffects = document.querySelector('.upload-effect-controls');

    var currentFilter;
    var onClickEffect = function (evt) {
      var target = evt.target;

      while (target !== uploadEffects) {
        if (target.type === 'radio') {
          applyFilter(currentFilter, target.value);
          currentFilter = target.value;
          return;
        }
        target = target.parentNode;
      }
    };

    filterElement.addEventListener('click', onClickEffect);
  };
})();
