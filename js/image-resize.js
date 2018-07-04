'use strict';

(function () {

  var size = {
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
    if (imageSize <= size.MAX && imageSize > size.MIN) {
      imageSize -= size.STEP;
    }
    return imageSize;
  };
  var increaseImage = function () {
    if (imageSize < size.MAX && imageSize >= size.MIN) {
      imageSize += size.STEP;
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
