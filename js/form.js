'use strict';

(function () {

  var form = document.querySelector('.img-upload__form');
  var imagePreview = form.querySelector('img');
  var uploadFile = form.querySelector('#upload-file');
  var overlay = form.querySelector('.img-upload__overlay');
  var uploadCancel = form.querySelector('#upload-cancel');
  var effectsList = form.querySelector('.effects__list');
  var scaleLine = form.querySelector('.scale__line');
  var submitButton = form.querySelector('.img-upload__submit');
  var hashtagsInput = form.querySelector('.text__hashtags');
  var textFieldset = form.querySelector('.img-upload__text');
  var sizeInput = form.querySelector('.resize__control--value');
  var filterPreviews = form.querySelectorAll('.effects__preview');

  var onUploadFileChange = function () {
    var file = uploadFile.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
      imagePreview.src = reader.result;
      for (var i = 0; i < filterPreviews.length; i++) {
        filterPreviews[i].style.backgroundImage = 'url(' + reader.result + ')';
      }
      openOverlay();
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      imagePreview.src = '';
      for (var i = 0; i < filterPreviews.length; i++) {
        filterPreviews[i].style.backgroundImage = '';
      }
    }
  };

  var openOverlay = function () {
    overlay.classList.remove('hidden');
    document.body.classList.add('modal-open');

    effectsList.addEventListener('click', window.formEffects.changeEffect);
    scaleLine.addEventListener('mousedown', window.formEffects.onScaleLineMouseDown);
    uploadCancel.addEventListener('click', closeOverlay);
    document.addEventListener('keydown', onOverlayPressEsc);
  };

  var closeOverlay = function () {
    overlay.classList.add('hidden');
    document.body.classList.remove('modal-open');

    effectsList.removeEventListener('click', window.formEffects.changeEffect);
    scaleLine.removeEventListener('mousedown', window.formEffects.onScaleLineMouseDown);
    uploadCancel.removeEventListener('click', closeOverlay);
    document.removeEventListener('keydown', onOverlayPressEsc);

    resetForm();
  };

  var onOverlayPressEsc = function (evt) {
    window.utils.isEscPressed(evt, closeOverlay);
  };

  var resetForm = function () {
    imagePreview.removeAttribute('style');
    imagePreview.className = '';
    uploadFile.value = '';
    form.reset();
  };

  var onSubmitButtonClick = function () {
    hashtagsInput.value = window.utils.removeExtraSpaces(hashtagsInput.value);
    if (hashtagsInput.value) {
      var customValidityMessages = window.validateHashtags(hashtagsInput.value);
      hashtagsInput.setCustomValidity(customValidityMessages);
    } else {
      hashtagsInput.setCustomValidity('');
    }
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    var formData = new FormData(form);
    window.backend.upload(formData, closeOverlay, onError);
  };

  var onError = function (message) {
    var error = window.utils.cloneTemplate('.img-upload__message--error');
    var errorLinks = error.querySelector('.error__links');

    document.body.appendChild(error);
    error.querySelector('.error__text').textContent = message;
    error.style.zIndex = '2';
    error.classList.remove('hidden');
    errorLinks.addEventListener('click', onErrorLinksClick);
  };

  var onErrorLinksClick = function (evt) {
    if (evt.target === evt.currentTarget.children[0]) {
      // клик по ссылке "Попробовать снова"
      onFormSubmit(evt);
    } else if (evt.target === evt.currentTarget.children[1]) {
      // клик по ссылке "Загрузить другой файл"
      closeOverlay();
      uploadFile.click();
    }
    evt.currentTarget.parentNode.classList.add('hidden');
    evt.currentTarget.removeEventListener('click', onErrorLinksClick);
  };

  uploadFile.addEventListener('change', onUploadFileChange);
  submitButton.addEventListener('click', onSubmitButtonClick);
  form.addEventListener('submit', onFormSubmit);
  textFieldset.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });

  window.form = {
    overlay: overlay,
    imagePreview: imagePreview,
    scaleLine: scaleLine,
    sizeInput: sizeInput
  };

}());
