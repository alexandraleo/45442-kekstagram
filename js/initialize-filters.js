'use strict';

(function () {
  window.initializeFilters = function (filterElement, applyFilter) {
    var uploadEffectsNode = document.querySelector('.upload-effect-controls');

    var currentFilter;
    var onClickEffect = function (evt) {
      var target = evt.target;

      while (target !== uploadEffectsNode) {
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
