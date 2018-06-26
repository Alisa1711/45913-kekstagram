'use strict';

(function () {
  var MIN_AVATAR_NUMBER = 1;
  var MAX_AVATAR_NUMBER = 6;
  var image = document.querySelector('.big-picture');
  var imageCloseButton = document.querySelector('.big-picture__cancel');
  var socialComments = image.querySelectorAll('.social__comment');

  var renderImage = function (picture) {
    image.querySelector('img').src = picture.url;
    image.querySelector('.social__caption').textContent = picture.description;
    image.querySelector('.likes-count').textContent = picture.likes;
    image.querySelector('.comments-count').textContent = picture.comments.length;

    for (var i = 0; i < picture.comments.length; i++) {
      socialComments[i].querySelector('.social__picture').src = 'img/avatar-' + window.utils.getRandomInteger(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg';
      socialComments[i].querySelector('.social__text').textContent = picture.comments[i];
    }
    image.querySelector('.social__comment-count').classList.add('visually-hidden');
    image.querySelector('.social__loadmore').classList.add('visually-hidden');
  };

  var closeImage = function () {
    image.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onImagePressEsc);
    imageCloseButton.removeEventListener('click', closeImage);
  };

  var onImagePressEsc = function (evt) {
    window.utils.isEscPressed(evt, closeImage);
  };

  window.openImage = function (picture) {
    renderImage(picture);
    image.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onImagePressEsc);
    imageCloseButton.addEventListener('click', closeImage);
  };

}());
