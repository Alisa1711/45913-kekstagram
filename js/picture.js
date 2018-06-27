'use strict';

(function () {

  window.renderThumbnail = function (picture) {
    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
    var thumbnail = pictureTemplate.cloneNode(true);

    thumbnail.querySelector('.picture__img').src = picture.url;
    thumbnail.querySelector('.picture__stat--likes').textContent = picture.likes;
    thumbnail.querySelector('.picture__stat--comments').textContent = picture.comments.length;

    thumbnail.addEventListener('click', function () {
      window.openImage(picture);
    });
    return thumbnail;
  };

}());
