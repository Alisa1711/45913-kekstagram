'use strict';

(function () {
  var MIN_AVATAR_NUMBER = 1;
  var MAX_AVATAR_NUMBER = 6;
  var MAX_COMMENTS_DISPLAY = 5;
  var image = document.querySelector('.big-picture');
  var imageCloseButton = document.querySelector('.big-picture__cancel');
  var commentsList = image.querySelector('.social__comments');

  var getAvatarPath = function () {
    return 'img/avatar-' + window.utils.getRandomInteger(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg';
  };

  var renderComment = function (commentText) {
    var commentTemplate = document.querySelector('#picture').content.querySelector('.social__comment');
    var comment = commentTemplate.cloneNode(true);

    comment.querySelector('.social__picture').src = getAvatarPath();
    comment.querySelector('.social__text').textContent = commentText;

    return comment;
  };

  var renderCommentsList = function (comments, maxAmount) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < comments.length && i < maxAmount; i++) {
      fragment.appendChild(renderComment(comments[i]));
    }
    commentsList.appendChild(fragment);
  };

  var removeComments = function () {
    var tmpRange = document.createRange();

    tmpRange.selectNodeContents(commentsList);
    tmpRange.deleteContents();

    tmpRange.detach();
  };

  var renderImage = function (picture) {
    image.querySelector('img').src = picture.url;
    image.querySelector('.social__caption').textContent = picture.description;
    image.querySelector('.likes-count').textContent = picture.likes;
    image.querySelector('.comments-count').textContent = picture.comments.length;

    renderCommentsList(picture.comments, MAX_COMMENTS_DISPLAY);

    image.querySelector('.social__comment-count').classList.add('visually-hidden');
    image.querySelector('.social__loadmore').classList.add('visually-hidden');
  };

  var closeImage = function () {
    image.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onImagePressEsc);
    imageCloseButton.removeEventListener('click', closeImage);
    removeComments();
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
