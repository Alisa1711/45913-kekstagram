'use strict';

(function () {
  var NEW_IMAGES_NUMBER = 10;
  var picturesList = document.querySelector('.pictures');
  var imagesFilters = document.querySelector('.img-filters');
  var filtersForm = imagesFilters.querySelector('.img-filters__form');
  var activeClass = 'img-filters__button--active';
  var filtersMap;

  var onLoad = function (pictures) {
    renderThumbnails(pictures);
    imagesFilters.classList.remove('img-filters--inactive');
    filtersForm.addEventListener('click', onfiltersFormClick);
    filtersMap = {
      'filter-popular': pictures,
      'filter-new': window.utils.getRandomArray(pictures, NEW_IMAGES_NUMBER),
      'filter-discussed': sortByComments(pictures)
    };
  };

  var renderThumbnails = function (pictures) {
    var fragment = document.createDocumentFragment();

    pictures.forEach(function (picture) {
      fragment.appendChild(window.renderThumbnail(picture));
    });
    picturesList.appendChild(fragment);
  };

  var sortByComments = function (arr) {
    var arr2 = arr.slice();
    arr2.sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });
    return arr2;
  };

  var removeThumbnails = function () {
    var tmpRange = document.createRange();
    var imgUpload = picturesList.querySelector('.img-upload');

    tmpRange.selectNodeContents(picturesList);
    tmpRange.setStartAfter(imgUpload);
    tmpRange.deleteContents();

    tmpRange.detach();
  };

  var onfiltersFormClick = function (evt) {
    if (evt.target.tagName === 'BUTTON') {
      filtersForm.querySelector('.' + activeClass)
        .classList.remove(activeClass);
      evt.target.classList.add(activeClass);
      updateGallery(filtersMap[evt.target.id]);
    }
  };

  var updateGallery = function (filter) {
    window.utils.debounce(function () {
      removeThumbnails();
      renderThumbnails(filter);
    });
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

  window.backend.download(onLoad, onError);

}());
