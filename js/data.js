'use strict';
(function () {
  // 1 Генерация моков
  // Рандом вниз (для таблиц, захватит 0)
  const getRandomFloor = function (number) {
    return Math.floor(Math.random() * number);
  };
  // Рандом вверх для всего остального
  const getRandomCeil = function (number) {
    return Math.ceil(Math.random() * number);
  };

  // Рандомный элемент из таблицы
  const getRandomArrayElement = function (array) {
    let number = getRandomFloor(array.length); // номер элемента
    return array[number];
  };

  // Набираем новую таблицу из рандомных элементов другой таблицы (без повторов)
  const getElementsFromArray = function (array) {
    let amount = getRandomFloor(array.length);
    let newArray = [];
    while (newArray.length !== amount) {
      let element = getRandomArrayElement(array);
      let isElementExists = newArray.some(function (value) {
        return value === element;
      });

      if (!isElementExists) {
        newArray.push(element);
      }
    }
    return newArray;
  };
  const MAP = document.querySelector(`.map`);
  const OFFER_TYPES = [`palace`, `flat`, `house`, `bungalow`];
  const OFFER_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const OFFER_FOTOS = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const OFFER_CHECKIN = [`12:00`, `13:00`, `14:00`];
  const OFFER_CHECKOUT = [`12:00`, `13:00`, `14:00`];

  // Структура объекта post
  // let post =
  //   {
  //     'author':
  //     {
  //       'avatar': 'path.html'
  //     },
  //     'offer':
  //     {
  //       'title': 'Заголовок объявления',
  //       'address': 'Какой-то адрес',
  //       'price': 'Цена',
  //       'type': 'Тип',
  //       'rooms': 'Количество комнат',
  //       'guests': 'Количество гостей',
  //       'checkin': 'Время заезда',
  //       'checkout': 'Время выезда',
  //       'features': 'Фишки',
  //       'description': 'Описание',
  //       'fotos': 'Фотографии'
  //     },
  //     'location':
  //     {
  //       'x': 'Координата X',
  //       'y': 'Координата Y'
  //     }
  //   };

  window.generateAd = function () {
    let ad = {};
    const TOP_OFFSET = 130;
    const MAX_HEIGHT = 400;
    const MAX_PRICE = 1000;
    const MAX_ROOMS = 5;
    const MAX_GUESTS = 6;

    ad.author = {};
    ad.author.avatar = `img/avatars/user0${getRandomCeil(8)}.png`;

    ad.location = {};
    ad.location.x = getRandomCeil(MAP.offsetWidth); // Тут возможно что-то не так, если окно браузера сужать/расширять то метки ползут по карте, такого быть наверное не должно
    ad.location.y = TOP_OFFSET + getRandomFloor(MAX_HEIGHT);

    ad.offer = {};
    ad.offer.title = `Random Title`;
    ad.offer.address = `${ad.location.x}, ${ad.location.y}`;
    ad.offer.price = getRandomCeil(MAX_PRICE);
    ad.offer.type = OFFER_TYPES[getRandomFloor(OFFER_TYPES.length)];
    ad.offer.rooms = getRandomCeil(MAX_ROOMS);
    ad.offer.guests = getRandomCeil(MAX_GUESTS);
    ad.offer.checkin = OFFER_CHECKIN[getRandomFloor(OFFER_CHECKIN.length)];
    ad.offer.checkout = OFFER_CHECKOUT[getRandomFloor(OFFER_CHECKOUT.length)];

    ad.offer.features = getElementsFromArray(OFFER_FEATURES);

    ad.offer.description = `Какое-то описание ${ad.offer.address} объекта`;

    ad.offer.fotos = getElementsFromArray(OFFER_FOTOS);

    return ad;
  };
})();
