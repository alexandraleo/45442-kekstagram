'use strict';

(function () {
  window.initializeFilters = {
    setFilterSettings: function (newClass, filterElement, filterLevel) {
      switch (newClass) {
        case 'upload-effect-chrome':
          filterElement.style = 'filter: grayscale(' + filterLevel / 100 + ');';
          break;
        case 'upload-effect-sepia':
          filterElement.style = 'filter: sepia(' + filterLevel / 100 + ');';
          break;
        case 'upload-effect-marvin':
          filterElement.style = 'filter: invert(' + filterLevel + '%);';
          break;
        case 'upload-effect-phobos':
          filterElement.style = 'filter: blur(' + Math.floor(filterLevel / 100 * 3) + 'px);';
          break;
        case 'upload-effect-heat':
          filterElement.style = 'filter: brightness(' + filterLevel / 100 * 3 + ');';
          break;
      }
    },
    setEffect: function (filterElement, nameToChange) {
      var newClassName = nameToChange.replace('upload-', '');
      filterElement.classList.add(newClassName);
    }
  };
})();
