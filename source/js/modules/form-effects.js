
import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

import {
  cancelEffect,
  configureSlider,
  createSlider,
  setStyleFilter
} from './util-modules/util-img.js';

import { formUploadImageElement, hideElement } from './util-modules/util.js';


/* Переменные
   ========================================================================== */

const boxSliderElement = formUploadImageElement.querySelector('.img-upload__effect-level');
const sliderElement = boxSliderElement.querySelector('.effect-level__slider');
const effectsListElement = formUploadImageElement.querySelector('.effects__list');
const bigImgElement = formUploadImageElement.querySelector('.img-upload__preview img');
const effectValueElement = formUploadImageElement.querySelector('.effect-level__value');


/* Функции
   ========================================================================== */

const resetEffects = () => {
  boxSliderElement.classList.add('hidden');
  bigImgElement.className = '';
  bigImgElement.style.filter = 'none';
};


/* Создаем слайдер и скрываем его
   ========================================================================== */

createSlider(noUiSlider, sliderElement);
hideElement(boxSliderElement);


/* Обработчик эффектов
   ========================================================================== */

effectsListElement.addEventListener('change', (evt) => {

  //меняем класс фотографии
  bigImgElement.className = '';
  bigImgElement.className = `effects__preview--${evt.target.id.slice(7)}`;

  //настраиваем слайдер под эффект (шаг, мин - мах)
  configureSlider(evt, sliderElement);

  //обработчик ползунка слайдера
  sliderElement.noUiSlider.on('update', (values, handle) => {
    effectValueElement.value = values[handle]; //записываем значение ползунка в скрытое поле
    setStyleFilter(evt, bigImgElement, values[handle]); //меняем зпнчение свойства filter
  });

  //кнопка сброса стилей
  cancelEffect(evt, boxSliderElement, bigImgElement);
});

export { resetEffects };
