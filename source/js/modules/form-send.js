
import {
  formUploadImageElement
} from './util-modules/util.js';

import { sendData } from './api.js';
import { showSuccessSendData } from './message-success-send.js';
import { showErrorSendData } from './message-fail-send.js';


/* Функции успеха или провала отправки данных
   ========================================================================== */

/**
*  Ф-ция успешной отправки данных:
*  закрываем форму отправки, сбрасываем значение полей к дефолту,
*  показываем сообщение об успехе
*/

const onFormSend = () => {
  showSuccessSendData();
};

/**
*  Ф-ция при провале отправки данных:
*  показываем сообщениие о провале
*/

const onFail = () => {
  showErrorSendData();
};


/* Ф-ции для обработки отпраки данных формы
   ========================================================================== */

const onUploadSubmitSubmit = (evt) => {
  evt.preventDefault();

  sendData(
    () => onFormSend(),
    () => onFail(),
    new FormData(evt.target),
  );
};

/**
*  Ф-ции добавления обработчиков
*/

const addOnUploadSubmitElement = () => {
  formUploadImageElement.addEventListener('submit', onUploadSubmitSubmit);
};

const removeOnUploadSubmitElement = () => {
  formUploadImageElement.removeEventListener('submit', onUploadSubmitSubmit);
};


export {
  addOnUploadSubmitElement,
  removeOnUploadSubmitElement
};
