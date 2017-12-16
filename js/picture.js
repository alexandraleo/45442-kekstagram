'use strict';

(function () {
  var galleryTemplate = document.querySelector('#picture-template').content;

  window.picture = {
    takePhoto: function (photo) {
      var photoNode = galleryTemplate.cloneNode(true);

      photoNode.querySelector('.picture').querySelector('img').src = photo.url;
      photoNode.querySelector('.picture-likes').textContent = photo.likes;
      photoNode.querySelector('.picture-comments').textContent = photo.comments.length;

      return photoNode;
    }};
})();
