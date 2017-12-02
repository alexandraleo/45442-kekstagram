'use strict';

var galleryWindow = document.querySelector('.gallery-overlay');
galleryWindow.classList.remove('hidden');
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

var commentsQuantity = getRandomNumber(1, 2);

var textComments = function () {
  var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var copy = COMMENTS;
  if (commentsQuantity === 1) {
    return COMMENTS[getRandom(COMMENTS)];
  } else {
    var complexComment = [];
    for (i = 0; i < commentsQuantity; i++) {
      var part = copy[getRandomNumber(0, copy.length - 1)];
      complexComment.push(part);
      copy.splice(copy.indexOf(part), 1);
    }
    return complexComment.join(' ');
  }
};

var Description = function (i) {
  this.url = 'photos/' + i + '.jpg';
  this.likes = getRandomNumber(15, 200);
  this.comments = commentsQuantity;
};

var rateImage = function (description) {
  var imageNode = galleryTemplate.cloneNode(true);

  imageNode.querySelector('.picture').querySelector('img').src = description.url;
  imageNode.querySelector('.picture-likes').textContent = description.likes;
  imageNode.querySelector('.picture-comments').textContent = description.comments;

  return imageNode;
};

textComments();

for (var i = 1; i <= picturesCount; i++) {
  var description = new Description(i);
  fragment.appendChild(rateImage(description));
}

gallery.appendChild(fragment);
galleryWindow.querySelector('.gallery-overlay-image').src = description.url;
galleryWindow.querySelector('.likes-count').textContent = description.likes;
galleryWindow.querySelector('.comments-count').textContent = description.comments;
