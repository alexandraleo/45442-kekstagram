'use strict';
(function () {
  var gallery = document.querySelector('.pictures');
  var galleryWindow = document.querySelector('.gallery-overlay');
  var pictureCloseIcon = document.querySelector('.gallery-overlay-close');

  var galleryOverlay = function (photo) {
    galleryWindow.querySelector('img').src = photo.url;
    galleryWindow.querySelector('.likes-count').textContent = photo.likes;
    galleryWindow.querySelector('.comments-count').textContent = photo.comments.length;
  };

  var onWindowEscPress = function (evt) {
    if (window.util.isEscEvent(evt)) {
      closePicture();
    }
  };

  var openPicture = function (index) {
    galleryWindow.classList.remove('hidden');
    document.addEventListener('keydown', onWindowEscPress);
    galleryOverlay(window.gallery.photos[index]);
  };

  var getChildIndex = function (node) {
    var parent = node.parentNode;

    for (var i = 0; i < parent.children.length; i++) {
      if (parent.children[i] === node) {
        return i;
      }
    }
    return -1;
  };

  var closePicture = function () {
    galleryWindow.classList.add('hidden');
  };

  var onEnterPressClose = function (evt) {
    if (window.util.isEnterEvent(evt)) {
      closePicture();
    }
  };

  gallery.addEventListener('click', function (evt) {
    evt.preventDefault();
    var target = evt.target;

    while (target !== gallery) {
      if (target.classList.contains('picture')) {
        openPicture(getChildIndex(target));
        return;
      }
      target = target.parentNode;
    }
  });

  pictureCloseIcon.addEventListener('click', closePicture);
  pictureCloseIcon.addEventListener('keydown', onEnterPressClose);
})();
