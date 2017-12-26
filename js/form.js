'use strict';

(function () {
  var DEFAULT_FILTER = 'none';
  var DEFAULT_SIZE = 100;
  var MAX_COMMENT_LENGTH = 140;
  var MAX_HASHTAGS = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var DEFAULT_FILTER_VALUE = 20;

  var uploadFormNode = document.getElementById('upload-select-image');
  var uploadInputNode = document.getElementById('upload-file');
  var overlayNode = uploadFormNode.querySelector('.upload-overlay');
  var closeIconNode = overlayNode.querySelector('.upload-form-cancel');
  var commentInputNode = overlayNode.querySelector('.upload-form-description');
  var effectsControlsNode = overlayNode.querySelector('.upload-effect-controls');
  var picturePreviewNode = overlayNode.querySelector('.effect-image-preview');
  var effectsLevelNode = overlayNode.querySelector('.upload-effect-level');
  var effectValueNode = effectsLevelNode.querySelector('.upload-effect-level-value');
  var effectHandlerNode = effectsLevelNode.querySelector('.upload-effect-level-pin');
  var levelEffectValue = effectsLevelNode.querySelector('.upload-effect-level-val');
  var resizeControlsNode = document.querySelector('.upload-resize-controls');
  var hashtagsNode = overlayNode.querySelector('.upload-form-hashtags');

  var onClickOpenForm = function () {
    setDefaultFilter();
    overlayNode.classList.remove('hidden');
    document.addEventListener('keydown', onEscCloseForm);
  };

  var onClickCloseForm = function () {
    uploadFormNode.reset();
    onCloseReset();
    adjustScale(DEFAULT_SIZE);
    setDefaultFilter();
    overlayNode.classList.add('hidden');
    document.removeEventListener('keydown', onEscCloseForm);
  };

  var setDefaultFilter = function () {
    applyFilter(DEFAULT_FILTER, DEFAULT_FILTER);
    setEffectHandlerValue(DEFAULT_FILTER_VALUE);
  };

  var onCloseReset = function () {
    picturePreviewNode.className = 'effect-image-preview';
    hashtagsNode.style.borderColor = 'transparent';
    commentInputNode.style.borderColor = 'transparent';
  };

  var onEscCloseForm = function (evt) {
    if (window.util.isEscEvent(evt)) {
      closeIconNode.click();
    }
  };

  uploadInputNode.addEventListener('change', onClickOpenForm);
  closeIconNode.addEventListener('click', onClickCloseForm);
  commentInputNode.addEventListener('focus', function () {
    document.removeEventListener('keydown', onEscCloseForm);
  });
  commentInputNode.addEventListener('blur', function () {
    document.addEventListener('keydown', onEscCloseForm);
  });

  // Эффекты

  var effectClass;

  var applyFilter = function (oldFilter, newFilter) {
    oldFilter = 'effect-' + oldFilter;
    newFilter = 'effect-' + newFilter;

    picturePreviewNode.classList.remove(oldFilter);
    if (newFilter === 'effect-none') {
      effectsLevelNode.classList.add('hidden');
    } else {
      picturePreviewNode.classList.add(newFilter);
      effectsLevelNode.classList.remove('hidden');
    }

    effectClass = newFilter;
    setEffectHandlerValue(DEFAULT_FILTER_VALUE);
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

    picturePreviewNode.style.filter = filter;
  };

  var setEffectHandlerValue = function (percent) {
    var parentWidth = effectHandlerNode.parentNode.offsetWidth;
    var leftOffset = percent * parentWidth / 100;
    effectHandlerNode.style.left = leftOffset + 'px';
    levelEffectValue.style.width = leftOffset + 'px';
    effectValueNode.value = percent;
    setFilterSettings(percent);
  };

  var onMouseDownCoords = function (evt) {
    evt.preventDefault();

    var currentPointX = evt.clientX;
    var parentWidth = effectHandlerNode.parentNode.offsetWidth;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftX = currentPointX - moveEvt.clientX;

      currentPointX = moveEvt.clientX;
      var newCoords = effectHandlerNode.offsetLeft - shiftX;

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

  window.initializeFilters(effectsControlsNode, applyFilter);
  effectHandlerNode.addEventListener('mousedown', onMouseDownCoords);

  // Ресайз

  var adjustScale = function (scale) {
    picturePreviewNode.style.transform = 'scale(' + scale / 100 + ')';
  };

  window.initializeScale(resizeControlsNode, adjustScale);

  // Хэштеги
  var addBorder = function (input) {
    input.style.borderColor = 'red';
  };

  var removeBorder = function (input) {
    input.style.borderColor = 'transparent';
  };
  var hashtagsValidityCheck = function () {
    var hashtagsSpacesValidity = [];

    var hashtags = hashtagsNode.value.trim().toLowerCase().split(' ');
    if (hashtagsNode.value.length === 0) {
      hashtagsNode.setCustomValidity('');
      removeBorder(hashtagsNode);
      return true;
    }
    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i].length > MAX_HASHTAG_LENGTH) {
        hashtagsNode.setCustomValidity('Максимум 5 хэштэгов по 20 символов');
        addBorder(hashtagsNode);
        return false;
      }
      if (hashtags[i][0] !== '#') {
        hashtagsNode.setCustomValidity('Каждый хэштег должен начинаться с #');
        addBorder(hashtagsNode);
        return false;
      }
      if (hashtags.indexOf(hashtags[i]) !== i) {
        hashtagsNode.setCustomValidity('Хэштеги не должны повторяться');
        addBorder(hashtagsNode);
        return false;
      }
      hashtagsSpacesValidity[i] = hashtags[i].slice(1);
      if (hashtagsSpacesValidity[i].search(/#/) !== -1) {
        hashtagsNode.setCustomValidity('Хэштеги должны разделяться пробелами');
        addBorder(hashtagsNode);
        return false;
      }
    }
    if (hashtags.length > MAX_HASHTAGS) {
      hashtagsNode.setCustomValidity('Максимум 5 хэштэгов по 20 символов');
      addBorder(hashtagsNode);
      return false;
    }
    hashtagsNode.setCustomValidity('');
    removeBorder(hashtagsNode);
    return true;
  };

  var commentValidityCheck = function () {
    if (commentInputNode.value.length > MAX_COMMENT_LENGTH) {
      commentInputNode.setCustomValidity('Комментарий не должен содержать больше 140 символов. Сейчас символов: ' + commentInputNode.value.length);
      addBorder(commentInputNode);
    } else {
      commentInputNode.setCustomValidity('');
      removeBorder(commentInputNode);
    }
  };

  commentInputNode.addEventListener('input', commentValidityCheck);
  hashtagsNode.addEventListener('input', hashtagsValidityCheck);

  // Отправка по сабмиту

  uploadFormNode.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.uploadData(new FormData(uploadFormNode), onClickCloseForm, window.backend.onError);
  });
})();
