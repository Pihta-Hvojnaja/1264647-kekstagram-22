
import { hideElement } from './util.js';


/*  Переменные
   ========================================================================== */

const HASHTAG_TEST_TEMPLATE = /^[#]+[\p{Alpha}\p{M}\p{Nd}]{1,19}$/iu;
const HASHTAG_START_TEST_TEMPLATE = /^[#]/iu;


/*  Создаем слайдер
   ========================================================================== */

const createSlider = (noUiSlider, sliderElement) => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },

    start: 1,
    step: 0.1,

    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },

      from: function (value) {
        return parseFloat(value);
      },
    },
  });
};


/*  Ф-ция настраивает шаг слайдера и его мин-мах
   ========================================================================== */

const configureSlider = (evt ,sliderElement) => {
  if (evt.target.id === 'effect-chrome' || evt.target.id === 'effect-sepia') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },

      start: 1,
      step: 0.1,
    });
  }

  if (evt.target.id === 'effect-marvin') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },

      start: 100,
      step: 1,
    });
  }

  if (evt.target.id === 'effect-phobos') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },

      start: 3,
      step: 0.1,
    });
  }

  if (evt.target.id === 'effect-heat') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },

      start: 3,
      step: 0.1,
    });
  }
};


/*  Ф-ция устанавливает значение св-ва filter фотографии
   ========================================================================== */

const setStyleFilter = (evt, element, valueSlider) => {

  if (evt.target.id === 'effect-chrome') {
    element.style.filter = `grayscale(${valueSlider})`;
  }

  if (evt.target.id === 'effect-sepia') {
    element.style.filter = `sepia(${valueSlider})`;
  }

  if (evt.target.id === 'effect-marvin') {
    element.style.filter = `invert(${valueSlider}%)`;
  }

  if (evt.target.id === 'effect-phobos') {
    element.style.filter = `blur(${valueSlider}px)`;
  }

  if (evt.target.id === 'effect-heat') {
    element.style.filter = `brightness(${valueSlider})`;
  }
};


/*  Ф-ция сбрасывает св-во filter
   ========================================================================== */

const cancelEffect = (evt, boxSliderElement, bigImgElement) => {

  if (evt.target.id === 'effect-none' &&
        !boxSliderElement.classList.contains('hidden')) {

    bigImgElement.style.filter = 'none';
    hideElement(boxSliderElement);

  } else {
    boxSliderElement.classList.remove('hidden');
  }
}


/*  Валидация хештегов
   ========================================================================== */

/**
*  Ф-ция проверки хештеги на уникальность
*/

const isSimilarElement = (hashtags) => {
  return  hashtags.some((item, index, hashtags) => {
    return hashtags.indexOf(item) !== index;
  });
};

/**
*  Ф-ция автозамены
*/

const replaceInvalidText = (element, template, value) => {
  element.value = element.value.replace(template, value);
};

/**
*  Ф-ция валидации хештегов
*/

const checkHashtag = (hashtagsElement) => {

  //разбиваем строку ввода хештегов по пробелам
  const hashtags = hashtagsElement.value.toLowerCase().
    split(/\s/).filter((item) => item.length !== 0);

  let countHashtag = 0;

  for(const hashtag of hashtags) {

    if (!HASHTAG_TEST_TEMPLATE.test(hashtag)) {

      if (!HASHTAG_START_TEST_TEMPLATE.test(hashtag)) {
        hashtagsElement.setCustomValidity('Хештег должен начинаться с #');
        break;
      }

      if (hashtag.length > 20) {
        hashtagsElement.setCustomValidity('Длина хештега не должна превышать 20 символов');
        break;

      } else {
        hashtagsElement.setCustomValidity('Введите букву или число');
        break;
      }
    }

    if (hashtag.length > 0) {
      countHashtag += 1;

      if (countHashtag > 5) {
        hashtagsElement.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
        break;
      }
    }

    if (isSimilarElement(hashtags)) {
      hashtagsElement.setCustomValidity('Не должно быть повторяющихся хештегов');
      break;
    }

    hashtagsElement.setCustomValidity('');
  }

  hashtagsElement.reportValidity();
};


export {
  cancelEffect,
  checkHashtag,
  configureSlider,
  createSlider,
  replaceInvalidText,
  setStyleFilter
};
