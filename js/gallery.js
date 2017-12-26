'use strict';

(function () {
  var galleryNode = document.querySelector('.pictures');
  var filtersNode = document.querySelector('.filters');
  var fragment = document.createDocumentFragment();
  var initialPhotos;

  var onLoad = function (userPhotos) {
    window.gallery.photos = userPhotos;
    initialPhotos = userPhotos.concat();
    renderPhotos();
    filtersNode.classList.remove('filters-inactive');
  };

  filtersNode.addEventListener('click', function (evt) {
    var target = evt.target;

    while (target !== filtersNode) {
      if (target.name === 'filter') {
        window.debounce(changeFilter(target.value));
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
    galleryNode.innerHTML = '';
    window.gallery.photos.forEach(function (photo) {
      fragment.appendChild(window.picture.takePhoto(photo));
    });
    galleryNode.appendChild(fragment);
  };

  window.gallery = {
    photos: [],
  };

  window.backend.downloadData(onLoad, window.backend.onError);
})();
