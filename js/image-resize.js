'use strict';

(function () {

  var Size = {
    MAX: 100,
    MIN: 25,
    STEP: 25
  };
  var imagePreview = window.form.imagePreview;
  var imgResizeFieldset = document.querySelector('.img-upload__resize');
  var buttonMinus = imgResizeFieldset.querySelector('.resize__control--minus');
  var buttonPlus = imgResizeFieldset.querySelector('.resize__control--plus');
  var imageSize = parseInt(window.form.sizeInput.value, 10);

  var reduceImage = function () {
    if (imageSize <= Size.MAX && imageSize > Size.MIN) {
      imageSize -= Size.STEP;
    }
    return imageSize;
  };
  var increaseImage = function () {
    if (imageSize < Size.MAX && imageSize >= Size.MIN) {
      imageSize += Size.STEP;
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
