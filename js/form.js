'use strict';

(function () {
  var uploadForm = document.getElementById('upload-select-image');
  var uploadInput = document.getElementById('upload-file');
  var uploadOverlay = uploadForm.querySelector('.upload-overlay');
  var uploadFormClose = uploadOverlay.querySelector('.upload-form-cancel');
  var uploadComment = uploadOverlay.querySelector('.upload-form-description');
  var uploadEffects = uploadOverlay.querySelector('.upload-effect-controls');
  var picturePreview = uploadOverlay.querySelector('.effect-image-preview');

  var onClickOpenForm = function () {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onEscCloseForm);
  };

  var onClickCloseForm = function () {
    onCloseReset();
    setDefaultPreviewSettings();
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onEscCloseForm);
  };

  var onCloseReset = function () {
    picturePreview.className = 'effect-image-preview';
    uploadHashtags.style.borderColor = 'transparent';
    uploadComment.style.borderColor = 'transparent';
  };

  var onEscCloseForm = function (evt) {
    window.util.isEscEvent(evt, (function () {
      uploadFormClose.click();
    }));
  };

  uploadInput.addEventListener('change', onClickOpenForm);
  uploadFormClose.addEventListener('click', onClickCloseForm);
  uploadComment.addEventListener('focus', function () {
    document.removeEventListener('keydown', onEscCloseForm);
  });
  uploadComment.addEventListener('blur', function () {
    document.addEventListener('keydown', onEscCloseForm);
  });

  // Эффекты

  var effectsLevel = uploadOverlay.querySelector('.upload-effect-level');
  var levelEffectInputValue = effectsLevel.querySelector('.upload-effect-level-value');
  var levelEffectHandler = effectsLevel.querySelector('.upload-effect-level-pin');
  var levelEffectValue = effectsLevel.querySelector('.upload-effect-level-val');
  var newClass;

  var applyFilter = function (newFilter) {
    newClass = 'effect-' + newFilter;
    setDefaultPreviewSettings();
    if (newFilter !== 'none') {
      picturePreview.classList.add(newClass);
      setFilterSettings(levelEffectInputValue.value);
      effectsLevel.classList.remove('hidden');
      adjustScale(document.querySelector('.upload-resize-controls-value').value);
    }
    if (newFilter === 'none') {
      effectsLevel.classList.add('hidden');
    }
  };

  var setFilterSettings = function (filterLevel) {
    switch (newClass) {
      case 'effect-chrome':
        picturePreview.style = 'filter: grayscale(' + filterLevel / 100 + ');';
        break;
      case 'effect-sepia':
        picturePreview.style = 'filter: sepia(' + filterLevel / 100 + ');';
        break;
      case 'effect-marvin':
        picturePreview.style = 'filter: invert(' + filterLevel + '%);';
        break;
      case 'effect-phobos':
        picturePreview.style = 'filter: blur(' + Math.floor(filterLevel / 100 * 3) + 'px);';
        break;
      case 'effect-heat':
        picturePreview.style = 'filter: brightness(' + filterLevel / 100 * 3 + ');';
        break;
    }
  };

  var setDefaultPreviewSettings = function () {
    picturePreview.className = 'effect-image-preview';
    picturePreview.style.transform = 'scale(1)';
    document.querySelector('.upload-resize-controls-value').value = '100%';
    levelEffectValue.style.width = '20%';
    levelEffectHandler.style.left = '20%';
    levelEffectInputValue.value = 20;
    picturePreview.style.filter = '';
  };

  var onMouseDownCoords = function (evt) {
    evt.preventDefault();

    var startCoordinates = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoordinates.x - moveEvt.clientX
      };

      startCoordinates = {
        x: moveEvt.clientX
      };
      var newCoords = levelEffectHandler.offsetLeft - shift.x;
      var effectPercent;

      if (newCoords < 0) {
        newCoords = 0;
        effectPercent = 0;
      } else if (newCoords > levelEffectHandler.parentNode.offsetWidth) {
        newCoords = levelEffectHandler.parentNode.offsetWidth;
        effectPercent = 100;
      } else {
        effectPercent = Math.floor(newCoords / levelEffectHandler.parentNode.offsetWidth * 100);
      }
      levelEffectHandler.style.left = newCoords + 'px';
      levelEffectValue.style.width = newCoords + 'px';
      levelEffectInputValue.value = effectPercent;
      setFilterSettings(effectPercent);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  effectsLevel.classList.add('hidden');
  window.initializeFilters(uploadEffects, applyFilter);
  levelEffectInputValue.classList.add('hidden');
  levelEffectHandler.addEventListener('mousedown', onMouseDownCoords);

  // Ресайз
  var resizeControls = document.querySelector('.upload-resize-controls');

  var adjustScale = function (scale) {
    picturePreview.style.transform = 'scale(' + scale / 100 + ')';
  };

  window.initializeScale(resizeControls, adjustScale);

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

  // Отправка на сервер
  var onSuccessSubmit = function () {
    uploadOverlay.classList.add('hidden');
    onClickCloseForm();
  };
  uploadForm.addEventListener('submit', function (evt) {
    window.backend.uploadData(new FormData(uploadForm), onSuccessSubmit(), window.backend.onError);
    evt.preventDefault();
  });
})();
