'use strict';

(function () {
  var images = new Array(25);
  images = window.generatePictures(images.length);

  var renderGallery = function (pictures) {
    var picturesList = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(window.renderThumbnail(pictures[i]));
    }
    picturesList.appendChild(fragment);
  };

  renderGallery(images);
}());
