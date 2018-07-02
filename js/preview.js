'use strict';

(function () {
  var MIN_AVATAR_NUMBER = 1;
  var MAX_AVATAR_NUMBER = 6;
  var COMMENTS_PER_TIME = 5;
  var counter = 0;
  var commentsNumber = 0;
  var pictureComments;
  var image = document.querySelector('.big-picture');
  var imageCloseButton = image.querySelector('.big-picture__cancel');
  var commentsList = image.querySelector('.social__comments');
  var loadMoreButton = image.querySelector('.social__loadmore');

  var getAvatarPath = function () {
    return 'img/avatar-' + window.utils.getRandomInteger(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg';
  };

  var renderComment = function (commentText) {
    var comment = window.utils.cloneTemplate('.social__comment');

    comment.querySelector('.social__picture').src = getAvatarPath();
    comment.querySelector('.social__text').textContent = commentText;

    return comment;
  };

  var renderCommentsList = function (comments) {
    var fragment = document.createDocumentFragment();

    comments[counter++].forEach(function (comment) {
      fragment.appendChild(renderComment(comment));
      commentsNumber++;
    });
    commentsList.appendChild(fragment);

    if (comments.length === counter) {
      counter = 0;
      loadMoreButton.classList.add('hidden');
      loadMoreButton.removeEventListener('click', onLoadMoreButtonClick);
    }

    image.querySelector('.counter').textContent = commentsNumber;
  };

  var removeComments = function () {
    var tmpRange = document.createRange();

    tmpRange.selectNodeContents(commentsList);
    tmpRange.deleteContents();

    tmpRange.detach();
  };

  var renderImage = function (picture) {
    pictureComments = window.utils.groupArray(picture.comments, COMMENTS_PER_TIME);
    image.querySelector('img').src = picture.url;
    image.querySelector('.social__caption').textContent = picture.description;
    image.querySelector('.likes-count').textContent = picture.likes;
    image.querySelector('.comments-count').textContent = picture.comments.length;
    loadMoreButton.classList.remove('hidden');
    renderCommentsList(pictureComments);
  };

  var onLoadMoreButtonClick = function () {
    renderCommentsList(pictureComments);
  };

  var closeImage = function () {
    counter = 0;
    commentsNumber = 0;
    image.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onImagePressEsc);
    imageCloseButton.removeEventListener('click', closeImage);
    loadMoreButton.removeEventListener('click', onLoadMoreButtonClick);
    removeComments();
  };

  var onImagePressEsc = function (evt) {
    window.utils.isEscPressed(evt, closeImage);
  };

  window.openImage = function (picture) {
    renderImage(picture);
    image.classList.remove('hidden');
    document.body.classList.add('modal-open');
    loadMoreButton.addEventListener('click', onLoadMoreButtonClick);
    document.addEventListener('keydown', onImagePressEsc);
    imageCloseButton.addEventListener('click', closeImage);
  };

}());
