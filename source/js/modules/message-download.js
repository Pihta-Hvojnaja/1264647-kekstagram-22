
import {
  bodyElement,
  addElementIntoMain
} from './util-modules/util.js';


/* Переменные
   ========================================================================== */

const DELAY = 1500;
const templateDownloadElement = bodyElement.querySelector('#messages').content.querySelector('.img-upload__message--loading');
const messageDownloadElement = templateDownloadElement.cloneNode(true);


/* Функции обработки сообщения загрузки
   ========================================================================== */

const showMessageDownload = () => {
  addElementIntoMain(messageDownloadElement);

  setTimeout(
    () => messageDownloadElement.remove(),
    DELAY,
  );
};

export { showMessageDownload  };
