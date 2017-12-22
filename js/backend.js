'use strict';

(function () {
  var URL_DOWNLOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';

  var initializeXHR = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;

        default:
          error = 'Неизвестный статус' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не прошел за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000;
    return xhr;
  };

  window.backend = {
    downloadData: function (onLoad, onError) {
      var xhr = initializeXHR(onLoad, onError);
      xhr.open('GET', URL_DOWNLOAD);
      xhr.send();
    },
    uploadData: function (data, onLoad, onError) {
      var xhr = initializeXHR(onLoad, onError);
      xhr.open('POST', URL_UPLOAD);
      xhr.send(data);
    },
    onError: function (error) {
      var messageBlock = document.createElement('div');
      messageBlock.style = 'width: 100%; heigth: 100px; background-color: red; color: black; font-size: 20px; text-align: center; font-weight: bold;';
      messageBlock.textContent = error;
      document.body.insertAdjacentElement('afterbegin', messageBlock);
    }
  };
})();
