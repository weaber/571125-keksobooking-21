'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const inputAddress = document.querySelector(`#address`);
  const templatePin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  const removeClassActive = function () {
    let activePin = document.querySelector(`.map__pin--active`);
    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
    }
  };

  const generatePin = function (ad) {
    let pin = templatePin.cloneNode(true);

    pin.querySelector(`img`).setAttribute(`src`, ad.author.avatar);
    pin.querySelector(`img`).setAttribute(`alt`, ad.offer.title);
    const pinOffsetX = 25;
    const pinOffsetY = 70;

    pin.setAttribute(`style`, `left: ${(ad.location.x - pinOffsetX)}px; top: ${(ad.location.y - pinOffsetY)}px;`);

    pin.addEventListener(`click`, function () {
      removeClassActive();
      pin.classList.add(`map__pin--active`);
      window.card.renderCard(ad);
    });

    pin.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter`) {
        window.card.renderCard(ad);
      }
    });

    return pin;
  };

  const mainPinFirstClickHandler = function () {
    window.map.activateMap();
    window.form.enableForm();
    mainPin.removeEventListener(`keydown`, mainPinEnterPressHandler);
    mainPin.removeEventListener(`mousedown`, mainPinFirstClickHandler);
  };

  const mainPinMoveHandler = function (evt) {
    if (evt.button === 0) {
      removeClassActive();
      window.card.removeCard();

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      const onMouseMove = function (moveEvt) {
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
        const mainPinYMin = 130 - mainPin.offsetHeight;
        const mainPinYMax = 630;

        if (mainPinnewX > 0 - mainPin.offsetWidth / 2 && mainPinnewX < map.offsetWidth - mainPin.offsetWidth / 2) {
          mainPin.style.left = `${mainPinnewX}px`;
        }
        if (mainPinNewY > mainPinYMin && mainPinNewY < mainPinYMax) {
          mainPin.style.top = `${mainPin.offsetTop - shift.y}px`;
        }
        inputAddress.value = `${mainPinnewX} ${mainPinNewY}`;
      };

      const onMouseUp = function () {
        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    }
  };

  const mainPinEnterPressHandler = function (evt) {
    if (evt.key === `Enter`) {
      window.map.activateMap();
      window.form.enableForm();
    }
    mainPin.removeEventListener(`keydown`, mainPinEnterPressHandler);
  };

  window.pin = {
    removeClassActive,
    generatePin,
    mainPinFirstClickHandler,
    mainPinMoveHandler,
    mainPinEnterPressHandler
  };
})();
