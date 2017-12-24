'use strict';

(function () {
  var gallery = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');
  var fragment = document.createDocumentFragment();
  var initialPhotos;

  var onLoad = function (userPhotos) {
    window.gallery.photos = userPhotos;
    initialPhotos = userPhotos.concat();
    renderPhotos();
    filters.classList.remove('filters-inactive');
  };

  filters.addEventListener('click', function (evt) {
    var target = evt.target;

    while (target !== filters) {
      if (target.name === 'filter') {
        changeFilter(target.value);
        return;
      }
      target = target.parentNode;
    }
  });

  var changeFilter = function (filterName) {
    switch (filterName) {
      case 'popular':
        window.gallery.photos.sort(function (a, b) {
          return b.likes - a.likes;
        });
        break;
      case 'discussed':
        window.gallery.photos.sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });
        break;
      case 'random':
        window.gallery.photos.sort(function () {
          return Math.random() - 0.5;
        });
        break;
      default:
        window.gallery.photos = initialPhotos.concat();
    }
    renderPhotos();
  };

  var renderPhotos = function () {
    gallery.innerHTML = '';
    window.gallery.photos.forEach(function (photo) {
      fragment.appendChild(window.picture.takePhoto(photo));
    });
    gallery.appendChild(fragment);
  };

  window.gallery = {
    photos: [],
  };

  window.backend.downloadData(onLoad, window.backend.onError);
})();
