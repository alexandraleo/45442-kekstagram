'use strict';

(function () {
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
    window.util.isEscEvent(evt, (function () {
      uploadFormClose.click();
    }));
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
    for (var i = 0; i < hashtags.length; i++) {
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
})();