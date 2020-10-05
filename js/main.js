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
  post.author.avatar = `img/avatars/user0${getRandomCeil(8)}.png`;

  post.location = {};
  post.location.x = getRandomCeil(map.offsetWidth); // Тут возможно что-то не так, если окно браузера сужать/расширять то метки ползут по карте, такого быть наверное не должно
  post.location.y = TOP_OFFSET + getRandomFloor(MAX_HEIGHT);

  post.offer = {};
  post.offer.title = 'Random Title';
  post.offer.address = `${post.location.x}, ${post.location.y}`;
  post.offer.price = getRandomCeil(MAX_PRICE);
  post.offer.type = OFFER_TYPES[getRandomFloor(OFFER_TYPES.length)];
  post.offer.rooms = getRandomCeil(MAX_ROOMS);
  post.offer.guests = getRandomCeil(MAX_GUESTS);
  post.offer.checkin = OFFER_CHECKIN[getRandomFloor(OFFER_CHECKIN.length)];
  post.offer.checkout = OFFER_CHECKOUT[getRandomFloor(OFFER_CHECKOUT.length)];

  post.offer.features = getElementsFromArray(OFFER_FEATURES);

  post.offer.description = `Какое-то описание ${post.offer.address} объекта`;

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

// map.classList.remove('map--faded'); убрал активацию карты

// 3 Ищу шаблон булавки
let templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
// console.log(templatePin);
// Заполняю шаблон pin
let generatePin = function (post) {
  let pin = templatePin.cloneNode(true);

  pin.querySelector('img').setAttribute('src', post.author.avatar);
  pin.querySelector('img').setAttribute('alt', post.offer.title);
  const pinOffsetX = 25;
  const pinOffsetY = 70;

  pin.setAttribute('style', 'left: ' + (post.location.x - pinOffsetX) + 'px; top: ' + (post.location.y - pinOffsetY) + 'px;');
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
  const cardTypesMap = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  cardTitle.textContent = post.offer.title;
  cardAddress.textContent = post.offer.address;
  cardPrice.textContent = `${post.offer.price}₽/ночь`;
  cardType.textContent = cardTypesMap[post.offer.type];

  cardCapacity.textContent = `${post.offer.rooms} комнаты для ${post.offer.guests} гостей`;
  cardTime.textContent = `Заезд после ${post.offer.checkin}, выезд до ${post.offer.checkout}`;
  cardDescription.textContent = post.offer.description;
  cardAvatar.setAttribute('src', post.author.avatar);


  // FEATURES - решаю задачу в лоб, ищу контейнер ul, очищаю и создаю новые li записывая им нужные классы.
  let cardFeatures = card.querySelector('.popup__features'); // это ul

  // Очищаю список
  cardFeatures.innerHTML = ``;

  // Создаю li на основе данных postBox'а и заполняю ими список
  for (let i = 0; i < post.offer.features.length; i++) {
    let newFeature = document.createElement('li');
    newFeature.classList.add(`popup__feature`, `popup__feature--${post.offer.features[i]}`);
    cardFeatures.appendChild(newFeature);
  }

  // PHOTOS - решаю также в лоб как и с блоком features
  let cardPhotos = card.querySelector('.popup__photos'); // это div сюда будем пушить фотки
  let photo = cardPhotos.querySelector('img'); // это img, я его беру как шаблон

  cardPhotos.innerHTML = ``;

  // Заполняю создаю img и заполняю ими div

  for (let i = 0; i < post.offer.fotos.length; i++) {
    let newPhoto = photo.cloneNode(true);
    newPhoto.setAttribute('src', post.offer.fotos[i]);
    cardPhotos.appendChild(newPhoto);
  }

  // for (let i = 0; i < post.offer.fotos.length; i++) {
  //   let newPhoto = document.createElement('img');
  //   newPhoto.classList.add('popup__photo');
  //   newPhoto.setAttribute('width', NEW_PHOTO_WIDTH);
  //   newPhoto.setAttribute('height', NEW_PHOTO_HEIGHT);
  //   newPhoto.setAttribute('alt', 'Фотография жилья');
  //   newPhoto.setAttribute('src', post.offer.fotos[i]);

  //   cardPhotos.appendChild(newPhoto);
  // }

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

// Деактивация формы
const adForm = document.querySelector('.ad-form');
const fieldsets = adForm.querySelectorAll('fieldset');

for (let fieldset of fieldsets) {
  fieldset.disabled = true;
}

// Активация формы
const mainPin = document.querySelector('.map__pin--main');
const address = adForm.querySelector('#address');

const makeMapActive = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  const bodyRect = document.body.getBoundingClientRect();
  const mainPinRect = mainPin.getBoundingClientRect();
  // или вообще тут правда размеры метки взять с размеров элементов разметки и отсупы вычислить?
  const mainPinOffsetX = 32;
  const mainPinOffsetY = 44;
  for (let fieldset of fieldsets) {
    fieldset.disabled = false;
  }
  address.value = `${mainPinRect.x - bodyRect.x + mainPinOffsetX} ${mainPinRect.y - bodyRect.y + mainPinOffsetY}`;
};

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    makeMapActive();
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    makeMapActive();
  }
});

// Валидация формы
let inputTitle = adForm.querySelector('#title');
let inputRooms = adForm.querySelector('#room_number');
let inputCapacity = adForm.querySelector('#capacity');
let inputPrice = adForm.querySelector('#price');

inputTitle.addEventListener('input', function () {
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  let titleLength = inputTitle.value.length;

  if (titleLength < MIN_TITLE_LENGTH) {
    inputTitle.setCustomValidity('Заголовок должен быть от 30 символов');
  } else if (titleLength > MAX_TITLE_LENGTH) {
    inputTitle.setCustomValidity('Заголовок должен быть до 100 символов');
  } else {
    inputTitle.setCustomValidity('');
  }
});

// console.log(inputRooms);
// console.log(inputRooms.options[inputRooms.selectedIndex]);
// console.log(inputRooms.options[inputRooms.selectedIndex].value);
// console.log(inputRooms.value);
// console.log(inputCapacity);
// console.log(inputCapacity.value);

// JavaScript'ом привожу форму в норм состояние
if (inputRooms.value === '1') {
  inputCapacity.options[0].disabled = true;
  inputCapacity.options[1].disabled = true;
  inputCapacity.options[2].selected = true;
  inputCapacity.options[3].disabled = true;
}

// А тут уже фильтрую варианты
inputRooms.addEventListener('input', function () {
  if (inputRooms.value === '1') {
    inputCapacity.options[0].disabled = true;
    inputCapacity.options[1].disabled = true;
    inputCapacity.options[2].disabled = false;
    inputCapacity.options[2].selected = true;
    inputCapacity.options[3].disabled = true;
  }

  if (inputRooms.value === '2') {
    inputCapacity.options[0].disabled = true;
    inputCapacity.options[1].disabled = false;
    inputCapacity.options[2].disabled = false;
    inputCapacity.options[2].selected = true;
    inputCapacity.options[3].disabled = true;
  }

  if (inputRooms.value === '3') {
    inputCapacity.options[0].disabled = false;
    inputCapacity.options[1].disabled = false;
    inputCapacity.options[2].disabled = false;
    inputCapacity.options[2].selected = true;
    inputCapacity.options[3].disabled = true;
  }

  if (inputRooms.value === '100') {
    inputCapacity.options[0].disabled = true;
    inputCapacity.options[1].disabled = true;
    inputCapacity.options[2].disabled = true;
    inputCapacity.options[3].disabled = false;
    inputCapacity.options[3].selected = true;
  }
});

inputPrice.addEventListener('input', function () {
  if (inputPrice.value.length === 0) {
    inputPrice.setCustomValidity('Укажите цену');
    return false;
  }

  if (inputPrice.value > 1000000) {
    inputPrice.setCustomValidity('Цена должна быть меньше 1.000.000');
    return false;
  }
  return inputPrice.setCustomValidity('');
});

// adForm.addEventListener('submit', function (evt) {

// });

// devElement координаты клика по карте проверяю
// document.addEventListener('click', function (evt) {
//   console.log(evt.pageX);
//   console.log(evt.pageY);
// });
