'use strict';

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


var createGallery = function () {
  for (var i = 0; i < photosCount; i++) {
    fragment.appendChild(takePhoto(photos[i]));
  }
  return fragment;
};

createGallery();
gallery.appendChild(fragment);

// Показываем большую картинку
var ESC_KEY = 27;
var ENTER_KEY = 13;
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
  if (evt.keyCode === ESC_KEY) {
    closePicture();
  }
};

var openPicture = function (evt) {
  evt.preventDefault();
  galleryWindow.classList.remove('hidden');
  document.addEventListener('keydown', onWindowEscPress);
  galleryOverlay(photos[getChildIndex(event)]);
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
  if (evt.keyCode === ENTER_KEY) {
    closePicture();
  }
};

for (var i = 0; i < pictures.length; i++) {
  var picture = pictures[i];
  picture.addEventListener('click', openPicture);
}

pictureCloseIcon.addEventListener('click', closePicture);
pictureCloseIcon.addEventListener('keydown', onEnterPressClose);
