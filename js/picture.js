'use strict';

var galleryWindow = document.querySelector('.gallery-overlay');
var gallery = document.querySelector('.pictures');
var galleryTemplate = document.querySelector('#picture-template').content;
var fragment = document.createDocumentFragment();
var picturesCount = 25;

var getRandom = function (array) {
  return Math.floor(Math.random() * array.length);
};

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

var Photo = function (i) {
  this.url = 'photos/' + i + '.jpg';
  this.likes = getRandomNumber(15, 200);
  this.comments = textComments();
};

var takePhoto = function (photo) {
  var photoNode = galleryTemplate.cloneNode(true);

  photoNode.querySelector('.picture').querySelector('img').src = photo.url;
  photoNode.querySelector('.picture-likes').textContent = photo.likes;
  photoNode.querySelector('.picture-comments').textContent = photo.comments.length;

  return photoNode;
};


for (var i = 1; i <= picturesCount; i++) {
  var photo = new Photo(i);
  fragment.appendChild(takePhoto(photo));
}

galleryWindow.querySelector('img').src = photo.url;
galleryWindow.querySelector('.likes-count').textContent = photo.likes;
galleryWindow.querySelector('.comments-count').textContent = photo.comments.length;
galleryWindow.classList.remove('hidden');
gallery.appendChild(fragment);
