
import { formUploadImageElement } from './util-modules/util.js';

import {
  closePopup,
  editFormElement,
  onCancelClick,
  resetForm
} from './util-modules/util.js';

import { resetPreview } from './preview.js';

import {
  resetValueScaleControl,
  removeOnControlElements
} from './form-scale-control.js';

import { resetEffects } from './form-effects.js';
import { removeOnHashtagsElement } from './form-hashtag.js';
import { removeOnUploadSubmitElement } from './form-send.js';


/*  Переменные
   ========================================================================== */

const uploadCancelElement = formUploadImageElement.querySelector('#upload-cancel');


/*  Функции
   ========================================================================== */

/**
*   удаляем обработчики событий кнопок изменения масштаба "+", "-";
*   откатываем эффекты к дефолту.
*/

const resetToDefault = () => {
  resetPreview();
  resetValueScaleControl();
  removeOnControlElements();
  resetEffects();
  removeOnHashtagsElement();
  removeOnUploadSubmitElement();
};

const closeForm = () => {
  closePopup(editFormElement);
  resetToDefault();
  resetForm();
};

const runOnCancelClick = () => {
  onCancelClick(uploadCancelElement, editFormElement, resetToDefault);
};


export {
  closeForm,
  resetToDefault,
  runOnCancelClick
};
