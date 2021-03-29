import {
  addElementIntoMain,
  isEscEvent
} from './util-modules/util.js';

import {
  addDocumentListeners,
  messageErrorElement,
  removeListeners
} from './util-modules/util-message.js';


/* Переменные
   ========================================================================== */

const ALERT_SHOW_TIME = 10000;

const titleErrorElement = messageErrorElement.querySelector('.error__title');
const buttonErrorElement = messageErrorElement.querySelector('.error__button');


/* Функции обработки ошибки загрузки миниатюр
   ========================================================================== */

/**
*  Ф-ции обработки событий
*/

const onButtonErrorClick = () => {
  document.location.reload();
};

const onDocumentClick = (evt) => {
  if (evt.target.className !== 'error__button') {
    messageErrorElement.remove();
    removeAllListeners();
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscEvent(evt)) {
    messageErrorElement.remove();
    removeAllListeners();
  }
};

/**
*  Ф-ция удаления обработчиков событий
*/

const removeAllListeners = () => {
  buttonErrorElement.removeEventListener('click', onButtonErrorClick);
  removeListeners(onDocumentClick, onDocumentKeydown);
};

/**
*  Ф-ция показа сообщения ошибки загрузки миниатюрных фотографий
*/

const showErrorGetData = () => {
  titleErrorElement.textContent = 'Ошибка загрузки фотографий!';
  buttonErrorElement.textContent = 'Перезагрузить страницу';

  addElementIntoMain(messageErrorElement);

  buttonErrorElement.addEventListener('click', onButtonErrorClick);
  addDocumentListeners(onDocumentClick, onDocumentKeydown);

  setTimeout(
    () => {
      if (messageErrorElement) {
        messageErrorElement.remove();
        removeListeners();
      }
    },

    ALERT_SHOW_TIME,
  );
};


export { showErrorGetData };
