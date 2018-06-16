'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var uploadFileInput = document.querySelector('#upload-file');
  var imageEditForm = document.querySelector('.img-upload__overlay');
  var imagePreview = imageEditForm.querySelector('.img-upload__preview');
  var uploadCancel = imageEditForm.querySelector('#upload-cancel');

  var scaleLine = imageEditForm.querySelector('.scale__line');
  var scalePin = imageEditForm.querySelector('.scale__pin');

  var buttonMinus = imageEditForm.querySelector('.resize__control--minus');
  var buttonPlus = imageEditForm.querySelector('.resize__control--plus');
  var sizeInput = imageEditForm.querySelector('.resize__control--value');
  var currentSize = 100;
  var maxSize = 100;
  var minSize = 25;
  var resizeStep = 25;

  var effectsItems = imageEditForm.querySelectorAll('.effects__item');
  var currentEffectFilter;
  var currentEffect;
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
      imagePreview.style.transform = 'scale(' + currentSize / 100 + ')';
      sizeInput.value = currentSize + '%';
    }
  };
  var increaseImage = function () {
    if (currentSize < maxSize && currentSize >= minSize) {
      currentSize += resizeStep;
      imagePreview.style.transform = 'scale(' + currentSize / 100 + ')';
      sizeInput.value = currentSize + '%';
    }
  };

  var getFilterValue = function (effect, x) {
    var currentFilterValue = x * effect.filterMax + effect.filterMin;
    return effect.filter + '(' + currentFilterValue + effect.filterUnits + ')';
  };

  var removeEffect = function () {
    imagePreview.style.filter = '';
    imagePreview.classList.remove(imagePreview.classList[1]);
  };

  var applyEffect = function (evt) {
    removeEffect();
    currentEffect = evt.currentTarget.querySelector('.effects__preview');
    var effectsRadioInput = evt.currentTarget.querySelector('.effects__radio');
    imagePreview.classList.add(currentEffect.classList[1]);
    currentEffectFilter = effectsRadioInput.id;
  };
  var openImageEditForm = function () {
    imageEditForm.classList.remove('hidden');
    document.addEventListener('keydown', onImageEditFormPressEsc);
    for (var i = 0; i < effectsItems.length; i++) {
      effectsItems[i].addEventListener('click', applyEffect);
    }
    scalePin.addEventListener('mouseup', applyFilterChange);
  };
  var closeImageEditForm = function () {
    imageEditForm.classList.add('hidden');
    uploadFileInput.value = '';
    document.removeEventListener('keydown', onImageEditFormPressEsc);
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
  };

  uploadFileInput.addEventListener('change', function () {
    openImageEditForm();
  });
  buttonMinus.addEventListener('click', function () {
    reduceImage();
  });
  buttonPlus.addEventListener('click', function () {
    increaseImage();
  });
  uploadCancel.addEventListener('click', function () {
    closeImageEditForm();
  });
}());
