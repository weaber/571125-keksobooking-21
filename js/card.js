'use strict';

(function () {
  let templateCard = document.querySelector(`#card`).content.querySelector(`.map__card`);
  let cardBlockElement = document.querySelector(`.map`);
  let beforeBlock = document.querySelector(`.map__filters-container`);
  let card;

  const renderCard = function (ad) {
    if (card) {
      card.remove();
    }
    card = templateCard.cloneNode(true);

    let cardTitleElement = card.querySelector(`.popup__title`);
    let cardAddressElement = card.querySelector(`.popup__text--address`);
    let cardPriceElement = card.querySelector(`.popup__text--price`);
    let cardTypeElement = card.querySelector(`.popup__type`);
    let cardCapacityElement = card.querySelector(`.popup__text--capacity`);
    let cardTimeElement = card.querySelector(`.popup__text--time`);
    let cardFeaturesElement = card.querySelector(`.popup__features`);
    let cardDescriptionElement = card.querySelector(`.popup__description`);
    let cardPhotosElement = card.querySelector(`.popup__photos`);
    let cardAvatarElement = card.querySelector(`.popup__avatar`);
    const cardTypesMap = {
      flat: `Квартира`,
      bungalow: `Бунгало`,
      house: `Дом`,
      palace: `Дворец`
    };

    // 'author':
    //     {
    //       'avatar': 'path.html'
    //     },
    //     'offer':
    //     {
    //       'title': 'Заголовок объявления',
    //       'address': 'Какой-то адрес',
    //       'price': 'Цена',
    //       'type': 'Тип',
    //       'rooms': 'Количество комнат',
    //       'guests': 'Количество гостей',
    //       'checkin': 'Время заезда',
    //       'checkout': 'Время выезда',
    //       'features': 'Фишки',
    //       'description': 'Описание',
    //       'fotos': 'Фотографии'
    //     },
    //     'location':
    //     {
    //       'x': 'Координата X',
    //       'y': 'Координата Y'
    //     }
    //   };

    const hideCardElement = function (adData, cardElement) {
      if (!adData) {
        cardElement.style.display = `none`;
      }
    };

    hideCardElement(ad.author.avatar, cardAvatarElement);
    hideCardElement(ad.offer.title, cardTitleElement);
    hideCardElement(ad.offer.address, cardAddressElement);
    hideCardElement(ad.offer.price, cardPriceElement);
    hideCardElement(ad.offer.type, cardTypeElement);
    hideCardElement(ad.offer.rooms, cardCapacityElement);
    hideCardElement(ad.offer.guests, cardCapacityElement);
    hideCardElement(ad.offer.checkin, cardTimeElement);
    hideCardElement(ad.offer.checkout, cardTimeElement);
    hideCardElement(ad.offer.features, cardFeaturesElement);
    hideCardElement(ad.offer.description, cardDescriptionElement);
    hideCardElement(ad.offer.photos, cardPhotosElement);

    cardTitleElement.textContent = ad.offer.title;
    cardAddressElement.textContent = ad.offer.address;
    cardPriceElement.textContent = `${ad.offer.price}₽/ночь`;
    cardTypeElement.textContent = cardTypesMap[ad.offer.type];
    cardCapacityElement.textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
    cardTimeElement.textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
    cardDescriptionElement.textContent = ad.offer.description;
    cardAvatarElement.setAttribute(`src`, ad.author.avatar);

    // FEATURES - решаю задачу в лоб, ищу контейнер ul, очищаю и создаю новые li записывая им нужные классы.
    // Очищаю список
    cardFeaturesElement.innerHTML = ``;

    // Создаю li на основе данных postBox'а и заполняю ими список
    for (let i = 0; i < ad.offer.features.length; i++) {
      let newFeature = document.createElement(`li`);
      newFeature.classList.add(`popup__feature`, `popup__feature--${ad.offer.features[i]}`);
      cardFeaturesElement.appendChild(newFeature);
    }

    // PHOTOS - решаю также в лоб как и с блоком features
    let photo = cardPhotosElement.querySelector(`img`); // это img, я его беру как шаблон
    cardPhotosElement.innerHTML = ``;

    // Заполняю создаю img и заполняю ими div
    for (let i = 0; i < ad.offer.photos.length; i++) {
      let newPhoto = photo.cloneNode(true);
      newPhoto.setAttribute(`src`, ad.offer.photos[i]);
      cardPhotosElement.appendChild(newPhoto);
    }

    const popupCloseButton = card.querySelector(`.popup__close`);

    popupCloseButton.addEventListener(`click`, card.remove.bind(card));

    document.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape`) {
        card.remove();
      }
    });

    cardBlockElement.insertBefore(card, beforeBlock);
  };

  window.card = {
    renderCard
  };
})();
