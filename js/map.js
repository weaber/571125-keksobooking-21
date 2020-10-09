'use strict';

(function () {
  // Генерирую объект с данными объявлений
  const MOCK_COUNT = 8; // Количество объявлений
  const adCollection = [];
  for (let i = 0; i < MOCK_COUNT; i++) {
    adCollection.push(window.generateAd());
  }

  // 4 Добавляем DocumentFragment в DOM
  let mapPins = document.querySelector(`.map__pins`); // Сюда будем добавлять фрагмент составленный из #pin
  let pinsFragment = document.createDocumentFragment(); // Создал фрагмент

  for (let i = 0; i < MOCK_COUNT; i++) {
    pinsFragment.appendChild(window.generatePin(adCollection[i]));
  }

  mapPins.appendChild(pinsFragment);

  // Генерирую карточку
  let newCard = window.generateCard(adCollection[0]);

  // Сюда будем добавлять новую карточку
  let cardBlock = document.querySelector(`.map`);
  // Ищем элемент, перед которым вставлять карточку объявления
  let beforeBlock = cardBlock.querySelector(`.map__filters-container`);

  cardBlock.insertBefore(newCard, beforeBlock);
})();
