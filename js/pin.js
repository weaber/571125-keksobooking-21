'use strict';

(function () {
  const templatePin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  window.generatePin = function (ad) {
    let pin = templatePin.cloneNode(true);

    pin.querySelector(`img`).setAttribute(`src`, ad.author.avatar);
    pin.querySelector(`img`).setAttribute(`alt`, ad.offer.title);
    const pinOffsetX = 25;
    const pinOffsetY = 70;

    pin.setAttribute(`style`, `left: ${(ad.location.x - pinOffsetX)}px; top: ${(ad.location.y - pinOffsetY)}px;`);
    //  style="left: {{location.x + смещение по X}}px; top: {{location.y + смещение по Y}}px;"  map__pin 50 на 70, значит смещение -25 по Х и -70 по Y

    pin.addEventListener(`click`, function () {
      window.renderCard(ad);
    });

    pin.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter`) {
        window.renderCard(ad);
      }
    });

    return pin;
  };
})();
