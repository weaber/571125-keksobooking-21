'use strict';

const templateCard = document.querySelector(`#card`).content.querySelector(`.map__card`);
const cardBlockElement = document.querySelector(`.map`);
const beforeBlock = document.querySelector(`.map__filters-container`);
let card;

const removeCard = function () {
  if (card) {
    card.remove();
  }
};

const renderCard = function (ad) {
  removeCard();

  card = templateCard.cloneNode(true);
  const popupCloseButton = card.querySelector(`.popup__close`);
  const cardTitleElement = card.querySelector(`.popup__title`);
  const cardAddressElement = card.querySelector(`.popup__text--address`);
  const cardPriceElement = card.querySelector(`.popup__text--price`);
  const cardTypeElement = card.querySelector(`.popup__type`);
  const cardCapacityElement = card.querySelector(`.popup__text--capacity`);
  const cardTimeElement = card.querySelector(`.popup__text--time`);
  const cardFeaturesElement = card.querySelector(`.popup__features`);
  const cardDescriptionElement = card.querySelector(`.popup__description`);
  const cardPhotosElement = card.querySelector(`.popup__photos`);
  const photo = cardPhotosElement.querySelector(`img`);
  const cardAvatarElement = card.querySelector(`.popup__avatar`);
  const CardTypesMap = {
    flat: `Квартира`,
    bungalow: `Бунгало`,
    house: `Дом`,
    palace: `Дворец`
  };

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
  cardTypeElement.textContent = CardTypesMap[ad.offer.type];
  cardCapacityElement.textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  cardTimeElement.textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  cardDescriptionElement.textContent = ad.offer.description;
  cardAvatarElement.setAttribute(`src`, ad.author.avatar);

  cardFeaturesElement.innerHTML = ``;
  for (let i = 0; i < ad.offer.features.length; i++) {
    let newFeature = document.createElement(`li`);
    newFeature.classList.add(`popup__feature`, `popup__feature--${ad.offer.features[i]}`);
    cardFeaturesElement.appendChild(newFeature);
  }

  cardPhotosElement.innerHTML = ``;
  for (let i = 0; i < ad.offer.photos.length; i++) {
    let newPhoto = photo.cloneNode(true);
    newPhoto.setAttribute(`src`, ad.offer.photos[i]);
    cardPhotosElement.appendChild(newPhoto);
  }

  const cardCloseButtonClickHandler = function () {
    removeCard();
    popupCloseButton.removeEventListener(`click`, cardCloseButtonClickHandler);
    document.removeEventListener(`keydown`, cardEscapePressHandler);
  };

  const cardEscapePressHandler = function (evt) {
    if (evt.key === `Escape`) {
      removeCard();
    }
    popupCloseButton.removeEventListener(`click`, cardCloseButtonClickHandler);
    document.removeEventListener(`keydown`, cardEscapePressHandler);
  };

  popupCloseButton.addEventListener(`click`, cardCloseButtonClickHandler);
  document.addEventListener(`keydown`, cardEscapePressHandler);
  cardBlockElement.insertBefore(card, beforeBlock);
};

window.card = {
  removeCard,
  renderCard
};
