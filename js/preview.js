'use strict';
(function () {
  var gallery = document.querySelector('.pictures');
  var galleryWindow = document.querySelector('.gallery-overlay');
  var galleryChildren = gallery.children;
  var pictures = document.querySelectorAll('.picture');
  var pictureCloseIcon = document.querySelector('.gallery-overlay-close');

  var galleryOverlay = function (photo) {
    galleryWindow.querySelector('img').src = photo.url;
    galleryWindow.querySelector('.likes-count').textContent = photo.likes;
    galleryWindow.querySelector('.comments-count').textContent = photo.comments.length;
  };

  var onWindowEscPress = function (evt) {
    window.util.isEscEvent(evt, closePicture);
  };

  var openPicture = function (evt) {
    evt.preventDefault();
    galleryWindow.classList.remove('hidden');
    document.addEventListener('keydown', onWindowEscPress);
    // galleryOverlay(window.gallery.photo[getChildIndex(evt)]);
    galleryOverlay(window.data.photosInfo.photos[getChildIndex(evt)]);
  };

  var getChildIndex = function (evt) {
    var clickedPhoto = evt.currentTarget;

    for (var i = 0; i < galleryChildren.length; i++) {
      if (galleryChildren[i] === clickedPhoto) {
        break;
      }
    }
    return i;
  };

  var closePicture = function () {
    galleryWindow.classList.add('hidden');
  };

  var onEnterPressClose = function (evt) {
    window.util.isEnterEvent(evt, closePicture);
  };

  for (var i = 0; i < pictures.length; i++) {
    var picture = pictures[i];
    picture.addEventListener('click', openPicture);
  }

  pictureCloseIcon.addEventListener('click', closePicture);
  pictureCloseIcon.addEventListener('keydown', onEnterPressClose);
})();
