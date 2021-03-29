import { formUploadImageElement } from './util-modules/util.js';

import {
  checkHashtag,
  replaceInvalidText
} from './util-modules/util-img.js';


/* Переменные
   ========================================================================== */

const HASHTAG_START_AUTOCORRECT_TEMPLATE = /\s+[\p{Alpha}\p{M}\p{Nd}]/gu;
const SPACE_AUTOCORRECT_TEMPLATE = /\s+\s|[#]+\s/gu;
const SPACE_START_END_AUTOCORRECT_TEMPLATE = /^\s|\s$/gu;

const hashtagsElement = formUploadImageElement.querySelector('.text__hashtags');
const commentElement = formUploadImageElement.querySelector('.text__description');


/* Функции валидации хештегов
   ========================================================================== */

/**
*  Сброс валидации
*/

const resetValidation = () => {
  hashtagsElement.setCustomValidity('');
  commentElement.setCustomValidity('');
};

/**
*  Обработчик сохраняет данные для автозамены лишних пробелов _ _ / #__
*/

let autocorrectKey;
const onHashtagsElementKeydown = (evt) => {
  autocorrectKey = ' #' + evt.key;
}

/**
*  Обработчики ввода хештега
*/

const onHashtagsElementInput = () => {
  document.addEventListener('keydown', onHashtagsElementKeydown);
  replaceInvalidText(hashtagsElement, HASHTAG_START_AUTOCORRECT_TEMPLATE, autocorrectKey);
  replaceInvalidText(hashtagsElement, SPACE_AUTOCORRECT_TEMPLATE, '');
  checkHashtag(hashtagsElement);
};

const onHashtagsElementChange = () => {
  document.removeEventListener('keydown', onHashtagsElementKeydown);
  replaceInvalidText(hashtagsElement, SPACE_START_END_AUTOCORRECT_TEMPLATE, '');
};

/**
*  Ф-ции добавления / снятия обработчиков
*/

const addOnHashtagsElement = () => {
  hashtagsElement.addEventListener('input', onHashtagsElementInput);
  hashtagsElement.addEventListener('change', onHashtagsElementChange);
}

const removeOnHashtagsElement = () => {
  hashtagsElement.removeEventListener('input', onHashtagsElementInput);
  hashtagsElement.removeEventListener('change', onHashtagsElementChange);
  resetValidation();
};


export {
  addOnHashtagsElement,
  removeOnHashtagsElement
}
