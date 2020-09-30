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
const OFFER_TYPES = ['palace', 'flat', 'house', 'bungalow'];
const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const OFFER_FOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
const OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
let map = document.querySelector('.map');

const generatePost = function () {
  let post = {};
  const TOP_OFFSET = 130;
  const MAX_HEIGHT = 400;
  const MAX_PRICE = 1000;
  const MAX_ROOMS = 5;
  const MAX_GUESTS = 6;

  post.author = {};
  post.author.avatar = 'img/avatars/user0' + getRandomCeil(8) + '.png';

  post.location = {};
  post.location.x = getRandomCeil(map.offsetWidth); // Тут возможно что-то не так, если окно браузера сужать/расширять то метки ползут по карте, такого быть наверное не должно
  post.location.y = TOP_OFFSET + getRandomFloor(MAX_HEIGHT);

  post.offer = {};
  post.offer.title = 'Random Title';
  post.offer.address = post.location.x + ', ' + post.location.y;
  post.offer.price = getRandomCeil(MAX_PRICE);
  post.offer.type = OFFER_TYPES[getRandomFloor(OFFER_TYPES.length)];
  post.offer.rooms = getRandomCeil(MAX_ROOMS);
  post.offer.guests = getRandomCeil(MAX_GUESTS);
  post.offer.checkin = OFFER_CHECKIN[getRandomFloor(OFFER_CHECKIN.length)];
  post.offer.checkout = OFFER_CHECKOUT[getRandomFloor(OFFER_CHECKOUT.length)];

  post.offer.features = getElementsFromArray(OFFER_FEATURES);

  post.offer.description = 'Какое-то описание объекта';

  post.offer.fotos = getElementsFromArray(OFFER_FOTOS);

  return post;
};

// Генерирую объект с данными объявлений
const MOCK_COUNT = 8; // Количество объявлений
let postBox = [];
for (let i = 0; i < MOCK_COUNT; i++) {
  postBox.push(generatePost());
}

// console.log(postBox);

// 2 Делаем активной карту

map.classList.remove('map--faded');

// 3 Ищу шаблон булавки
let templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
// console.log(templatePin);
// Заполняю шаблон pin
let generatePin = function (post) {
  let pin = templatePin.cloneNode(true);

  pin.querySelector('img').setAttribute('src', post.author.avatar);
  pin.querySelector('img').setAttribute('alt', post.offer.title);
  pin.setAttribute('style', 'left: ' + (post.location.x - 25) + 'px; top: ' + (post.location.y - 70) + 'px;');
  //  style="left: {{location.x + смещение по X}}px; top: {{location.y + смещение по Y}}px;"  map__pin 50 на 70, значит смещение -25 по Х и -70 по Y
  return pin;
};

// 4 Добавляем DocumentFragment в DOM
let mapPins = document.querySelector('.map__pins'); // Сюда будем добавлять фрагмент составленный из #pin
let pinsFragment = document.createDocumentFragment(); // Создал фрагмент

for (let i = 0; i < MOCK_COUNT; i++) {
  pinsFragment.appendChild(generatePin(postBox[i]));
}

mapPins.appendChild(pinsFragment);
// console.log(mapPins);

// module3-task2
// Ищем шаблон #card
let templateCard = document.querySelector('#card').content.querySelector('.map__card');

// Заполняем шаблон #card
let generateCard = function (post) {
  let card = templateCard.cloneNode(true);

  let cardTitle = card.querySelector('.popup__title');
  let cardAddress = card.querySelector('.popup__text--address');
  let cardPrice = card.querySelector('.popup__text--price');
  let cardType = card.querySelector('.popup__type');
  let cardCapacity = card.querySelector('.popup__text--capacity');
  let cardTime = card.querySelector('.popup__text--time');
  let cardDescription = card.querySelector('.popup__description');
  let cardAvatar = card.querySelector('.popup__avatar');

  cardTitle.textContent = post.offer.title;
  cardAddress.textContent = post.offer.address;
  cardPrice.textContent = post.offer.price + '₽/ночь';

  if (post.offer.type === 'flat') {
    cardType.textContent = 'Квартира';
  } else if (post.offer.type === 'bungalow') {
    cardType.textContent = 'Бунгало';
  } else if (post.offer.type === 'house') {
    cardType.textContent = 'Дом';
  } else if (post.offer.type === 'palace') {
    cardType.textContent = 'Дворец';
  }

  cardCapacity.textContent = post.offer.rooms + ' комнаты для ' + post.offer.guests + ' гостей';
  cardTime.textContent = 'Заезд после ' + post.offer.checkin + ', выезд до ' + post.offer.checkout;
  cardDescription.textContent = post.offer.description;
  cardAvatar.setAttribute('src', post.author.avatar);


  // FEATURES - решаю задачу в лоб, ищу контейнер ul, очищаю и создаю новые li записывая им нужные классы.
  let cardFeatures = card.querySelector('.popup__features'); // это ul
  let featuresList = cardFeatures.querySelectorAll('li'); // это элементы списка
  // Очищаю список
  for (let i = featuresList.length - 1; i >= 0; i--) {
    cardFeatures.removeChild(featuresList[i]);
  }

  // Создаю li на основе данных postBox'а и заполняю ими список
  for (let i = 0; i < post.offer.features.length; i++) {
    let newFeature = document.createElement('li');
    newFeature.classList.add('popup__feature', 'popup__feature--' + post.offer.features[i]);
    cardFeatures.appendChild(newFeature);
  }

  // PHOTOS - решаю также в лоб как и с блоком features
  let cardPhotos = card.querySelector('.popup__photos'); // это div сюда будем пушить фотки
  let photosList = cardPhotos.querySelector('img'); // это img

  cardPhotos.removeChild(photosList);


  // Заполняю создаю img и заполняю ими div
  for (let i = 0; i < post.offer.fotos.length; i++) {
    let newPhoto = document.createElement('img');
    newPhoto.classList.add('popup__photo');
    newPhoto.setAttribute('width', '45');
    newPhoto.setAttribute('height', '40');
    newPhoto.setAttribute('alt', 'Фотография жилья');
    newPhoto.setAttribute('src', post.offer.fotos[i]);

    cardPhotos.appendChild(newPhoto);
  }

  return card;
};

// Генерирую карточку
let newCard = generateCard(postBox[0]);
// Сюда будем добавлять новую карточку
let cardBlock = document.querySelector('.map');
// Ищем элемент, перед которым вставлять карточку объявления
let beforeBlock = cardBlock.querySelector('.map__filters-container');

cardBlock.insertBefore(newCard, beforeBlock);
// console.log(newCard);


