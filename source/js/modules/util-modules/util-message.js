
import { bodyElement } from './util.js';


/* Переменные
   ========================================================================== */

const templateErrorElement = bodyElement.querySelector('#error').content.querySelector('.error');
const messageErrorElement = templateErrorElement.cloneNode(true);


/* Функции
   ========================================================================== */

/**
*  Ф-ция добавления обработчиков событий
*/

const addDocumentListeners = (onDocumentClick, onDocumentKeydown) => {
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

/**
*  Ф-ция удаления обработчиков событий
*/

const removeListeners = (onDocumentClick, onDocumentKeydown) => {
  document.removeEventListener('click', onDocumentClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};


export {
  addDocumentListeners,
  messageErrorElement,
  removeListeners,
  templateErrorElement
};
