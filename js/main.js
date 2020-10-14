'use strict';

(function () {
  window.disableForm();
  const mainPin = document.querySelector(`.map__pin--main`);

  mainPin.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      window.makeMapActive();
    }
  });

  mainPin.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      window.makeMapActive();
    }
  });

})();
