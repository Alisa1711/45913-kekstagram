'use strict';

(function () {

  var imagePreview = document.querySelector('.img-upload__preview');
  var uploadFileInput = document.querySelector('#upload-file');
  var imageEditForm = document.querySelector('.img-upload__overlay');
  var uploadCancel = imageEditForm.querySelector('#upload-cancel');
  var effectsList = imageEditForm.querySelector('.effects__list');
  var scaleLine = imageEditForm.querySelector('.scale__line');

  var openImageEditForm = function () {
    imageEditForm.classList.remove('hidden');
    document.addEventListener('keydown', onImageEditFormPressEsc);
    document.body.classList.add('modal-open');
    effectsList.addEventListener('click', window.formEffects.changeEffect);
    scaleLine.addEventListener('mousedown', window.formEffects.onScaleLineMouseDown);
    uploadCancel.addEventListener('click', closeImageEditForm);
  };

  var closeImageEditForm = function () {
    imageEditForm.classList.add('hidden');
    uploadFileInput.value = '';
    document.removeEventListener('keydown', onImageEditFormPressEsc);
    document.body.classList.remove('modal-open');
    effectsList.removeEventListener('click', window.formEffects.changeEffect);
    scaleLine.removeEventListener('mousedown', window.formEffects.onScaleLineMouseDown);
    uploadCancel.removeEventListener('click', closeImageEditForm);
  };

  var onImageEditFormPressEsc = function (evt) {
    window.utils.isEscPressed(evt, closeImageEditForm);
  };

  uploadFileInput.addEventListener('change', openImageEditForm);

  window.form = {
    imageEditForm: imageEditForm,
    imagePreview: imagePreview,
    scaleLine: scaleLine
  };

}());
