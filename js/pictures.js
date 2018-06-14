'use strict';

(function () {

  var bigPictureSection = document.querySelector('.big-picture');

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

    return userPicture;
  };

  var renderPicturesList = function (pictures) {
    var picturesList = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderPicture(pictures[i]));
    }
    picturesList.appendChild(fragment);
  };

  var renderBigPicture = function (bigPic) {
    bigPictureSection.querySelector('.big-picture__img > img').src = bigPic.url;
    bigPictureSection.querySelector('.social__caption').textContent = bigPic.description;
    bigPictureSection.querySelector('.likes-count').textContent = bigPic.likes;
    bigPictureSection.querySelector('.comments-count').textContent = bigPic.comments.length;

    var socialComments = bigPictureSection.querySelectorAll('.social__comment');

    for (var i = 0; i < bigPic.comments.length; i++) {
      socialComments[i].querySelector('.social__picture').src = 'img/avatar-' + getRandomInteger(1, 6) + '.svg';
      socialComments[i].querySelector('.social__text').textContent = bigPic.comments[i];
    }
    bigPictureSection.classList.remove('hidden');
  };

  var usersPictures = generatePictures(25, descriptions);
  renderPicturesList(usersPictures);

  bigPictureSection.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPictureSection.querySelector('.social__loadmore').classList.add('visually-hidden');

  // при изменении значения поля #upload-file показывать форму img-upload__overlay
  // форма должназакрываться по клику на .upload-cancel или по нажатию клавиши Esc
  // при закрытии формы, дополнительно нужно сбрасывать значение поля выбора файла #upload-file
  // на пин слайдера .scale__pin добавить обработчик события mouseup, который будет изменять уровень насыщенности фильтра. Для определения уровня насыщенности, нужно рассчитать положение пина слайдера относительно всего блока и воспользоваться пропорцией, чтобы понять, какой уровень эффекта нужно применить.
  // при переключении фильтра, уровень эффекта должен сразу cбрасываться до начального состояния
  // нажатие на preview фотографии приводит к открытию большой фотографии

  var uploadFileInput = document.querySelector('#upload-file');
  var uploadedImageEdit = document.querySelector('.img-upload__overlay');

  uploadFileInput.addEventListener('change', function () {
    uploadedImageEdit.classList.remove('hidden');
  });
}());
