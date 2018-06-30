'use strict';

(function () {

  var imagePreview = window.form.imagePreview;
  var scale = document.querySelector('.img-upload__scale');
  var scaleLine = window.form.scaleLine;
  var scalePin = document.querySelector('.scale__pin');
  var scaleInput = document.querySelector('.scale__value');
  var scaleLevel = document.querySelector('.scale__level');

  var checkedEffectRadio = document.querySelector('.effects__radio[checked]');

  var EFFECTS = [
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

  var changeEffect = function (evt) {
    imagePreview.style.filter = '';
    imagePreview.classList.remove(getEffectClass());

    setScalePosition(scaleLine.offsetWidth);
    scaleInput.value = getEffectLevel();

    checkedEffectRadio = evt.target;

    if (checkedEffectRadio.id === 'effect-none') {
      scale.classList.add('hidden');
    } else {
      scale.classList.remove('hidden');
      imagePreview.classList.add(getEffectClass());
    }

  };

  var setEffectLevelChanges = function () {
    var effect = EFFECTS.find(function (elem) {
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

  window.formEffects = {
    changeEffect: changeEffect,
    onScaleLineMouseDown: onScaleLineMouseDown
  };

}());
