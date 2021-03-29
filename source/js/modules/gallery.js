
import { debounce } from './util-modules/util.js';
import { getData } from './api.js';

import {
  createPhotos,
  picturesBoxElement
} from './miniature.js';

import { onBoxPicturesClick } from './big-photo.js';
import { showErrorGetData } from './message-error-upload.js';

import {
  filterItems,
  onImgFiltersFormChange
} from './form-filter.js';


/* Переменные
   ========================================================================== */

const DELAY_RERANDARY = 500;


/* Запрос данных с сервера
   ========================================================================== */

getData(
  (dataPhotos) => {
    createPhotos(dataPhotos);
    onBoxPicturesClick(dataPhotos, picturesBoxElement);

    onImgFiltersFormChange(
      debounce(
        () => filterItems(dataPhotos),
        DELAY_RERANDARY,
      ),
    )},

  () => showErrorGetData(),
);
