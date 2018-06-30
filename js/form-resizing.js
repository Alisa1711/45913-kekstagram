'use strict';

(function () {

  var MAX_SIZE = 100;
  var MIN_SIZE = 25;
  var STEP = 25;
  var imagePreview = window.form.imagePreview;
  var imgResizeFieldset = document.querySelector('.img-upload__resize');
  var buttonMinus = imgResizeFieldset.querySelector('.resize__control--minus');
  var buttonPlus = imgResizeFieldset.querySelector('.resize__control--plus');
  var imageSize = parseInt(window.form.sizeInput.value, 10);

  var reduceImage = function () {
    if (imageSize <= MAX_SIZE && imageSize > MIN_SIZE) {
      imageSize -= STEP;
    }
    return imageSize;
  };
  var increaseImage = function () {
    if (imageSize < MAX_SIZE && imageSize >= MIN_SIZE) {
      imageSize += STEP;
    }
    return imageSize;
  };
  var resizeImage = function (evt) {
    if (evt.target === buttonMinus) {
      reduceImage();
    } else if (evt.target === buttonPlus) {
      increaseImage();
    }
    imagePreview.style.transform = 'scale(' + imageSize / 100 + ')';
    window.form.sizeInput.value = imageSize + '%';
  };

  imgResizeFieldset.addEventListener('click', resizeImage);

}());
