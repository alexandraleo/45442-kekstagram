'use strict';

var galleryWindow = document.querySelector('.gallery-overlay');
var gallery = document.querySelector('.pictures');
var galleryTemplate = document.querySelector('#picture-template').content;
var fragment = document.createDocumentFragment();
var photosCount = 25;

var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var textComments = function () {
  var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  var commentsQuantity = getRandomNumber(1, 2);
  var complexComment = [];
  var commentsVariants = COMMENTS.slice();

  for (var i = 0; i < commentsQuantity; i++) {
    var commentIndex = getRandomNumber(0, COMMENTS.length - 1);
    complexComment[i] = commentsVariants[commentIndex];
    commentsVariants.splice(commentsVariants.indexOf(complexComment[i]), 1);
  }
  return complexComment;
};

var photosInfo = function () {
  var photos = [];
  for (var i = 0; i < photosCount; i++) {
    var photo = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomNumber(15, 200),
      comments: textComments()
    };
    photos[i] = photo;
  }
  return photos;
};

var photos = photosInfo(photosCount);

var takePhoto = function (photo) {
  var photoNode = galleryTemplate.cloneNode(true);

  photoNode.querySelector('.picture').querySelector('img').src = photo.url;
  photoNode.querySelector('.picture-likes').textContent = photo.likes;
  photoNode.querySelector('.picture-comments').textContent = photo.comments.length;

  return photoNode;
};

var galleryOverlay = function (i) {
  galleryWindow.querySelector('img').src = photos[i].url;
  galleryWindow.querySelector('.likes-count').textContent = photos[i].likes;
  galleryWindow.querySelector('.comments-count').textContent = photos[i].comments.length;
};

var createGallery = function () {
  for (var i = 0; i < photosCount; i++) {
    fragment.appendChild(takePhoto(photos[i]));
  }
  return fragment;
};

createGallery();
galleryOverlay(0);
gallery.appendChild(fragment);
galleryWindow.classList.remove('hidden');
