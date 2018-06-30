'use strict';

(function () {
  var URL_DOWNLOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
  var SUCCESS = 200;
  var ERROR_INVALID_REQUEST = 400;
  var ERROR_NOTHING_FOUND = 404;

  var setupLoad = function (xhr, onLoad, onError) {
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case SUCCESS:
          onLoad(xhr.response);
          break;
        case ERROR_INVALID_REQUEST:
          onError('Неверный запрос');
          break;
        case ERROR_NOTHING_FOUND:
          onError('Ничего не найдено');
          break;

        default:
          onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
  };

  var download = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    setupLoad(xhr, onLoad, onError);
    xhr.open('GET', URL_DOWNLOAD);
    xhr.send();
  };

  var upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    setupLoad(xhr, onLoad, onError);
    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    download: download,
    upload: upload
  };
}());
