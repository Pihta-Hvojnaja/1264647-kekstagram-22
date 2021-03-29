
import {
  formUploadImageElement
} from './util-modules/util.js';


/* Переменные
   ========================================================================== */

const DEFAULT_SCALE_CONTROL = 100;

const scaleControlElement = formUploadImageElement.querySelector('.scale__control--value');
const imgPreviewElement = formUploadImageElement.querySelector('.img-upload__preview');
const controlSmallerElement = formUploadImageElement.querySelector('.scale__control--smaller');
const controlBiggerElement = formUploadImageElement.querySelector('.scale__control--bigger');

let valueScaleControl;


/* Функции
   ========================================================================== */

/**
*  Ф-ция изменяет масштаб изображения и значение в скрытом поле ввода
*/

const changeScale = () => {
  scaleControlElement.value = valueScaleControl + '%';
  imgPreviewElement.style.transform = `scale(${valueScaleControl/100})`;
};

/**
*  Ф-ции обработки событий кнопок изменения масштаба "+", "-"
*/

const onControlSmallerClick = () => {
  if (valueScaleControl > 25) {
    valueScaleControl -= 25;
    changeScale();
  }
};

const onControlBiggerClick = () => {
  if (valueScaleControl < 100) {
    valueScaleControl += 25;
    changeScale();
  }
};

const resetValueScaleControl = () => {
  valueScaleControl = DEFAULT_SCALE_CONTROL;
  changeScale();
};

/**
*  Обработчики событий кнопок изменения масштаба "+", "-"
*/

const addOnControlElements = () => {
  controlSmallerElement.addEventListener('click', onControlSmallerClick);
  controlBiggerElement.addEventListener('click', onControlBiggerClick);
};

const removeOnControlElements = () => {
  controlSmallerElement.removeEventListener('click', onControlSmallerClick);
  controlBiggerElement.removeEventListener('click', onControlBiggerClick);
};


export {
  addOnControlElements,
  removeOnControlElements,
  resetValueScaleControl
};
