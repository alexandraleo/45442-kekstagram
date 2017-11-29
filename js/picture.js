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
var Description = function (i) {
  var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  this.url = 'photos/' + i + '.jpg';
  this.likes = getRandomNumber(15, 200);
  this.comments = COMMENTS[getRandom(COMMENTS)];
};

var rateImage = function (description) {
  var imageNode = galleryTemplate.cloneNode(true);

  imageNode.querySelector('.picture').src = description.url;
  imageNode.querySelector('.picture-likes').textContent = description.likes;
  imageNode.querySelector('.picture-comments').textContent = description.comments;

  return imageNode;
//  console.log(imageNode);
};

for (var i = 0; i < picturesCount; i++) {
  var description = new Description(i);
  fragment.appendChild(rateImage(description));
  console.log(description);
}

gallery.appendChild(fragment);
galleryWindow.querySelector('.gallery-overlay-image').src = description.url;
galleryWindow.querySelector('.likes-count').textContent = description.likes;
galleryWindow.querySelector('.comments-count').textContent = description.comment;
// console.dir(gallery);
