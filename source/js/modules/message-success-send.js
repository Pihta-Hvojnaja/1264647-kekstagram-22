
import {
  addElementIntoMain,
  bodyElement,
  isEscEvent
} from './util-modules/util.js';

import {
  addDocumentListeners,
  removeListeners
} from './util-modules/util-message.js';

import { closeForm } from './form-close.js';


/* Переменные
   ========================================================================== */

const templateSuccessElement = bodyElement.querySelector('#success').content.querySelector('.success');
const messageSuccessElement = templateSuccessElement.cloneNode(true);


/* Функции обработки успешной отправки
   ========================================================================== */

/**
*  Ф-ции обработки событий
*/

const onDocumentClick = () => {
  messageSuccessElement.remove();
  removeListeners(onDocumentClick, onDocumentKeydown);
};

const onDocumentKeydown = (evt) => {
  if (isEscEvent(evt)) {
    messageSuccessElement.remove();
    removeListeners(onDocumentClick, onDocumentKeydown);
  }
};

/**
*  Ф-ция показа сообщения успешной отправки данных
*/

const showSuccessSendData = () => {
  closeForm();
  addElementIntoMain(messageSuccessElement);
  addDocumentListeners(onDocumentClick, onDocumentKeydown);
};

export { showSuccessSendData };
