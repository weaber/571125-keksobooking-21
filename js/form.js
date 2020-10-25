'use strict';

(function () {
  const adForm = document.querySelector(`.ad-form`);
  const adFormResetButton = adForm.querySelector(`.ad-form__reset`);
  const fieldsets = adForm.querySelectorAll(`fieldset`);
  const inputTitle = adForm.querySelector(`#title`);
  const inputRooms = adForm.querySelector(`#room_number`);
  const inputCapacity = adForm.querySelector(`#capacity`);
  const offerPriceInputElement = adForm.querySelector(`#price`);
  const offerHouseTypeSelectElement = adForm.querySelector(`#type`);
  const inputAddress = adForm.querySelector(`#address`);
  const inputCheckin = adForm.querySelector(`#timein`);
  const inputCheckout = adForm.querySelector(`#timeout`);
  const inputAvatar = adForm.querySelector(`#avatar`);
  const inputImages = adForm.querySelector(`#images`);
  const cardTypesAndPricesMap = {
    flat: `1000`,
    bungalow: `0`,
    house: `5000`,
    palace: `10000`
  };
  const templateSuccessMessageElement = document.querySelector(`#success`).content.querySelector(`div`);
  const templateErrorMessageElement = document.querySelector(`#error`).content.querySelector(`div`);
  const main = document.querySelector(`main`);
  let successMessageElement;

  const disableForm = function () {
    adForm.classList.add(`ad-form--disabled`);
    for (let fieldset of fieldsets) {
      fieldset.disabled = true;
    }
  };

  const enableForm = function () {
    adForm.classList.remove(`ad-form--disabled`);
    for (let fieldset of fieldsets) {
      fieldset.disabled = false;
    }
  };

  const houseTypePriceInputHandler = function () {
    if (offerPriceInputElement.value.length === 0) {
      offerPriceInputElement.setCustomValidity(`Укажите цену`);
      return false;
    }

    if (offerPriceInputElement.value > 1000000) {
      offerPriceInputElement.setCustomValidity(`Цена должна быть меньше 1.000.000`);
      return false;
    }

    if (offerPriceInputElement.value < Number(cardTypesAndPricesMap[offerHouseTypeSelectElement.value])) {
      offerPriceInputElement.setCustomValidity(`Цена должна быть больше ${cardTypesAndPricesMap[offerHouseTypeSelectElement.value]}`);
      return false;
    }
    return offerPriceInputElement.setCustomValidity(``);
  };

  const titleInputHandler = function () {
    if (inputTitle.validity.valueMissing) {
      inputTitle.setCustomValidity(`Необходимо указать заголовок объявления`);
    } else if (inputTitle.validity.tooShort) {
      inputTitle.setCustomValidity(`Заголовок должен быть от 30 символов`);
    } else if (inputTitle.validity.tooLong) {
      inputTitle.setCustomValidity(`Заголовок должен быть до 100 символов`);
    } else {
      inputTitle.setCustomValidity(``);
    }
  };

  const roomsInputHandler = function (evt) {
    for (let i = 0; i < inputCapacity.options.length; i++) {
      const capacityOption = inputCapacity.options[i];
      const roomOptionValue = Number(evt.target.value);
      const capacityOptionValue = Number(capacityOption.value);

      const isOptionDisabled = roomOptionValue === 100
        ? capacityOptionValue !== 0
        : capacityOptionValue > roomOptionValue || capacityOptionValue === 0;

      const isOptionSelected = roomOptionValue === 100
        ? capacityOptionValue === 0
        : roomOptionValue === capacityOptionValue;

      capacityOption.disabled = isOptionDisabled;
      capacityOption.selected = isOptionSelected;
    }
  };

  const houseTypeChangeHandler = function () {
    offerPriceInputElement.setAttribute(`placeholder`, Number(cardTypesAndPricesMap[offerHouseTypeSelectElement.value]));
  };

  const checkinChangeHandler = function () {
    inputCheckout.value = inputCheckin.value;
  };

  const checkoutChangeHandler = function () {
    inputCheckin.value = inputCheckout.value;
  };

  const successMessageElementClickHandler = function () {
    successMessageElement.remove();
    document.removeEventListener(`click`, successMessageElementClickHandler);
    document.removeEventListener(`keydown`, successMessageElementEscPressHandler);
  };

  const successMessageElementEscPressHandler = function (evt) {
    if (evt.key === `Escape`) {
      successMessageElementClickHandler();
    }
    document.removeEventListener(`click`, successMessageElementClickHandler);
    document.removeEventListener(`keydown`, successMessageElementEscPressHandler);
  };

  const successHandler = function () {
    successMessageElement = templateSuccessMessageElement.cloneNode(true);
    main.insertAdjacentElement(`afterbegin`, successMessageElement);
    window.map.disableMapFilters();
    window.form.disableForm();
    adForm.reset();
    window.map.deactivateMap();
    document.addEventListener(`click`, successMessageElementClickHandler);
    document.addEventListener(`keydown`, successMessageElementEscPressHandler);
  };

  const errorHandler = function () {
    const errorMessageElement = templateErrorMessageElement.cloneNode(true);
    errorMessageElement.querySelector(`button`).addEventListener(`click`, function () {
      document.querySelector(`.error`).remove();
    });
    main.insertAdjacentElement(`afterbegin`, errorMessageElement);
  };

  const adFormSubmitHandler = function (evt) {
    evt.preventDefault();
    window.backend.sendNewBookingOffer(new FormData(adForm), successHandler, errorHandler);
  };

  const adFormResetHandler = function (evt) {
    evt.preventDefault();
    window.map.disableMapFilters();
    window.form.disableForm();
    adForm.reset();
    window.map.deactivateMap();
  };

  inputAddress.readOnly = true;
  inputAddress.required = true;
  inputAvatar.accept = `image/png, image/jpeg`;
  inputImages.accept = `image/png, image/jpeg`;

  inputTitle.addEventListener(`input`, titleInputHandler);
  inputRooms.addEventListener(`input`, roomsInputHandler);
  offerPriceInputElement.addEventListener(`input`, houseTypePriceInputHandler);
  offerHouseTypeSelectElement.addEventListener(`change`, houseTypePriceInputHandler);
  offerHouseTypeSelectElement.addEventListener(`change`, houseTypeChangeHandler);
  inputCheckin.addEventListener(`change`, checkinChangeHandler);
  inputCheckout.addEventListener(`change`, checkoutChangeHandler);

  adForm.addEventListener(`submit`, adFormSubmitHandler);

  adFormResetButton.addEventListener(`click`, adFormResetHandler);

  window.form = {
    disableForm,
    enableForm
  };
})();
