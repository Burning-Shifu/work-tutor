"use strict"; // активация кнопки тарифов по чекбоксам

function redirectToLk() {
  var sendBtn = document.querySelector('.hero-land__btn'),
      checkboxes = document.querySelectorAll('.hero-land__checkboxes input[type="checkbox"]');
  var checkboxCounter = 0;
  checkboxes.forEach(function (item) {
    item.addEventListener('click', function () {
      if (item.checked) {
        checkboxCounter += 1;
      } else {
        checkboxCounter -= 1;
      }

      if (checkboxCounter !== checkboxes.length) {
        sendBtn.classList.add('disabled');
      } else {
        sendBtn.classList.remove('disabled');
      }
    });
  });
  sendBtn.addEventListener('click', function (e) {
    if (checkboxCounter !== checkboxes.length) {
      e.preventDefault();
    }
  });
}

redirectToLk(); // end btn
// линии результатов профессий

var resultItem = document.querySelectorAll('.result__item');
resultItem.forEach(function (item) {
  var num = item.querySelector('.result__num'),
      line = item.querySelector('.result__line');
  line.style.width = "".concat(10 * num.textContent, "%");
}); // end линии результатов профессий
// slider

window.addEventListener('DOMContentLoaded', function () {
  $('.reviews__slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [{
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: false // dots: true

      }
    }, {
      breakpoint: 768,
      settings: {
        // dots: true,
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  });
}); // end slider

function today() {
  var date = new Date(),
      day = date.getDate(),
      month = date.getMonth() - 1,
      // monthsArr = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря" ],
  dYear = date.getFullYear();
  if (day < 10) day = '0' + day;
  if (month < 10) month = '0' + month;
  var span = document.querySelectorAll('.date-today');
  span.forEach(function (item) {
    item.textContent = "".concat(day, ".").concat(month, ".").concat(dYear);
  });
}

today(); // timer

var endDate = 10 * 60 * 1000;
/* 10 минут */

var firstVisit = Date.now();

function getTimeRemaining() {
  var now = Date.now(),
      t = firstVisit + endDate - now,
      hours = Math.floor(t / (1000 * 60 * 60)),
      mins = Math.floor(t / 1000 / 60 % 60),
      secs = Math.floor(t / 1000 % 60);
  return {
    'total': t,
    // 'days': days,
    'hours': hours,
    'mins': mins,
    'secs': secs
  };
}

function getZero(num) {
  if (num >= 0 && num < 10) {
    return "0".concat(num);
  } else {
    return num;
  }
}

function setTimeRemaining() {
  var hours = document.querySelector('#hours'),
      mins = document.querySelector('#minutes'),
      secs = document.querySelector('#seconds'),
      timeInterval = setInterval(updTimer, 1000);
  updTimer();

  function updTimer() {
    var t = getTimeRemaining();
    hours.textContent = getZero(t.hours);
    mins.textContent = getZero(t.mins);
    secs.textContent = getZero(t.secs);

    if (t.total <= 0) {
      clearInterval(timeInterval);
      hours.textContent = 0;
      mins.textContent = 0;
      secs.textContent = 0;
    }
  }
}

setTimeRemaining(); // end timer
// аккордион

new Accordion(document.querySelector(".accordion-faq"));