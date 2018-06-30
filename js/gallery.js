'use strict';

(function () {
  var renderGallery = function (pictures) {
    var picturesList = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(window.renderThumbnail(pictures[i]));
    }
    picturesList.appendChild(fragment);
  };

  var onError = function (message) {
    var node = document.createElement('div');
    node.style.padding = '20px';
    node.style.textAlign = 'center';
    node.style.fontSize = '16px';
    node.style.textTransform = 'lowercase';
    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.download(renderGallery, onError);
}());
