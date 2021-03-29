
/*  Переменные
   ========================================================================== */

const MAX_QUANTITY_ELEMENTS = 10;

const bodyElement = document.querySelector('body');
const mainElement = bodyElement.querySelector('main');
const formUploadImageElement = bodyElement.querySelector('#upload-select-image');
const editFormElement = formUploadImageElement.querySelector('.img-upload__overlay');


/*  Функции для работы с массивами и числами
   ========================================================================== */

/**
*   Меняем местами значения переменных
*/

const swapPlaces = (min, max) => [min, max] = [max, min];

/**
*   Возвращаем целое число
*/

const getRandomIntInclusive = (min, max) => {
  if (min >= 0 && max >= 0 && min !== max) {
    if (max < min) {
      swapPlaces(min, max);
    }

    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return null;
};

/**
*   Перетасовка массива
*/

const shuffle = (items) => {

  for (let i = items.length - 1; i > 0; i--) {
    const j = getRandomIntInclusive(0, i);
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
};

/**
*   Массив случайной длинны с неповторяющимися элементами
*/

const getArrayInstalledLength = (items) => {
  return shuffle(items.slice()).slice(0, MAX_QUANTITY_ELEMENTS);
};


/*  Ф-ция скрывает элемент
   ========================================================================== */

const hideElement = (element) => {
  element.classList.add('hidden');
};


/*  Обработка событий, попапы
   ========================================================================== */

/**
*   Определитель события
*/

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

/**
*   Открыть - закрыть попап
*/

const openPopup = (focusElement) => {
  focusElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
};

const closePopup = (focusElement) => {
  focusElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
};

/**
*   Обработчик кнопки закрытия попапа
*/

const onCancelClick = (listenerElement, focusElement, cb) => {

  const onCancelClick = () => {
    closePopup(focusElement);
    removeListeners();

    if (cb) {
      cb();
      resetForm(formUploadImageElement); //сброс формы
    }
  };

  const onCancelKeydown = (evt) => {

    //если фокус на поле ввода хештогов
    if (document.activeElement.className === 'text__hashtags' ||
          document.activeElement.className === 'text__description') {

      evt.stopPropagation();
      return;
    }

    if (isEscEvent(evt)) {
      closePopup(focusElement);
      removeListeners();

      if (cb) {
        cb();
        resetForm(formUploadImageElement); //сброс формы
      }
    }
  };

  const removeListeners = () => {
    listenerElement.removeEventListener('click', onCancelClick);
    document.removeEventListener('keydown', onCancelKeydown);
  };

  listenerElement.addEventListener('click', onCancelClick);
  document.addEventListener('keydown', onCancelKeydown);
};


/*  Работа с ДОМ-элементами, формой
   ========================================================================== */

/**
*   Добавляем элемент в main
*/

const addElementIntoMain = (element) => mainElement.append(element);

/**
*   Сброс формы отправки фотографии
*/

const resetForm = () => formUploadImageElement.reset();


/*  Устранение дребезга
   ========================================================================== */

const debounce = (cb, delay) => {
  let timeout;

  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(cb, delay);
  };
};


export {
  addElementIntoMain,
  bodyElement,
  closePopup,
  debounce,
  editFormElement,
  formUploadImageElement,
  getArrayInstalledLength,
  hideElement,
  isEscEvent,
  mainElement,
  onCancelClick,
  openPopup,
  resetForm
};
