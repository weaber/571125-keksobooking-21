'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const mapFilters = map.querySelector(`.map__filters`);
  const mapFiltersSelects = mapFilters.querySelectorAll(`.map__filter`);
  const mapFiltersFeatures = mapFilters.querySelector(`#housing-features`);
  const adForm = document.querySelector(`.ad-form`);
  const address = adForm.querySelector(`#address`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const mainPinStartX = 570;
  const mainPinStartY = 375;

  let mapPinsElement = document.querySelector(`.map__pins`); // Сюда будем добавлять фрагмент составленный из #pin
  let pinsFragment = document.createDocumentFragment(); // Создал фрагмент

  const renderPin = function (data) {
    for (let i = 0; i < data.length; i++) {
      pinsFragment.appendChild(window.pin.generatePin(data[i]));
    }
    mapPinsElement.appendChild(pinsFragment);
  };

  // const removePins = function () {

  // };

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

  const activateMap = function () {
    map.classList.remove(`map--faded`);
    address.value = `${Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2)} ${Math.round(mainPin.offsetTop + mainPin.offsetHeight)}`;
    window.backend.getBookingOffers(successHandler, errorHandler);
  };

  const deactivateMap = function () {
    // removePins();
    window.card.removeCard();
    map.classList.add(`map--faded`);
    mainPin.style.left = `${mainPinStartX}px`;
    mainPin.style.top = `${mainPinStartY}px`;
    address.value = `${Math.round(mainPinStartX + mainPin.offsetWidth / 2)} ${Math.round(mainPinStartY + mainPin.offsetHeight / 2)}`;
  };

  const disableMapFilters = function () {
    mapFiltersFeatures.disabled = true;
    for (let select of mapFiltersSelects) {
      select.disabled = true;
    }
  };

  const enableMapFilters = function () {
    mapFiltersFeatures.disabled = false;
    for (let select of mapFiltersSelects) {
      select.disabled = false;
    }
  };

  window.map = {
    activateMap,
    deactivateMap,
    disableMapFilters,
    enableMapFilters
  };
})();
