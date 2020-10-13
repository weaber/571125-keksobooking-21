'use strict';

(function () {
  const successHandler = function (adCollection) {
    // Генерация кнопок
    let mapPinsElement = document.querySelector(`.map__pins`); // Сюда будем добавлять фрагмент составленный из #pin
    let pinsFragment = document.createDocumentFragment(); // Создал фрагмент

    for (let i = 0; i < adCollection.length; i++) {
      pinsFragment.appendChild(window.generatePin(adCollection[i]));
    }
    mapPinsElement.appendChild(pinsFragment);

    // Генерация карточки объявления
    let newCard = window.generateCard(adCollection[0]);
    let cardBlockElement = document.querySelector(`.map`);
    let beforeBlock = cardBlockElement.querySelector(`.map__filters-container`);
    cardBlockElement.insertBefore(newCard, beforeBlock);
  };

  const errorHandler = function (errorMessage) {
    const errorContainerElement = document.createElement(`div`);
    errorContainerElement.style = `
    z-index: 100;
    margin: 0 auto;
    text-align: center;
    background-color: red;
    position: absolute;
    left: 0;
    right: 0;
    font-size: 30px;
    `;

    errorContainerElement.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, errorContainerElement);
  };

  window.backend.getBookingOffers(successHandler, errorHandler);
})();
