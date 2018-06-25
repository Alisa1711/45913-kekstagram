'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var MAX_HASHTAGS_NUMBER = 5;
  var MAX_HASHTAG_LENGTH = 20;

  var uploadFileInput = document.querySelector('#upload-file');
  var imageEditForm = document.querySelector('.img-upload__overlay');
  var imagePreview = imageEditForm.querySelector('.img-upload__preview');
  var uploadCancel = imageEditForm.querySelector('#upload-cancel');

  var scale = imageEditForm.querySelector('.img-upload__scale');
  var scaleLine = imageEditForm.querySelector('.scale__line');
  var scalePin = imageEditForm.querySelector('.scale__pin');
  var scaleInput = imageEditForm.querySelector('.scale__value');
  var scaleLevel = imageEditForm.querySelector('.scale__level');

  var imgResizeFieldset = imageEditForm.querySelector('.img-upload__resize');
  var buttonMinus = imageEditForm.querySelector('.resize__control--minus');
  var buttonPlus = imageEditForm.querySelector('.resize__control--plus');
  var sizeInput = imageEditForm.querySelector('.resize__control--value');
  var imageSize = 100;
  var MAX_IMAGE_SIZE = 100;
  var MIN_IMAGE_SIZE = 25;
  var RESIZING_STEP = 25;

  var effectsList = imageEditForm.querySelector('.effects__list');
  var checkedEffectRadio = effectsList.querySelector('input[checked]');

  var effects = [
    {
      name: 'effect-chrome',
      filter: 'grayscale',
      min: 0,
      max: 1,
      units: ''
    },
    {
      name: 'effect-sepia',
      filter: 'sepia',
      min: 0,
      max: 1,
      units: ''
    },
    {
      name: 'effect-marvin',
      filter: 'invert',
      min: 0,
      max: 100,
      units: '%'
    },
    {
      name: 'effect-phobos',
      filter: 'blur',
      min: 0,
      max: 5,
      units: 'px'
    },
    {
      name: 'effect-heat',
      filter: 'brightness',
      min: 1,
      max: 3,
      units: ''
    }
  ];
  var reduceImage = function () {
    if (imageSize <= MAX_IMAGE_SIZE && imageSize > MIN_IMAGE_SIZE) {
      imageSize -= RESIZING_STEP;
    }
    return imageSize;
  };
  var increaseImage = function () {
    if (imageSize < MAX_IMAGE_SIZE && imageSize >= MIN_IMAGE_SIZE) {
      imageSize += RESIZING_STEP;
    }
    return imageSize;
  };
  var resizeImage = function (button) {
    if (button === buttonMinus) {
      reduceImage();
    } else if (button === buttonPlus) {
      increaseImage();
    }
    imagePreview.style.transform = 'scale(' + imageSize / 100 + ')';
    sizeInput.value = imageSize + '%';
  };
  var getEffectClass = function () {
    return 'effects__preview--' + checkedEffectRadio.value;
  };
  var getEffectLevel = function () {
    return Math.round(scalePin.offsetLeft / scaleLine.offsetWidth * 100);
  };
  var getFilterValue = function (effect) {
    var currentFilterValue = getEffectLevel() * effect.max / 100 + effect.min;
    return effect.filter + '(' + currentFilterValue + effect.units + ')';
  };
  var setScalePosition = function (position) {
    scalePin.style.left = position + 'px';
    scaleLevel.style.width = position + 'px';
  };

  var removeEffect = function () {
    imagePreview.removeAttribute('style');
    imagePreview.classList.remove(getEffectClass());
  };

  var applyEffect = function (input) {
    removeEffect();
    setScalePosition(scaleLine.offsetWidth);
    scaleInput.value = getEffectLevel();
    checkedEffectRadio = input;
    if (input.id === 'effect-none') {
      scale.classList.add('hidden');
    } else {
      scale.classList.remove('hidden');
      imagePreview.classList.add(getEffectClass());
    }
  };

  var openImageEditForm = function () {
    imageEditForm.classList.remove('hidden');
    applyEffect(checkedEffectRadio);
    document.addEventListener('keydown', onImageEditFormPressEsc);
    document.body.classList.add('modal-open');
    effectsList.addEventListener('click', function (evt) {
      applyEffect(evt.target);
    });
    scaleLine.addEventListener('mousedown', onScaleLineMouseDown);
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

  var setEffectLevelChanges = function () {
    var effect = effects.find(function (elem) {
      return elem.name === checkedEffectRadio.id;
    });
    imagePreview.style.filter = getFilterValue(effect);
  };

  var onScaleLineMouseDown = function (evt) {
    evt.preventDefault();
    var sliderCoord = scaleLine.getBoundingClientRect();
    var scalePinLeft = evt.clientX - sliderCoord.left;

    setScalePosition(scalePinLeft);

    var onMouseMove = function (moveEvt) {
      scalePinLeft = moveEvt.clientX - sliderCoord.left;

      if (scalePinLeft < 0) {
        scalePinLeft = 0;
      } else if (scalePinLeft > scaleLine.offsetWidth) {
        scalePinLeft = scaleLine.offsetWidth;
      }
      setScalePosition(scalePinLeft);
      setEffectLevelChanges();
    };

    var onMouseUp = function () {
      setEffectLevelChanges();
      scaleInput.value = getEffectLevel();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
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

  var removeExtraSpaces = function (str) {
    return str.replace(/[\s{2,}]+/g, ' ').trim();
  };

  var checkMatchingItems = function (arr) {
    return arr.length - getUniqueItems(arr).length;
  };

  var getUniqueItems = function (arr) {
    var uniqueItems = {};

    for (var i = 0; i < arr.length; i++) {
      uniqueItems[arr[i]] = true;
    }
    return Object.keys(uniqueItems);
  };

  var validateHashtagsInput = function (inputValue) {
    var hashtags = inputValue.toLowerCase().split(' ');
    var validityMessages = [];

    if (checkMatchingItems(hashtags)) {
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
    return getUniqueItems(validityMessages).join('. ');
  };

  textFieldset.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });

  submitButton.addEventListener('click', function () {
    hashtagsInput.value = removeExtraSpaces(hashtagsInput.value);
    if (hashtagsInput.value) {
      var customValidityMessages = validateHashtagsInput(hashtagsInput.value);
      hashtagsInput.setCustomValidity(customValidityMessages);
    } else {
      hashtagsInput.setCustomValidity('');
    }
  });
}());
