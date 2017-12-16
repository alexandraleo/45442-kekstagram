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

// Формы кадрирования и отправки

var uploadForm = document.getElementById('upload-select-image');
var uploadInput = document.getElementById('upload-file');
var uploadOverlay = uploadForm.querySelector('.upload-overlay');
var uploadFormClose = uploadOverlay.querySelector('.upload-form-cancel');
var uploadComment = uploadOverlay.querySelector('.upload-form-description');
var uploadEffects = uploadOverlay.querySelector('.upload-effect-controls');
var picturePreview = uploadOverlay.querySelector('.effect-image-preview');
var uploadResize = uploadOverlay.querySelector('.upload-resize-controls');
var resizeDecButton = uploadResize.querySelector('.upload-resize-controls-button-dec');
var resizeIncButton = uploadResize.querySelector('.upload-resize-controls-button-inc');
var resizeInput = uploadResize.querySelector('.upload-resize-controls-value');

var onClickOpenForm = function () {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onEscCloseForm);
};

var onClickCloseForm = function () {
  onCloseReset();
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onEscCloseForm);
};

var onCloseReset = function () {
  picturePreview.className = 'effect-image-preview';
  uploadHashtags.style.borderColor = 'transparent';
  uploadComment.style.borderColor = 'transparent';
  picturePreview.style = 'transform: scale(1);';
  resizeInput.value = '100%';
};

var onEscCloseForm = function (evt) {
  if (evt.keyCode === ESC_KEY) {
    uploadFormClose.click();
  }
};

var effectName = function (nameToChange) {
  var newClassName = nameToChange.replace('upload-', '');
  picturePreview.classList.add(newClassName);
};

var onClickEffect = function (event) {
  var target = event.target;
  var newClass;
  picturePreview.className = 'effect-image-preview';
  while (target !== uploadEffects) {
    if (target.type === 'radio') {
      newClass = target.id;
      effectName(newClass);
      return;
    }
    target = target.parentNode;
  }
};

uploadInput.addEventListener('change', onClickOpenForm);
uploadFormClose.addEventListener('click', onClickCloseForm);
uploadComment.addEventListener('focus', function () {
  document.removeEventListener('keydown', onEscCloseForm);
});
uploadComment.addEventListener('blur', function () {
  document.addEventListener('keydown', onEscCloseForm);
});

uploadEffects.addEventListener('click', onClickEffect);

// Ресайз
var resizeStep = 25;
var resizeMin = 25;
var resizeMax = 100;

var resizePicture = function (changeSign) {
  var initialValue = +resizeInput.value.slice(0, -1);
  var finishValue;

  if (changeSign === -1 && (initialValue === resizeMin || initialValue - resizeStep < resizeMin)) {
    finishValue = resizeMin;
  } else if (changeSign === 1 && (initialValue === resizeMax || initialValue + resizeStep > resizeMax)) {
    finishValue = resizeMax;
  } else {
    finishValue = initialValue + resizeStep * changeSign;
  }
  resizeInput.value = finishValue + '%';
  picturePreview.style = 'transform: scale(' + finishValue / 100 + ');';
};

resizeDecButton.addEventListener('click', function () {
  resizePicture(-1);
});
resizeIncButton.addEventListener('click', function () {
  resizePicture(+1);
});

// Хэштеги

var MAX_COMMENT_LENGTH = 140;
var MAX_HASHTAGS = 5;
var MAX_HASHTAG_LENGTH = 20;

var uploadHashtags = uploadOverlay.querySelector('.upload-form-hashtags');

var addBorder = function (input) {
  input.style.borderColor = 'red';
};

var removeBorder = function (input) {
  input.style.borderColor = 'transparent';
};

var hashtagsValidityCheck = function () {
  var hashtags = uploadHashtags.value.trim().toLowerCase().split(' ');
  if (uploadHashtags.value.length === 0) {
    uploadHashtags.setCustomValidity('');
    removeBorder(uploadHashtags);
    return true;
  }
  for (i = 0; i < hashtags.length; i++) {
    if (hashtags[i].length > MAX_HASHTAG_LENGTH) {
      uploadHashtags.setCustomValidity('Максимум 5 хэштэгов по 20 символов');
      addBorder(uploadHashtags);
      return false;
    }
    if (hashtags[i][0] !== '#') {
      uploadHashtags.setCustomValidity('Каждый хэштег должен начинаться с #');
      addBorder(uploadHashtags);
      return false;
    }
    if (hashtags.indexOf(hashtags[i]) !== i) {
      uploadHashtags.setCustomValidity('Хэштеги не должны повторяться');
      addBorder(uploadHashtags);
      return false;
    }
  }
  if (hashtags.length > MAX_HASHTAGS) {
    uploadHashtags.setCustomValidity('Максимум 5 хэштэгов по 20 символов');
    addBorder(uploadHashtags);
    return false;
  }
  uploadHashtags.setCustomValidity('');
  removeBorder(uploadHashtags);
  return true;
};

var commentValidityCheck = function () {
  if (uploadComment.value.length > MAX_COMMENT_LENGTH) {
    uploadComment.setCustomValidity('Комментарий не должен содержать больше 140 символов. Сейчас символов: ' + uploadComment.value.length);
    addBorder(uploadComment);
  } else {
    uploadComment.setCustomValidity('');
    removeBorder(uploadComment);
  }
};

uploadComment.addEventListener('input', commentValidityCheck);
uploadHashtags.addEventListener('input', hashtagsValidityCheck);

