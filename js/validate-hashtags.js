'use strict';

(function () {
  var RESTRICTION = {
    NUMBER: 5,
    LENGTH: 20
  };

  window.validateHashtags = function (inputValue) {
    var hashtags = inputValue.toLowerCase().split(' ');
    var validityMessages = [];

    if (window.utils.checkMatchingItems(hashtags)) {
      validityMessages.push('Нельзя использовать два одинаковых хеш-тега (хеш-теги нечувствительны к регистру)');
    }
    if (hashtags.length > RESTRICTION.NUMBER) {
      validityMessages.push('Нельзя указать больше' + RESTRICTION.NUMBER + 'хэш-тегов');
    }
    for (var i = 0; i < hashtags.length; i++) {
      var hashtag = hashtags[i];

      if (hashtag[0] !== '#') {
        validityMessages.push('Хеш-тэг должен начинаться с #');
      }
      if (hashtag.lastIndexOf('#') > 0) {
        validityMessages.push('Хэш-теги разделяются пробелами');
      }
      if (hashtag === '#') {
        validityMessages.push('Хеш-тег не может состоять только из одной решётки');
      }
      if (hashtag.length > RESTRICTION.LENGTH) {
        validityMessages.push('Максимальная длина хэш-тега' + RESTRICTION.LENGTH + 'символов, включая решётку');
      }
    }
    return window.utils.getUniqueItems(validityMessages).join('. ');
  };

}());
