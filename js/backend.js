'use strict';

const GET_URL = `https://21.javascript.pages.academy/keksobooking/data`;
const SEND_URL = `https://21.javascript.pages.academy/keksobooking`;
const RequestTypes = {
  get: `GET`,
  post: `POST`
};
const SUCCESS_CODE = 200;

const createXhrRequest = function (requestType, url, onSuccess, onError, data) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.open(requestType, url);

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

  xhr.send(data);
};

const getBookingOffers = function (onSuccess, onError) {
  createXhrRequest(RequestTypes.get, GET_URL, onSuccess, onError, ``);
};

const sendNewBookingOffer = function (data, onSuccess, onError) {
  createXhrRequest(RequestTypes.post, SEND_URL, onSuccess, onError, data);
};

window.backend = {
  getBookingOffers,
  sendNewBookingOffer
};
