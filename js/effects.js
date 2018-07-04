'use strict';

(function () {
  var imagePreview = window.form.imagePreview;
  var scale = document.querySelector('.img-upload__scale');
  var scaleLine = window.form.scaleLine;
  var scalePin = document.querySelector('.scale__pin');
  var scaleInput = document.querySelector('.scale__value');
  var scaleLevel = document.querySelector('.scale__level');

  var Effect = function (name, options) {
    this.name = name;
    this.filter = options.filter;
    this.min = options.min || 0;
    this.max = options.max || 1;
    this.units = options.units || '';
  };

  Effect.prototype = {
    getClass: function () {
      return 'effects__preview--' + this.name;
    },
    addClass: function (elem) {
      elem.classList.add(this.getClass());
    },
    removeClass: function (elem) {
      elem.classList.remove(this.getClass());
    },
    getLevel: function () {
      return Math.round(scalePin.offsetLeft / scaleLine.offsetWidth * 100);
    },
    applyLevel: function (elem) {
      var filterValue = this.getLevel() * this.max / 100 + this.min;
      elem.style.filter = this.filter + '(' + filterValue + this.units + ')';
    },
  };

  var effectsMap = {
    'effect-chrome': new Effect('chrome', {filter: 'grayscale'}),
    'effect-sepia': new Effect('sepia', {filter: 'sepia'}),
    'effect-marvin': new Effect('marvin', {filter: 'invert', max: 100, units: '%'}),
    'effect-phobos': new Effect('phobos', {filter: 'blur', max: 5, units: 'px'}),
    'effect-heat': new Effect('heat', {filter: 'brightness', min: 1, max: 3})
  };

  var currentEffect;

  var changeEffect = function (evt) {
    if (evt.target.tagName === 'INPUT') {
      imagePreview.removeAttribute('style');

      if (currentEffect) {
        currentEffect.removeClass(imagePreview);
      }

      currentEffect = effectsMap[evt.target.id];

      if (currentEffect) {
        scale.classList.remove('hidden');
        setScalePosition(scaleLine.offsetWidth);
        scaleInput.value = currentEffect.getLevel();
        currentEffect.addClass(imagePreview);
      } else {
        scale.classList.add('hidden');
      }
    }
  };

  var setScalePosition = function (position) {
    scalePin.style.left = position + 'px';
    scaleLevel.style.width = position + 'px';
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
      currentEffect.applyLevel(imagePreview);
    };

    var onMouseUp = function () {
      currentEffect.applyLevel(imagePreview);
      scaleInput.value = currentEffect.getLevel();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.effects = {
    changeEffect: changeEffect,
    onScaleLineMouseDown: onScaleLineMouseDown
  };

}());
