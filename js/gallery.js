'use strict';

(function () {
  var gallery = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var onLoad = function (userPhotos) {
    window.gallery.downloadPhotos(userPhotos);
  };
  window.gallery = {
    photos: window.data.photosInfo(window.data.photosCount),
    createGallery: function () {
      for (var i = 0; i < window.data.photosCount; i++) {
        fragment.appendChild(window.picture.takePhoto(this.photos[i]));
      }
      return fragment;
    },
    downloadPhotos: function (photos) {
      for (var i = 0; i < photos.length; i++) {
        var photo = window.picture.takePhoto(photos[i]);
        fragment.appendChild(photo);
      }
      gallery.appendChild(fragment);
    }
  };

  // window.gallery.createGallery();
  window.backend.downloadData(onLoad, window.backend.onError);
  // window.gallery.uploadPhotos(window.backend.downloadData);
  // gallery.appendChild(fragment);
})();
