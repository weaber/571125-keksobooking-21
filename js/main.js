'use strict';

(function () {
  const mainPin = document.querySelector(`.map__pin--main`);
  const map = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);
  const inputAddress = adForm.querySelector(`#address`);

  window.map.deactivateMap();
  window.form.disableForm();
  mainPin.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      window.map.activateMap();
      window.form.enableForm();

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      let dragged = false;

      const onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        dragged = true;
        let shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        let mainPinnewX = mainPin.offsetLeft - shift.x;
        let mainPinNewY = mainPin.offsetTop - shift.y;
        const mainPinYMin = 130;
        const mainPinYMax = 630;

        if (mainPinnewX > 0 - mainPin.offsetWidth / 2 && mainPinnewX < map.offsetWidth - mainPin.offsetWidth / 2) {
          mainPin.style.left = `${mainPinnewX}px`;
        }
        if (mainPinNewY > mainPinYMin && mainPinNewY < mainPinYMax) {
          mainPin.style.top = `${mainPin.offsetTop - shift.y}px`;
        }
        inputAddress.value = `${mainPinnewX} ${mainPinNewY}`;
      };

      const onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);

        if (dragged) {
          let onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            mainPin.removeEventListener(`click`, onClickPreventDefault);
          };
          mainPin.addEventListener(`click`, onClickPreventDefault);
        }
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    }
  });

  mainPin.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      window.map.activateMap();
      window.form.enableForm();
    }
  });

})();
