'use strict';

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

document.addEventListener("DOMContentLoaded", function () {
  var radioList = document.querySelectorAll('.poll__tab--single .poll__item');
  var radioListHabits = document.querySelectorAll('.poll__tab--multiple .poll__item');
  var pollTabList = document.querySelectorAll('.poll__tab');
  var pollHeader = document.querySelector('.poll__header');
  var pollBody = document.querySelector('.poll__body');
  var pollNumber = document.querySelector('.poll__number span');
  var submitBtn = document.querySelector('.poll__sub-btn');
  var nextBtn = document.querySelector('.poll__next-btn');
  var pollLine = document.querySelector('.result__header-line');
  var pollStatus = document.querySelector('.poll__status'); // changeTab();
  // кнопка "я готов"

  submitBtn.addEventListener('click', function () {
    submitBtn.classList.add('poll__sub-btn--active');
    pollStatus.classList.add('poll__status--active');
    setTimeout(function () {
      pollHeader.dataset.tabOrder = "".concat(+pollHeader.dataset.tabOrder + 1);
      changeTab();
      setTimeout(function () {
        pollLine.style.width = "".concat(100 / 5 * (pollHeader.dataset.tabOrder - 1), "%");
        pollHeader.style.display = 'block';
      }, 250);
    }, 1500);
  }); // квиз

  var _iterator = _createForOfIteratorHelper(radioList),
      _step;

  try {
    var _loop2 = function _loop2() {
      var radio = _step.value;

      if (+pollHeader.dataset.tabOrder == 1) {
        pollHeader.style.display = 'none';
      } // if (+pollHeader.dataset.tabOrder == 4) { }


      radio.addEventListener('click', function () {
        var _iterator5 = _createForOfIteratorHelper(radioList),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var _radio = _step5.value;

            _radio.classList.remove('poll__item_checked');

            _radio.classList.remove('poll__item_disabled');
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }

        radio.classList.add('poll__item_checked');
        setTimeout(function () {
          pollHeader.dataset.tabOrder = "".concat(+pollHeader.dataset.tabOrder + 1);
          changeTab();
          pollLine.style.width = "".concat(100 / 5 * (pollHeader.dataset.tabOrder - 1), "%");

          if (+pollHeader.dataset.tabOrder > pollTabList.length) {
            showResult();
          }
        }, 750);
      });
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop2();
    } // мультивыбор

  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  radioListHabits.forEach(function (item) {
    item.addEventListener('click', function () {
      if (!item.classList.contains('poll__item_checked')) {
        item.classList.add('poll__item_checked');
        nextBtn.classList.remove('poll__next-btn--disabled');
        nextBtn.disabled = false;
      } else {
        item.classList.remove('poll__item_checked');

        var _iterator2 = _createForOfIteratorHelper(radioListHabits),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var itemHabit = _step2.value;

            if (itemHabit.classList.contains('poll__item_checked')) {
              nextBtn.classList.remove('poll__next-btn--disabled');
              nextBtn.disabled = false;
              break;
            } else {
              nextBtn.classList.add('poll__next-btn--disabled');
              nextBtn.disabled = true;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        ;
      }
    });
  });
  nextBtn.addEventListener('click', function () {
    setTimeout(function () {
      pollHeader.dataset.tabOrder = "".concat(+pollHeader.dataset.tabOrder + 1);
      changeTab();
      pollLine.style.width = "".concat(100 / 5 * (pollHeader.dataset.tabOrder - 1), "%");
    }, 250);
  }); // end мультивыбор

  function changeTab() {
    var _iterator3 = _createForOfIteratorHelper(pollTabList),
        _step3;

    try {
      var _loop = function _loop() {
        var pollTab = _step3.value;

        if (+pollTab.dataset.tab !== +pollHeader.dataset.tabOrder) {
          pollTab.classList.add('poll__tab_hidden');
          setTimeout(function () {
            pollTab.style.display = 'none';
          }, 250);
        } else {
          pollTab.classList.remove('poll__tab_hidden');
          setTimeout(function () {
            pollTab.style.display = 'block';
          }, 250);
        }
      };

      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    pollNumber.innerHTML = pollHeader.dataset.tabOrder - 1;
  }

  function showResult() {
    var _iterator4 = _createForOfIteratorHelper(radioList),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var radio = _step4.value;
        radio.classList.add('poll__item_disabled');
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }

    document.querySelector('.poll__wrapper').style.flexDirection = 'column';
    pollHeader.innerHTML = "\n\t\t\t<div class=\"result__checks-block\">\n\t\t\t\t<img class=\"result__check\" src=\"img/icon/icon__check-circle.svg\" alt=\"\">\n\t\t\t\t<img class=\"result__check\" src=\"img/icon/icon__check-circle.svg\" alt=\"\">\n\t\t\t\t<img class=\"result__check\" src=\"img/icon/icon__check-circle.svg\" alt=\"\">\n\t\t\t</div>\n\t\t\t<p class=\"poll__bottom-text\">\n\t\t\t\t\u0421\u0435\u043A\u0443\u043D\u0434\u043E\u0447\u043A\u0443... \u041C\u044B \u0430\u043D\u0430\u043B\u0438\u0437\u0438\u0440\u0443\u0435\u043C \u0442\u0432\u043E\u0438 \u043E\u0442\u0432\u0435\u0442\u044B \u0438 \u0433\u043E\u0442\u043E\u0432\u0438\u043C \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0445\u0435\u043C\u044B \u043F\u043E \u0437\u0430\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u0432 \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442\u0435\n\t\t\t</p>\n\t\t";
    pollBody.innerHTML = "\n\t\t\t<div class=\"poll__tab poll__tab--small\">\n\t\t\t\t<h2 class=\"poll__heading\">\n\t\t\t\t\t\u041F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0430 \u0441\u0445\u0435\u043C \u0437\u0430\u0440\u0430\u0431\u043E\u0442\u043A\u0430, \u0441\u043E\u0433\u043B\u0430\u0441\u043D\u043E \u0432\u0430\u0448\u0438\u043C \u043D\u0430\u0432\u044B\u043A\u0430\u043C\n\t\t\t\t</h2>\n\t\t\t\t<div class=\"result__item-list\">\n\t\t\t\t\t<div class=\"result__item\">\n\t\t\t\t\t\t<div class=\"result__line-container\">\n\t\t\t\t\t\t\t<div class=\"result__line result__line--animated\"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"result__content\">\n\t\t\t\t\t\t\t<div class=\"result__text\">\n\t\t\t\t\t\t\t\t\u0410\u043D\u0430\u043B\u0438\u0437 \u043E\u0442\u0432\u0435\u0442\u043E\u0432\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<span class=\"result__percent\"> <span></span>% </span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"result__item\">\n\t\t\t\t\t\t<div class=\"result__line-container\">\n\t\t\t\t\t\t\t<div class=\"result__line result__line--animated\"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"result__content\">\n\t\t\t\t\t\t\t<div class=\"result__text\">\n\t\t\t\t\t\t\t\t\u041F\u043E\u0434\u0431\u043E\u0440 \u0441\u0445\u0435\u043C\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<span class=\"result__percent\"> <span></span>% </span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"result__item\">\n\t\t\t\t\t\t<div class=\"result__line-container\">\n\t\t\t\t\t\t\t<div class=\"result__line result__line--animated\"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"result__content\">\n\t\t\t\t\t\t\t<div class=\"result__text\">\n\t\t\t\t\t\t\t\t\u0421\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043F\u043B\u0430\u043D\u0430 \u0437\u0430\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u0432 \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442\u0435\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<span class=\"result__percent\"> <span></span>% </span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t";
    var resItem = document.querySelectorAll('.result__item');
    var resCheks = document.querySelectorAll('.result__check');

    function number(value) {
      return Math.floor(+value.replace('px', ''));
    }

    resItem.forEach(function (item, index) {
      var percent = item.querySelector('.result__percent span'),
          fullLine = item.querySelector('.result__line-container'),
          line = item.querySelector('.result__line');
      var writePercent = setInterval(function () {
        var lineStyle = getComputedStyle(line).width,
            fullLineStyle = getComputedStyle(fullLine).width;
        var result = Math.floor(number(lineStyle) / number(fullLineStyle) * 100);
        percent.innerHTML = result;

        if (result == 100) {
          clearInterval(writePercent);
          resCheks[index].style.display = 'inline-block';
          resCheks[index].style.animationName = 'checkmarks';
        }
      }, 10);
    });
    setTimeout(function () {
      window.location.href = 'landing.html';
    }, 8500);
  }
});