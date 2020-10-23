'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const mapFilters = map.querySelector(`.map__filters`);
  const mapFiltersHousingTypeElement = mapFilters.querySelector(`#housing-type`);
  const mapFiltersHousingPriceElement = mapFilters.querySelector(`#housing-price`);
  const mapFiltersHousingRoomsElement = mapFilters.querySelector(`#housing-rooms`);
  const mapFiltersHousingGuestsElement = mapFilters.querySelector(`#housing-guests`);
  const mapFiltersHousingFeaturesElement = mapFilters.querySelector(`#housing-features`).querySelectorAll(`input`);
  const mapFiltersSelects = mapFilters.querySelectorAll(`.map__filter`);
  const mapFiltersFeatures = mapFilters.querySelector(`#housing-features`);
  const adForm = document.querySelector(`.ad-form`);
  const address = adForm.querySelector(`#address`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const mainPinStartX = 570;
  const mainPinStartY = 375;
  const MAX_PINS_AMOUNT = 5;
  let adCollection = [];

  let mapPinsElement = document.querySelector(`.map__pins`);
  let pinsFragment = document.createDocumentFragment();

  const mainPinFirstClickHandler = function () {
    window.map.activateMap();
    window.form.enableForm();
    mainPin.removeEventListener(`mousedown`, mainPinFirstClickHandler);
  };

  const renderPins = function (data) {
    const PINS_AMOUNT = (data.length <= MAX_PINS_AMOUNT) ? data.length : MAX_PINS_AMOUNT;
    for (let i = 0; i < PINS_AMOUNT; i++) {
      pinsFragment.appendChild(window.pin.generatePin(data[i]));
    }
    mapPinsElement.appendChild(pinsFragment);
  };

  const removePins = function () {
    const mapPinsContainerElement = document.querySelector(`.map__pins`);
    for (let i = mapPinsContainerElement.children.length - 1; i > 1; i--) {
      mapPinsContainerElement.children[i].remove();
    }
  };

  let filteredAds;

  const filterAds = function () {
    filteredAds = [];
    let sampleAd = {
      type: mapFiltersHousingTypeElement.value,
      price: mapFiltersHousingPriceElement.value,
      rooms: mapFiltersHousingRoomsElement.value,
      guests: mapFiltersHousingGuestsElement.value,
      features: []
    };

    for (let i = 0; i < mapFiltersHousingFeaturesElement.length; i++) {
      if (mapFiltersHousingFeaturesElement[i].checked) {
        sampleAd.features.push(mapFiltersHousingFeaturesElement[i].value);
      }
    }

    let amountOfMatches = 0;

    for (let i = 0; i < adCollection.length; i++) {
      if (sampleAd.type === `any`) {
        amountOfMatches++;
      } else if (sampleAd.type === adCollection[i].offer.type) {
        amountOfMatches++;
      }

      if (sampleAd.price === `any`) {
        amountOfMatches++;
      } else if ((sampleAd.price === `low`) && (adCollection[i].offer.price < 10000)) {
        amountOfMatches++;
      } else if ((sampleAd.price === `middle`) && (adCollection[i].offer.price >= 10000) && (adCollection[i].offer.price <= 50000)) {
        amountOfMatches++;
      } else if ((sampleAd.price === `high`) && (adCollection[i].offer.price > 50000)) {
        amountOfMatches++;
      }

      if (amountOfMatches === 2) {
        filteredAds.push(adCollection[i]);
      }
      amountOfMatches = 0;
    }
  };

  const updatePins = function () {
    removePins();
    window.card.removeCard();
    filterAds();
    renderPins(filteredAds);
  };

  const mapFiltersChangeHandler = function () {
    updatePins();
  };

  const successHandler = function (data) {
    adCollection = data;
    enableMapFilters();
    updatePins();
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
    removePins();
    window.card.removeCard();
    map.classList.add(`map--faded`);
    mainPin.style.left = `${mainPinStartX}px`;
    mainPin.style.top = `${mainPinStartY}px`;
    address.value = `${Math.round(mainPinStartX + mainPin.offsetWidth / 2)} ${Math.round(mainPinStartY + mainPin.offsetHeight / 2)}`;
    mainPin.addEventListener(`mousedown`, mainPinFirstClickHandler);
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

  mapFilters.addEventListener(`change`, mapFiltersChangeHandler);

  window.map = {
    activateMap,
    deactivateMap,
    disableMapFilters,
    enableMapFilters
  };
})();
