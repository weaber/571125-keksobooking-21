'use strict';

(function () {
  const mainPin = document.querySelector(`.map__pin--main`);

  window.map.deactivateMap();
  window.map.disableMapFilters();
  window.form.disableForm();

  mainPin.addEventListener(`mousedown`, window.pin.mainPinMoveHandler);
  mainPin.addEventListener(`keydown`, window.pin.mainPinEnterPressHandler);
})();
