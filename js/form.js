'use strict';

(function () {
  const adForm = document.querySelector(`.ad-form`);
  const fieldsets = adForm.querySelectorAll(`fieldset`);

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

  // Валидация формы
  let inputTitle = adForm.querySelector(`#title`);
  let inputRooms = adForm.querySelector(`#room_number`);
  let inputCapacity = adForm.querySelector(`#capacity`);
  let offerPriceInputElement = adForm.querySelector(`#price`);

  inputTitle.addEventListener(`input`, function () {
    if (inputTitle.validity.valueMissing) {
      inputTitle.setCustomValidity(`Необходимо указать заголовок объявления`);
    } else if (inputTitle.validity.tooShort) {
      inputTitle.setCustomValidity(`Заголовок должен быть от 30 символов`);
    } else if (inputTitle.validity.tooLong) {
      inputTitle.setCustomValidity(`Заголовок должен быть до 100 символов`);
    } else {
      inputTitle.setCustomValidity(``);
    }
  });

  inputRooms.addEventListener(`input`, function (evt) {
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
  });

  let offerHouseTypeSelectElement = adForm.querySelector(`#type`);

  const cardTypesAndPricesMap = {
    flat: `1000`,
    bungalow: `0`,
    house: `5000`,
    palace: `10000`
  };

  const validateHouseTypePrice = function () {
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

  offerPriceInputElement.addEventListener(`input`, validateHouseTypePrice);
  offerHouseTypeSelectElement.addEventListener(`change`, validateHouseTypePrice);

  offerHouseTypeSelectElement.addEventListener(`change`, function () {
    offerPriceInputElement.setAttribute(`placeholder`, Number(cardTypesAndPricesMap[offerHouseTypeSelectElement.value]));
  });

  let inputAddress = adForm.querySelector(`#address`);
  inputAddress.readOnly = true;
  inputAddress.required = true;

  let inputCheckin = adForm.querySelector(`#timein`);
  let inputCheckout = adForm.querySelector(`#timeout`);

  inputCheckin.addEventListener(`change`, function () {
    inputCheckout.value = inputCheckin.value;
  });

  inputCheckout.addEventListener(`change`, function () {
    inputCheckin.value = inputCheckout.value;
  });

  let inputAvatar = adForm.querySelector(`#avatar`);
  inputAvatar.accept = `image/png, image/jpeg`;
  let inputImages = adForm.querySelector(`#images`);
  inputImages.accept = `image/png, image/jpeg`;

  // adFormSubmitHandler
  const templateSuccessMessageElement = document.querySelector(`#success`).content.querySelector(`div`);
  const templateErrorMessageElement = document.querySelector(`#error`).content.querySelector(`div`);
  const main = document.querySelector(`main`);

  const successHandler = function () {
    const successMessageElement = templateSuccessMessageElement.cloneNode(true);
    main.insertAdjacentElement(`afterbegin`, successMessageElement);
    window.map.disableMapFilters();
    window.form.disableForm();
    adForm.reset();
    window.map.deactivateMap();
    document.addEventListener(`click`, function () {
      document.querySelector(`.success`).remove();
    });
    document.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape`) {
        document.querySelector(`.success`).remove();
      }
    });
  };

  const errorHandler = function () {
    const errorMessageElement = templateErrorMessageElement.cloneNode(true);
    errorMessageElement.querySelector(`button`).addEventListener(`click`, function () {
      document.querySelector(`.error`).remove();
    });
    main.insertAdjacentElement(`afterbegin`, errorMessageElement);

  };

  adForm.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    window.backend.sendNewBookingOffer(new FormData(adForm), successHandler, errorHandler);
  });

  window.form = {
    disableForm,
    enableForm
  };

})();
