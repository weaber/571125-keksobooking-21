'use strict';

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
const offerTypes = ['palace', 'flat', 'house', 'bungalow'];
const offerFeatures = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
const offerFotos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
const offerCheckin = ['12:00', '13:00', '14:00'];
const offerCheckout = ['12:00', '13:00', '14:00'];
let map = document.querySelector('.map');

const generatePost = function () {
  let post = {};
  post.author = {};
  post.author.avatar = 'img/avatars/user0' + getRandomCeil(8) + '.png';

  post.location = {};
  post.location.x = getRandomCeil(map.offsetWidth); // Тут явно что-то не так, если окно браузера сужать/расширять то метки ползут по карте, такого быть наверное не должно!
  post.location.y = 130 + getRandomFloor(400);

  post.offer = {};
  post.offer.title = 'Random Title';
  post.offer.address = post.location.x + ', ' + post.location.y;
  post.offer.price = getRandomCeil(1000);
  post.offer.type = offerTypes[getRandomFloor(offerTypes.length)];
  post.offer.rooms = getRandomCeil(5);
  post.offer.guests = getRandomCeil(6);
  post.offer.checkin = offerCheckin[getRandomFloor(offerCheckin.length)];
  post.offer.checkout = offerCheckout[getRandomFloor(offerCheckout.length)];

  post.offer.features = getElementsFromArray(offerFeatures);

  post.offer.description = 'Описание объекта';

  post.offer.fotos = getElementsFromArray(offerFotos);

  return post;
};

let postBox = [];

for (let i = 0; i < 8; i++) {
  postBox.push(generatePost());
}

// console.log(postBox);

// 2 Делаем активной карту

map.classList.remove('map--faded');

// 3 Ищу шаблон

let templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
//  console.log(templatePin);
let generatePin = function (post) {
  let pin = templatePin.cloneNode(true);

  pin.querySelector('img').setAttribute('src', post.author.avatar);
  pin.querySelector('img').setAttribute('alt', post.offer.title);
  pin.setAttribute('style', 'left: ' + (post.location.x - 25) + 'px; top: ' + (post.location.y - 70) + 'px;');
  //  style="left: {{location.x + смещение по X}}px; top: {{location.y + смещение по Y}}px;"  map__pin 50 на 70, значит смещение -25 по Х и -70 по Y
  return pin;
};
// 4 Добавляем DocumentFragment в DOM
let similarPinElement = document.querySelector('.map__pins'); // Сюда будем добавлять фрагмент составленный из #pin
let fragment = document.createDocumentFragment();

for (let i = 0; i < 8; i++) {
  fragment.appendChild(generatePin(postBox[i]));
}

similarPinElement.appendChild(fragment);
// console.log(similarPinElement);

// На будущее мне кажется пригодится
// let templateCard = document.querySelector('#card')
//     .content
//     .querySelector('.map__card');
