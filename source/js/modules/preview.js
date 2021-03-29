
import { formUploadImageElement } from './util-modules/util.js';


/* Переменные
   ========================================================================== */

const TEMPLATE_IMG_TYPE = /png|jpeg?/i;
const MESSAGE_ERROR_TYPE_IMG = 'Пожалуйста, загрузите изображение формата png или jpeg!';
const PREVIEW_DEFAULT_URL = 'img/upload-default-image.jpg';

//Поля загрузки для фото аватарки
const fileChooserElement = formUploadImageElement.querySelector('#upload-file');
const previewElement = formUploadImageElement.querySelector('.img-upload__preview img');


/* Функции
   ========================================================================== */

/**
*  Сброс
*/

//превью
const resetPreview = () => {
  previewElement.src = PREVIEW_DEFAULT_URL;
  resetError(fileChooserElement);
};

//ошибки загрузки формата
const resetError = (element) => {
  element.setCustomValidity('');
};


/**
*  Проверка загружаемого формата
*/

const checkFileChooser = (fileType, input) => {

  if (TEMPLATE_IMG_TYPE.test(fileType)) {

    resetError(input);

    return true;

  } else {
    input.setCustomValidity(MESSAGE_ERROR_TYPE_IMG);
    input.reportValidity();
  }
};

//показ превью
const showPreview = (elementInput, elementImg) => {
  const file = elementInput.files[0];
  const fileType = file.type;

  if (checkFileChooser(fileType, elementInput)) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      elementImg.src = reader.result;
    });

    reader.readAsDataURL(file);

    return true;
  }
};


/* Обработчик загрузки превью
   ========================================================================== */

fileChooserElement.addEventListener('change', () => {
  if (!showPreview(fileChooserElement, previewElement)) { //если превью не загружено, показать дефолтную картинку
    previewElement.src = PREVIEW_DEFAULT_URL;
  }
});


export { resetPreview };
