'use strict';

(function () {
  var DEFAULT_FILTER = 'none';
  var DEFAULT_SIZE = 100;
  var MAX_COMMENT_LENGTH = 140;
  var MAX_HASHTAGS = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var DEFAULT_FILTER_VALUE = 20;

  var uploadForm = document.getElementById('upload-select-image');
  var uploadInput = document.getElementById('upload-file');
  var uploadOverlay = uploadForm.querySelector('.upload-overlay');
  var uploadFormClose = uploadOverlay.querySelector('.upload-form-cancel');
  var uploadComment = uploadOverlay.querySelector('.upload-form-description');
  var uploadEffects = uploadOverlay.querySelector('.upload-effect-controls');
  var picturePreview = uploadOverlay.querySelector('.effect-image-preview');
  var effectsLevel = uploadOverlay.querySelector('.upload-effect-level');
  var levelEffectInputValue = effectsLevel.querySelector('.upload-effect-level-value');
  var levelEffectHandler = effectsLevel.querySelector('.upload-effect-level-pin');
  var levelEffectValue = effectsLevel.querySelector('.upload-effect-level-val');
  var resizeControls = document.querySelector('.upload-resize-controls');
  var uploadHashtags = uploadOverlay.querySelector('.upload-form-hashtags');

  var onClickOpenForm = function () {
    setDefaultFilter();
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onEscCloseForm);
  };

  var onClickCloseForm = function () {
    uploadForm.reset();
    onCloseReset();
    adjustScale(DEFAULT_SIZE);
    setDefaultFilter();
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onEscCloseForm);
  };

  var setDefaultFilter = function () {
    applyFilter(DEFAULT_FILTER, DEFAULT_FILTER);
    setEffectHandlerValue(DEFAULT_FILTER_VALUE);
  };

  var onCloseReset = function () {
    picturePreview.className = 'effect-image-preview';
    uploadHashtags.style.borderColor = 'transparent';
    uploadComment.style.borderColor = 'transparent';
  };

  var onEscCloseForm = function (evt) {
    if (window.util.isEscEvent(evt)) {
      uploadFormClose.click();
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

  // Эффекты

  var effectClass;

  var applyFilter = function (oldFilter, newFilter) {
    oldFilter = 'effect-' + oldFilter;
    newFilter = 'effect-' + newFilter;

    picturePreview.classList.remove(oldFilter);
    if (newFilter === 'effect-none') {
      effectsLevel.classList.add('hidden');
    } else {
      picturePreview.classList.add(newFilter);
      effectsLevel.classList.remove('hidden');
    }

    effectClass = newFilter;
    setEffectHandlerValue(20);
  };

  var setFilterSettings = function (filterLevel) {
    var filter = '';

    switch (effectClass) {
      case 'effect-chrome':
        filter = 'grayscale(' + filterLevel / 100 + ')';
        break;
      case 'effect-sepia':
        filter = 'sepia(' + filterLevel / 100 + ')';
        break;
      case 'effect-marvin':
        filter = 'invert(' + filterLevel + '%)';
        break;
      case 'effect-phobos':
        filter = 'blur(' + Math.floor(filterLevel / 100 * 3) + 'px)';
        break;
      case 'effect-heat':
        filter = 'brightness(' + filterLevel / 100 * 3 + ')';
        break;
    }

    picturePreview.style.filter = filter;
  };

  var setEffectHandlerValue = function (percent) {
    var parentWidth = levelEffectHandler.parentNode.offsetWidth;
    var leftOffset = percent * parentWidth / 100;
    levelEffectHandler.style.left = leftOffset + 'px';
    levelEffectValue.style.width = leftOffset + 'px';
    levelEffectInputValue.value = percent;
    setFilterSettings(percent);
  };

  var onMouseDownCoords = function (evt) {
    evt.preventDefault();

    var currentPointX = evt.clientX;
    var parentWidth = levelEffectHandler.parentNode.offsetWidth;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftX = currentPointX - moveEvt.clientX;

      currentPointX = moveEvt.clientX;
      var newCoords = levelEffectHandler.offsetLeft - shiftX;

      if (newCoords < 0) {
        newCoords = 0;
      } else if (newCoords > parentWidth) {
        newCoords = parentWidth;
      }
      var percent = Math.round(newCoords / parentWidth * 100);
      setEffectHandlerValue(percent);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.initializeFilters(uploadEffects, applyFilter);
  levelEffectHandler.addEventListener('mousedown', onMouseDownCoords);

  // Ресайз

  var adjustScale = function (scale) {
    picturePreview.style.transform = 'scale(' + scale / 100 + ')';
  };

  window.initializeScale(resizeControls, adjustScale);

  // Хэштеги

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

  // Отправка по сабмиту

  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.uploadData(new FormData(uploadForm), onClickCloseForm, window.backend.onError);
  });
})();
