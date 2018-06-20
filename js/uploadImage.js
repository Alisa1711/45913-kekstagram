'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var uploadFileInput = document.querySelector('#upload-file');
  var imageEditForm = document.querySelector('.img-upload__overlay');
  var imagePreview = imageEditForm.querySelector('.img-upload__preview');
  var uploadCancel = imageEditForm.querySelector('#upload-cancel');

  var scale = imageEditForm.querySelector('.img-upload__scale');
  var scaleLine = imageEditForm.querySelector('.scale__line');
  var scalePin = imageEditForm.querySelector('.scale__pin');
  var scaleInput = imageEditForm.querySelector('.scale__value');

  var imgResizeFieldset = imageEditForm.querySelector('.img-upload__resize');
  var buttonMinus = imageEditForm.querySelector('.resize__control--minus');
  var buttonPlus = imageEditForm.querySelector('.resize__control--plus');
  var sizeInput = imageEditForm.querySelector('.resize__control--value');
  var currentSize = 100;
  var maxSize = 100;
  var minSize = 25;
  var resizeStep = 25;

  var effectsRadios = imageEditForm.querySelectorAll('.effects__radio');
  var currentEffectFilter;
  var effectClass;
  var effects = [
    {
      name: 'effect-chrome',
      filter: 'grayscale',
      filterMin: 0,
      filterMax: 1,
      filterUnits: ''
    },
    {
      name: 'effect-sepia',
      filter: 'sepia',
      filterMin: 0,
      filterMax: 1,
      filterUnits: ''
    },
    {
      name: 'effect-marvin',
      filter: 'invert',
      filterMin: 0,
      filterMax: 100,
      filterUnits: '%'
    },
    {
      name: 'effect-phobos',
      filter: 'blur',
      filterMin: 0,
      filterMax: 5,
      filterUnits: 'px'
    },
    {
      name: 'effect-heat',
      filter: 'brightness',
      filterMin: 1,
      filterMax: 3,
      filterUnits: ''
    }
  ];
  var reduceImage = function () {
    if (currentSize <= maxSize && currentSize > minSize) {
      currentSize -= resizeStep;
    }
    return currentSize;
  };
  var increaseImage = function () {
    if (currentSize < maxSize && currentSize >= minSize) {
      currentSize += resizeStep;
    }
    return currentSize;
  };
  var resizeImage = function (button) {
    if (button === buttonMinus) {
      reduceImage();
    } else if (button === buttonPlus) {
      increaseImage();
    }
    imagePreview.style.transform = 'scale(' + currentSize / 100 + ')';
    sizeInput.value = currentSize + '%';
  };
  var getFilterValue = function (effect, x) {
    var currentFilterValue = x * effect.filterMax + effect.filterMin;
    return effect.filter + '(' + currentFilterValue + effect.filterUnits + ')';
  };
  var removeEffect = function () {
    imagePreview.style.filter = '';
    imagePreview.classList.remove(effectClass);
  };
  var onEffectsRadiosClick = function (evt) {
    removeEffect();
    if (evt.target.id === 'effect-none') {
      scale.classList.add('hidden');
    } else {
      scale.classList.remove('hidden');
      effectClass = 'effects__preview--' + evt.target.value;
      imagePreview.classList.add(effectClass);
      currentEffectFilter = evt.target.id;
    }
  };
  var openImageEditForm = function () {
    imageEditForm.classList.remove('hidden');
    document.addEventListener('keydown', onImageEditFormPressEsc);
    document.body.classList.add('modal-open');
    for (var i = 0; i < effectsRadios.length; i++) {
      effectsRadios[i].addEventListener('click', onEffectsRadiosClick);
    }
    scalePin.addEventListener('mouseup', applyFilterChange);
  };
  var closeImageEditForm = function () {
    imageEditForm.classList.add('hidden');
    uploadFileInput.value = '';
    document.removeEventListener('keydown', onImageEditFormPressEsc);
    document.body.classList.remove('modal-open');
  };
  var onImageEditFormPressEsc = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeImageEditForm();
    }
  };
  var applyFilterChange = function () {
    var x = scalePin.offsetLeft / scaleLine.offsetWidth;
    for (var i = 0; i < effects.length; i++) {
      if (effects[i].name === currentEffectFilter) {
        imagePreview.style.filter = getFilterValue(effects[i], x);
      }
    }
    scaleInput.value = String(Math.round(x * 100));
  };

  uploadFileInput.addEventListener('change', function () {
    openImageEditForm();
  });
  imgResizeFieldset.addEventListener('click', function (evt) {
    resizeImage(evt.target);
  });
  uploadCancel.addEventListener('click', function () {
    closeImageEditForm();
  });

  var submitButton = imageEditForm.querySelector('.img-upload__submit');
  var hashtagsInput = imageEditForm.querySelector('.text__hashtags');
  var textFieldset = imageEditForm.querySelector('.img-upload__text');

  var checkMatchesСaseInsensitive = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].toLowerCase();
    }
    return arr.length - getUniqueItems(arr).length;
  };

  var getUniqueItems = function (arr) {
    var uniqueItems = {};

    for (var i = 0; i < arr.length; i++) {
      uniqueItems[arr[i]] = true;
    }
    return Object.keys(uniqueItems);
  };

  var validateInputHashtags = function (hashtags) {
    var validityMessages = [];

    if (checkMatchesСaseInsensitive(hashtags)) {
      validityMessages.push('Нельзя использовать два одинаковых хеш-тега (хеш-теги нечувствительный к регистру)');
    }
    if (hashtags.length > 5) {
      validityMessages.push('Нельзя указать больше пяти хэш-тегов');
    }
    for (var i = 0; i < hashtags.length; i++) {
      var hashtag = hashtags[i];
      var hashSymbols = hashtag.match(/\#/g);

      if (hashtag[0] !== '#') {
        validityMessages.push('Хеш-тэг должен начинаться с #');
      }
      if (hashSymbols && hashSymbols.length > 1) {
        validityMessages.push('Хэш-теги разделяются пробелами');
      }
      if (hashtag === '#') {
        validityMessages.push('Хеш-тег не может состоять только из одной решётки');
      }
      if (hashtag.length > 20) {
        validityMessages.push('Максимальная длина хэш-тега 20 символов, включая решётку');
      }
    }
    return getUniqueItems(validityMessages).join('. ');
  };

  textFieldset.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });

  submitButton.addEventListener('click', function () {
    if (hashtagsInput.value) {
      var customValidityMessages = validateInputHashtags(hashtagsInput.value.split(' '));
      hashtagsInput.setCustomValidity(customValidityMessages);
    }
  });
}());
