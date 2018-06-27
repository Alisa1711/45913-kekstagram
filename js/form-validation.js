'use strict';

(function () {

  var MAX_HASHTAGS_NUMBER = 5;
  var MAX_HASHTAG_LENGTH = 20;

  var submitButton = document.querySelector('.img-upload__submit');
  var hashtagsInput = document.querySelector('.text__hashtags');
  var textFieldset = document.querySelector('.img-upload__text');

  var validateHashtagsInput = function (inputValue) {
    var hashtags = inputValue.toLowerCase().split(' ');
    var validityMessages = [];

    if (window.utils.checkMatchingItems(hashtags)) {
      validityMessages.push('Нельзя использовать два одинаковых хеш-тега (хеш-теги нечувствительный к регистру)');
    }
    if (hashtags.length > MAX_HASHTAGS_NUMBER) {
      validityMessages.push('Нельзя указать больше' + MAX_HASHTAGS_NUMBER + 'хэш-тегов');
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
      if (hashtag.length > MAX_HASHTAG_LENGTH) {
        validityMessages.push('Максимальная длина хэш-тега' + MAX_HASHTAG_LENGTH + 'символов, включая решётку');
      }
    }
    return window.utils.getUniqueItems(validityMessages).join('. ');
  };

  textFieldset.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });

  submitButton.addEventListener('click', function () {
    hashtagsInput.value = window.utils.removeExtraSpaces(hashtagsInput.value);
    if (hashtagsInput.value) {
      var customValidityMessages = validateHashtagsInput(hashtagsInput.value);
      hashtagsInput.setCustomValidity(customValidityMessages);
    } else {
      hashtagsInput.setCustomValidity('');
    }
  });
}());
