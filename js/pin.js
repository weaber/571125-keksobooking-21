'use strict';

(function () {
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

  window.pin = {
    removeClassActive,
    generatePin

  };
})();
