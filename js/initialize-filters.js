'use strict';

(function () {
  window.initializeFilters = function (filterElement, applyFilter) {
    var uploadEffects = document.querySelector('.upload-effect-controls');

    var newFilter;
    var onClickEffect = function (evt) {
      var target = evt.target;

      while (target !== uploadEffects) {
        if (target.type === 'radio') {
          newFilter = target.value;
          applyFilter(newFilter);
          target = target.parentNode;
        }
        return;
      }
    };
    filterElement.addEventListener('click', onClickEffect);
  };
})();
