'use strict';

(function () {

  var MIN_LIKES = 15;
  var MAX_LIKES = 200;

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

  var generateComments = function (amount) {
    var pictureComments = [];

    for (var i = 0; i < amount; i++) {
      pictureComments.push(window.utils.getRandomItem(comments));
    }
    return pictureComments;
  };

  window.generatePictures = function (amount) {
    var picturesArray = [];

    for (var i = 1; i <= amount; i++) {
      var commentsAmount = window.utils.getRandomInteger(1, 2);
      picturesArray.push({
        url: 'photos/' + i + '.jpg',
        likes: window.utils.getRandomInteger(MIN_LIKES, MAX_LIKES),
        comments: generateComments(commentsAmount),
        description: window.utils.getRandomItem(descriptions)
      });
    }
    return picturesArray;
  };

}());
