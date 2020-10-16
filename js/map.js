'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);
  const address = adForm.querySelector(`#address`);
  const mainPin = document.querySelector(`.map__pin--main`);

  const renderPin = function (data) {
    // Генерация кнопок
    let mapPinsElement = document.querySelector(`.map__pins`); // Сюда будем добавлять фрагмент составленный из #pin
    let pinsFragment = document.createDocumentFragment(); // Создал фрагмент

    for (let i = 0; i < data.length; i++) {
      pinsFragment.appendChild(window.generatePin(data[i]));
    }
    mapPinsElement.appendChild(pinsFragment);
  };

  const successHandler = function (adCollection) {
    renderPin(adCollection);
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

  window.makeMapActive = function () {
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    const bodyRect = document.body.getBoundingClientRect();
    const mainPinRect = mainPin.getBoundingClientRect();
    // или вообще тут правда размеры метки взять с размеров элементов разметки и отсупы вычислить?
    const mainPinOffsetX = 32;
    const mainPinOffsetY = 44;
    window.enableForm();
    address.value = `${mainPinRect.x - bodyRect.x + mainPinOffsetX} ${mainPinRect.y - bodyRect.y + mainPinOffsetY}`;
    window.backend.getBookingOffers(successHandler, errorHandler);
  };
})();
