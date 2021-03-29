
import {
  editFormElement,
  formUploadImageElement,
  openPopup
} from './util-modules/util.js';

import { addOnControlElements } from './form-scale-control.js';
import { addOnHashtagsElement } from './form-hashtag.js';

import {
  resetToDefault,
  runOnCancelClick
} from './form-close.js';

import { addOnUploadSubmitElement } from './form-send.js';
import { showMessageDownload } from './message-download.js';


/*  Переменные
   ========================================================================== */

const fileChooserElement = formUploadImageElement.querySelector('#upload-file');


/*  Обработчик загрузки изображения
   ========================================================================== */

fileChooserElement.addEventListener('change', () => {
  showMessageDownload();
  resetToDefault();
  addOnControlElements();
  addOnHashtagsElement();
  addOnUploadSubmitElement();
  runOnCancelClick();
  openPopup(editFormElement);
});
