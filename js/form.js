'use strict';

(function () {
  const adForm = document.querySelector(`.ad-form`);
  const fieldsets = adForm.querySelectorAll(`fieldset`);

  window.disableForm = function () {
    for (let fieldset of fieldsets) {
      fieldset.disabled = true;
    }
  };

  window.enableForm = function () {
    for (let fieldset of fieldsets) {
      fieldset.disabled = false;
    }
  };

  // Валидация формы
  let inputTitle = adForm.querySelector(`#title`);
  let inputRooms = adForm.querySelector(`#room_number`);
  let inputCapacity = adForm.querySelector(`#capacity`);
  let inputPrice = adForm.querySelector(`#price`);

  inputTitle.addEventListener(`input`, function () {
    const MIN_TITLE_LENGTH = 30;
    const MAX_TITLE_LENGTH = 100;
    let titleLength = inputTitle.value.length;

    if (titleLength < MIN_TITLE_LENGTH) {
      inputTitle.setCustomValidity(`Заголовок должен быть от 30 символов`);
    } else if (titleLength > MAX_TITLE_LENGTH) {
      inputTitle.setCustomValidity(`Заголовок должен быть до 100 символов`);
    } else {
      inputTitle.setCustomValidity(``);
    }
  });

  // JavaScript'ом привожу форму в норм состояние
  if (inputRooms.value === `1`) {
    inputCapacity.options[0].disabled = true;
    inputCapacity.options[1].disabled = true;
    inputCapacity.options[2].selected = true;
    inputCapacity.options[3].disabled = true;
  }

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

  let inputType = adForm.querySelector(`#type`);

  const cardTypesAndPricesMap = {
    flat: `1000`,
    bungalow: `0`,
    house: `5000`,
    palace: `10000`
  };

  inputPrice.addEventListener(`input`, function () {
    if (inputPrice.value.length === 0) {
      inputPrice.setCustomValidity(`Укажите цену`);
      return false;
    }

    if (inputPrice.value > 1000000) {
      inputPrice.setCustomValidity(`Цена должна быть меньше 1.000.000`);
      return false;
    }

    if (inputPrice.value < Number(cardTypesAndPricesMap[inputType.value])) {
      inputPrice.setCustomValidity(`Цена должна быть больше ${Number(cardTypesAndPricesMap[inputType.value])}`);
      return false;
    }
    return inputPrice.setCustomValidity(``);
  });

  inputType.addEventListener(`change`, function () {
    inputPrice.setAttribute(`placeholder`, Number(cardTypesAndPricesMap[inputType.value]));
    // inputPrice.placeholder = Number(cardTypesAndPricesMap[inputType.value]);
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

})();
