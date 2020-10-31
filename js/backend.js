'use strict';

const GET_URL = `https://21.javascript.pages.academy/keksobooking/data`;
const SEND_URL = `https://21.javascript.pages.academy/keksobooking`;
const SUCCESS_CODE = 200;

const getBookingOffers = function (onSuccess, onError) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.open(`GET`, GET_URL);

  xhr.addEventListener(`load`, function () {
    if (xhr.status === SUCCESS_CODE) {
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
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.open(`POST`, SEND_URL);

  xhr.addEventListener(`load`, function () {
    if (xhr.status === SUCCESS_CODE) {
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

  xhr.send(data);
};

window.backend = {
  getBookingOffers,
  sendNewBookingOffer
};
