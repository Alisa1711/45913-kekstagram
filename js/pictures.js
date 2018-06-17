'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var usersPictures = new Array(25);
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

  var comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var descriptions = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  var getRandomInteger = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  };

  var getRandomItem = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var generateComments = function (amount) {
    var pictureComments = [];

    for (var i = 0; i < amount; i++) {
      pictureComments.push(getRandomItem(comments));
    }
    return pictureComments;
  };

  var generatePictures = function (amount, descr) {
    var pictures = [];
    var minLikes = 15;
    var maxLikes = 200;
    var commentsAmount;

    for (var i = 1; i <= amount; i++) {
      commentsAmount = getRandomInteger(1, 2);
      pictures.push({
        url: 'photos/' + i + '.jpg',
        likes: getRandomInteger(minLikes, maxLikes),
        comments: generateComments(commentsAmount),
        description: getRandomItem(descr)
      });
    }
    return pictures;
  };

  var renderPicture = function (picture) {
    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
    var userPicture = pictureTemplate.cloneNode(true);

    userPicture.querySelector('.picture__img').src = picture.url;
    userPicture.querySelector('.picture__stat--likes').textContent = picture.likes;
    userPicture.querySelector('.picture__stat--comments').textContent = picture.comments.length;

    userPicture.addEventListener('click', function () {
      renderBigPicture(picture);
      openbigPicture();
    });

    return userPicture;
  };

  var renderBigPicture = function (bigPic) {
    bigPicture.querySelector('.big-picture__img > img').src = bigPic.url;
    bigPicture.querySelector('.social__caption').textContent = bigPic.description;
    bigPicture.querySelector('.likes-count').textContent = bigPic.likes;
    bigPicture.querySelector('.comments-count').textContent = bigPic.comments.length;

    var socialComments = bigPicture.querySelectorAll('.social__comment');

    for (var i = 0; i < bigPic.comments.length; i++) {
      socialComments[i].querySelector('.social__picture').src = 'img/avatar-' + getRandomInteger(1, 6) + '.svg';
      socialComments[i].querySelector('.social__text').textContent = bigPic.comments[i];
    }

    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');
  };

  var renderPicturesList = function (pictures) {
    var picturesList = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderPicture(pictures[i]));
    }
    picturesList.appendChild(fragment);
  };

  var openbigPicture = function () {
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onBigPicturePressEsc);
  };

  var closePicture = function () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPicturePressEsc);
  };

  var onBigPicturePressEsc = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePicture();
    }
  };

  usersPictures = generatePictures(usersPictures.length, descriptions);
  renderPicturesList(usersPictures);

  bigPictureCancel.addEventListener('click', function () {
    closePicture(bigPicture);
  });
}());
