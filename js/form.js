'use strict';

(function () {
  // Деактивация формы
  const map = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);
  const fieldsets = adForm.querySelectorAll(`fieldset`);

  for (let fieldset of fieldsets) {
    fieldset.disabled = true;
  }

  // Активация формы
  const mainPin = document.querySelector(`.map__pin--main`);
  const address = adForm.querySelector(`#address`);

  const makeMapActive = function () {
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    const bodyRect = document.body.getBoundingClientRect();
    const mainPinRect = mainPin.getBoundingClientRect();
    // или вообще тут правда размеры метки взять с размеров элементов разметки и отсупы вычислить?
    const mainPinOffsetX = 32;
    const mainPinOffsetY = 44;
    for (let fieldset of fieldsets) {
      fieldset.disabled = false;
    }
    address.value = `${mainPinRect.x - bodyRect.x + mainPinOffsetX} ${mainPinRect.y - bodyRect.y + mainPinOffsetY}`;
  };

  mainPin.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      makeMapActive();
    }
  });

  mainPin.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      makeMapActive();
    }
  });

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

  // А тут уже фильтрую варианты
  inputRooms.addEventListener(`input`, function () {
    if (inputRooms.value === `1`) {
      inputCapacity.options[0].disabled = true;
      inputCapacity.options[1].disabled = true;
      inputCapacity.options[2].disabled = false;
      inputCapacity.options[2].selected = true;
      inputCapacity.options[3].disabled = true;
    }

    if (inputRooms.value === `2`) {
      inputCapacity.options[0].disabled = true;
      inputCapacity.options[1].disabled = false;
      inputCapacity.options[2].disabled = false;
      inputCapacity.options[2].selected = true;
      inputCapacity.options[3].disabled = true;
    }

    if (inputRooms.value === `3`) {
      inputCapacity.options[0].disabled = false;
      inputCapacity.options[1].disabled = false;
      inputCapacity.options[2].disabled = false;
      inputCapacity.options[2].selected = true;
      inputCapacity.options[3].disabled = true;
    }

    if (inputRooms.value === `100`) {
      inputCapacity.options[0].disabled = true;
      inputCapacity.options[1].disabled = true;
      inputCapacity.options[2].disabled = true;
      inputCapacity.options[3].disabled = false;
      inputCapacity.options[3].selected = true;
    }
  });

  inputPrice.addEventListener(`input`, function () {
    if (inputPrice.value.length === 0) {
      inputPrice.setCustomValidity(`Укажите цену`);
      return false;
    }

    if (inputPrice.value > 1000000) {
      inputPrice.setCustomValidity(`Цена должна быть меньше 1.000.000`);
      return false;
    }
    return inputPrice.setCustomValidity(``);
  });
})();
