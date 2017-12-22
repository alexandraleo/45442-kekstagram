'use strict';

(function () {
  // var photosCount = 25;
  var textComments = function () {
    var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

    var commentsQuantity = window.util.getRandomNumber(1, 2);
    var complexComment = [];
    var commentsVariants = COMMENTS.slice();

    for (var i = 0; i < commentsQuantity; i++) {
      var commentIndex = window.util.getRandomNumber(0, COMMENTS.length - 1);
      complexComment[i] = commentsVariants[commentIndex];
      commentsVariants.splice(commentsVariants.indexOf(complexComment[i]), 1);
    }
    return complexComment;
  };
  // window.data = {
  //   photosCount: 25,
  //   photosInfo: function () {
  //     var photos = [];
  //     for (var i = 0; i < this.photosCount; i++) {
  //       var photo = {
  //         url: 'photos/' + (i + 1) + '.jpg',
  //         likes: window.util.getRandomNumber(15, 200),
  //         comments: textComments()
  //       };
  //       photos[i] = photo;
  //     }
  //     return photos;
  //   }
  // };
  window.data = {
    photosInfo: function (element) {
      var photos = [];
      for (var i = 0; i < photos.length; i++) {
        var photo = {
          url: element.querySelector('img').getAttribute('src'),
          likes: element.querySelector('.picture-likes').textContent,
          comments: element.querySelector('.picture-comments').textContent
        };
        photos[i] = photo;
      }
      return photos;
    }
  };
})();
