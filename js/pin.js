'use strict';

(function () {
  const templatePin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  window.generatePin = function (post) {
    let pin = templatePin.cloneNode(true);

    pin.querySelector(`img`).setAttribute(`src`, post.author.avatar);
    pin.querySelector(`img`).setAttribute(`alt`, post.offer.title);
    const pinOffsetX = 25;
    const pinOffsetY = 70;

    pin.setAttribute(`style`, `left: ${(post.location.x - pinOffsetX)}px; top: ${(post.location.y - pinOffsetY)}px;`);
    //  style="left: {{location.x + смещение по X}}px; top: {{location.y + смещение по Y}}px;"  map__pin 50 на 70, значит смещение -25 по Х и -70 по Y
    return pin;
  };
})();
