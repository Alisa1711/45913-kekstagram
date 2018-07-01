'use strict';

(function () {
  var MIN_AVATAR_NUMBER = 1;
  var MAX_AVATAR_NUMBER = 6;
  var COMMENTS_PER_TIME = 5;
  var start = 0;
  var image = document.querySelector('.big-picture');
  var imageCloseButton = image.querySelector('.big-picture__cancel');
  var commentsList = image.querySelector('.social__comments');
  var loadMoreButton = image.querySelector('.social__loadmore');
  var comments;

  var getAvatarPath = function () {
    return 'img/avatar-' + window.utils.getRandomInteger(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg';
  };

  var renderComment = function (commentText) {
    var comment = window.utils.cloneTemplate('.social__comment');

    comment.querySelector('.social__picture').src = getAvatarPath();
    comment.querySelector('.social__text').textContent = commentText;

    return comment;
  };

  var renderCommentsList = function () {
    var fewComments = comments.slice(start, start + COMMENTS_PER_TIME);
    var fragment = document.createDocumentFragment();

    if (window.utils.getLastItem(fewComments) === window.utils.getLastItem(comments)) {
      start = 0;
      loadMoreButton.classList.add('hidden');
    } else {
      start += COMMENTS_PER_TIME;
    }
    fewComments.forEach(function (comment) {
      fragment.appendChild(renderComment(comment));
    });
    commentsList.appendChild(fragment);
  };

  var removeComments = function () {
    var tmpRange = document.createRange();

    tmpRange.selectNodeContents(commentsList);
    tmpRange.deleteContents();

    tmpRange.detach();
  };

  var renderImage = function (picture) {
    comments = picture.comments;
    image.querySelector('img').src = picture.url;
    image.querySelector('.social__caption').textContent = picture.description;
    image.querySelector('.likes-count').textContent = picture.likes;
    image.querySelector('.comments-count').textContent = picture.comments.length;
    loadMoreButton.classList.remove('hidden');
    renderCommentsList();
    loadMoreButton.addEventListener('click', renderCommentsList);
    image.querySelector('.social__comment-count').classList.add('visually-hidden');
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
