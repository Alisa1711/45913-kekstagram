'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var template = document.querySelector('#picture');

  window.utils = {

    getRandomInteger: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },

    getRandomItem: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },

    removeExtraSpaces: function (str) {
      return str.replace(/[\s{2,}]+/g, ' ').trim();
    },

    getUniqueItems: function (arr) {
      var obj = {};
      arr.forEach(function (item) {
        obj[item] = true;
      });
      return Object.keys(obj);
    },

    checkMatchingItems: function (arr) {
      return arr.length - this.getUniqueItems(arr).length;
    },

    groupArray: function (arr1, groupSize) {
      var arr2 = [];
      for (var i = 0; i < arr1.length; i += groupSize) {
        arr2.push(arr1.slice(i, i + groupSize));
      }
      return arr2;
    },

    isEscPressed: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    cloneTemplate: function (className) {
      return template.content.querySelector(className).cloneNode(true);
    }

  };

}());
