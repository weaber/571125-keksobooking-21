'use strict';
(function () {
  const GET_URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const SEND_URL = `https://21.javascript.pages.academy/keksobooking`;

  const getBookingOffers = function (onSuccess, onError) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.open(`GET`, GET_URL);

    xhr.addEventListener(`load`, function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа ${xhr.status}. ${xhr.statusText}`);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.send();
  };

  const sendNewBookingOffer = function (data, onSuccess, onError) {

    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.open(`POST`, SEND_URL);

    xhr.addEventListener(`load`, function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener(`error`, function () {
      onError();
    });
    xhr.addEventListener(`timeout`, function () {
      onError();
    });
    // xhr.timeout = 10;
    xhr.send(data);
  };

  window.backend = {
    getBookingOffers,
    sendNewBookingOffer
  };

})();
