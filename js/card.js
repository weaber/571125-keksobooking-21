'use strict';

(function () {
  let templateCard = document.querySelector(`#card`).content.querySelector(`.map__card`);

  // Заполняем шаблон #card
  window.generateCard = function (ad) {
    let card = templateCard.cloneNode(true);

    let cardTitle = card.querySelector(`.popup__title`);
    let cardAddress = card.querySelector(`.popup__text--address`);
    let cardPrice = card.querySelector(`.popup__text--price`);
    let cardType = card.querySelector(`.popup__type`);
    let cardCapacity = card.querySelector(`.popup__text--capacity`);
    let cardTime = card.querySelector(`.popup__text--time`);
    let cardDescription = card.querySelector(`.popup__description`);
    let cardAvatar = card.querySelector(`.popup__avatar`);
    const cardTypesMap = {
      flat: `Квартира`,
      bungalow: `Бунгало`,
      house: `Дом`,
      palace: `Дворец`
    };

    cardTitle.textContent = ad.offer.title;
    cardAddress.textContent = ad.offer.address;
    cardPrice.textContent = `${ad.offer.price}₽/ночь`;
    cardType.textContent = cardTypesMap[ad.offer.type];

    cardCapacity.textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
    cardTime.textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
    cardDescription.textContent = ad.offer.description;
    cardAvatar.setAttribute(`src`, ad.author.avatar);


    // FEATURES - решаю задачу в лоб, ищу контейнер ul, очищаю и создаю новые li записывая им нужные классы.
    let cardFeatures = card.querySelector(`.popup__features`); // это ul

    // Очищаю список
    cardFeatures.innerHTML = ``;

    // Создаю li на основе данных postBox'а и заполняю ими список
    for (let i = 0; i < ad.offer.features.length; i++) {
      let newFeature = document.createElement(`li`);
      newFeature.classList.add(`popup__feature`, `popup__feature--${ad.offer.features[i]}`);
      cardFeatures.appendChild(newFeature);
    }

    // PHOTOS - решаю также в лоб как и с блоком features
    let cardPhotos = card.querySelector(`.popup__photos`); // это div сюда будем пушить фотки
    let photo = cardPhotos.querySelector(`img`); // это img, я его беру как шаблон

    cardPhotos.innerHTML = ``;

    // Заполняю создаю img и заполняю ими div

    for (let i = 0; i < ad.offer.fotos.length; i++) {
      let newPhoto = photo.cloneNode(true);
      newPhoto.setAttribute(`src`, ad.offer.fotos[i]);
      cardPhotos.appendChild(newPhoto);
    }

    return card;
  };
})();
