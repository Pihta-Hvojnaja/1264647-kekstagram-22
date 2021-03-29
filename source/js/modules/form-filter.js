
import {
  getArrayInstalledLength,
  mainElement
} from './util-modules/util.js';

import { createPhotos, removePhotos } from './miniature.js';


/* Переменные
   ========================================================================== */

const imgFiltersElement = mainElement.querySelector('.img-filters');
const imgFiltersFormElement = imgFiltersElement.querySelector('.img-filters__form');
const buttonFilterElements = imgFiltersFormElement.querySelectorAll('.img-filters__button');
let idSelectedElement; //id выбранной кнопки фильтра


/*  Функции включения фильтра и фильтрации фотографий
   ========================================================================== */

/**
*  Ф-ция включения фильтра
*/

const enableImgFilters = () => {
  imgFiltersElement.classList.remove('img-filters--inactive');
};

/**
*  Ф-ция выделения выбранной кнопки
*/

const highlightButton = (evt) => {

  buttonFilterElements.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });

  evt.target.classList.add('img-filters__button--active');
};

/**
*  Ф-ция сортировки фотографий по кол-ву комментариев (от большего к меньшиму)
*/

const sortByComments = (dataPhotos) => {
  return dataPhotos.slice()
    .sort((firstPhoto, secondPhoto) => {
      return secondPhoto.comments.length - firstPhoto.comments.length;
    });
};

/**
*  Функция фильтрации
*/

const filterItems = (dataPhotos) => {

  //удаляем фотографии
  removePhotos()

  //10 случайных фотографий
  if (idSelectedElement === 'filter-random') {
    return createPhotos(getArrayInstalledLength(dataPhotos));
  }

  //от большего кол-ва комментариев к меньшему
  if (idSelectedElement === 'filter-discussed') {
    return createPhotos(sortByComments(dataPhotos));
  }

  //дефолтная позиция
  return createPhotos(dataPhotos);
};


/*  Обработчик изменений фильтра
   ========================================================================== */

const onImgFiltersFormChange = (cb) => {
  enableImgFilters(); // активируем кнопки фильтра

  imgFiltersFormElement.addEventListener('click', (evt) => {
    idSelectedElement = evt.target.id; //сохраняем id выбранной кнопки фильтра
    highlightButton(evt); //выделяем активную кнопку фильтра
    cb();
  });
};


export {
  filterItems,
  onImgFiltersFormChange
};
