'use strict';

(function () {
  var gallery = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  window.gallery = {
    photos: window.data.photosInfo(window.data.photosCount),
    createGallery: function () {
      for (var i = 0; i < window.data.photosCount; i++) {
        fragment.appendChild(window.picture.takePhoto(this.photos[i]));
      }
      return fragment;
    }
  };

  window.gallery.createGallery();
  gallery.appendChild(fragment);
})();
