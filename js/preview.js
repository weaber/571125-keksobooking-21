'use strict';

const avatarLoadElement = document.querySelector(`.ad-form__field input[type=file]`);
const avatarPreviewElement = document.querySelector(`.ad-form-header__preview img`);
const houseLoadElement = document.querySelector(`.ad-form__upload input[type=file]`);
const housePreviewElement = document.querySelector(`.ad-form__photo`);
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

avatarLoadElement.addEventListener(`change`, function () {
  const file = avatarLoadElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some(function (it) {
    return fileName.endsWith(it);
  });

  if (matches) {
    let reader = new FileReader();
    reader.addEventListener(`load`, function () {
      avatarPreviewElement.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
});

houseLoadElement.addEventListener(`change`, function () {
  housePreviewElement.innerHTML = ``;
  const file = houseLoadElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some(function (it) {
    return fileName.endsWith(it);
  });

  if (matches) {
    let reader = new FileReader();
    reader.addEventListener(`load`, function () {
      let housePhotoPreview = document.createElement(`img`);
      housePhotoPreview.style = `
      width: 100%;`;
      housePhotoPreview.src = reader.result;
      housePreviewElement.append(housePhotoPreview);
    });
    reader.readAsDataURL(file);
  }
});

window.removePreview = function () {
  avatarPreviewElement.src = `img/muffin-grey.svg`;
  housePreviewElement.innerHTML = ``;
};
