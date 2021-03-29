import {
  addElementIntoMain,
  isEscEvent
} from './util-modules/util.js';

import {
  addDocumentListeners,
  messageErrorElement,
  removeListeners
} from './util-modules/util-message.js';

import { closeForm } from './form-close.js';


/* Функции обработки успешной отправки
   ========================================================================== */

/**
*  Ф-ции обработки событий
*/

const onDocumentClick = () => {
  messageErrorElement.remove();
  removeListeners(onDocumentClick, onDocumentKeydown);
};

const onDocumentKeydown = (evt) => {
  if (isEscEvent(evt)) {
    messageErrorElement.remove();
    removeListeners(onDocumentClick, onDocumentKeydown);
  }
};

/**
*  Ф-ция показа сообщения успешной отправки данных
*/

const showErrorSendData = () => {
  closeForm();
  addElementIntoMain(messageErrorElement);
  addDocumentListeners(onDocumentClick, onDocumentKeydown);
};

export { showErrorSendData };
