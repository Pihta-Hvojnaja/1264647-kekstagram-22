
import {
  hideElement,
  onCancelClick,
  openPopup
} from './util-modules/util.js';

import { renderComments } from './util-modules/util-big-photo.js';


/* Переменные
   ========================================================================== */

const DEFAULT_INITIAL_ELEMENT = 5;
const STEP = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bigImgElement = bigPictureElement.querySelector('.big-picture__img img');

const likesElement = bigPictureElement.querySelector('.likes-count');

//комментарии
const countCommentsElement = bigPictureElement.querySelector('.comments-count');
const commentsElement = bigPictureElement.querySelector('.social__comments');
const currentCountCommentsElement = bigPictureElement.querySelector('#current-count-comments');

const captionPictureElement = bigPictureElement.querySelector('.social__caption');

//кнопки cancel и загрузки комментариев
const bigCancelElement = bigPictureElement.querySelector('.big-picture__cancel');
const uploadCommentsElement = document.querySelector('.social__comments-loader');

//коллекция комментариев - потенциально
let commentsElements;


/*  Функции
   ========================================================================== */

/**
*  Ф-ция заполняет строку: кол-во комментариев
*/

const writeCountComments = (number) => {
  currentCountCommentsElement.textContent = number;
};

/**
*  Скрываем комментарии
*/

const hideComments = (commentsElements) => {
  for (let i = DEFAULT_INITIAL_ELEMENT; i <= commentsElements.length - 1; i++) {
    hideElement(commentsElements[i]);
  }
};

/**
*  Ф-ция первичной отрисовки комментарией
*/

const createComments = (listElement, dataPhoto) => {
  const dataComments = dataPhoto.comments;

  //отрисовываем комментарии
  renderComments(listElement, dataComments);

  //находим отрисованные комментарии
  commentsElements = commentsElement.querySelectorAll('.social__comment');

  hideComments(commentsElements); //скрываем лишние

  if (commentsElements.length <= DEFAULT_INITIAL_ELEMENT) {
    hideElement(uploadCommentsElement);
    writeCountComments(commentsElements.length); //указываем кол-во комм. в поле

  } else {
    writeCountComments(DEFAULT_INITIAL_ELEMENT);
  }
};

/**
*  Ф-ции обработки кнопки "загрузить комментарии"
*/

let endElement = 4;
let initialElement = DEFAULT_INITIAL_ELEMENT;

//сброс переменных
const resetVariables = () => {
  endElement = 4;
  initialElement = DEFAULT_INITIAL_ELEMENT;
}

//обработчик кнопки
const onUploadCommentsClick = () => {
  endElement += STEP;

  if (endElement >= commentsElements.length) {
    endElement = commentsElements.length - 1;
    hideElement(uploadCommentsElement);
  }

  for (let i = initialElement; i <= endElement; i++) {
    commentsElements[i].classList.remove('hidden');
  }

  writeCountComments(endElement + 1);
  initialElement = endElement;
};

const resetSettingsComments = () => {
  uploadCommentsElement.classList.remove('hidden');
  resetVariables();
  uploadCommentsElement.removeEventListener('click', onUploadCommentsClick);
};

/**
*  Ф-ция наполнения окна с полноразмерным изображением
*/

const fillBigPictureElement = (evt, dataPhotos) => {
  const dataPhoto = dataPhotos[evt.target.id];
  bigImgElement.src = dataPhoto.url;
  likesElement.textContent = dataPhoto.likes;
  countCommentsElement.textContent = dataPhoto.comments.length;
  captionPictureElement.textContent = dataPhoto.description;

  createComments(commentsElement, dataPhoto);
  uploadCommentsElement.addEventListener('click', onUploadCommentsClick);
};

/**
*  Ф-ция показа фотографии в полноразмерном формате
*/

const onBoxPicturesClick = (dataPhotos, boxPictures) => {

  boxPictures.addEventListener('click', (evt) => {

    if (evt.target.className === 'picture__img') {

      fillBigPictureElement(evt, dataPhotos);
      openPopup(bigPictureElement);
      onCancelClick(bigCancelElement, bigPictureElement, resetSettingsComments);
    }
  });
};

export { onBoxPicturesClick };
