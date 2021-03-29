
/* Переменные
   ========================================================================== */

const picturesBoxElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const pictureFragment = document.createDocumentFragment();


/* Функции
   ========================================================================== */

/**
*  Ф-ция удаления фотографий
*/

const removePhotos = () => {
  let photos =  picturesBoxElement.querySelectorAll('.picture');
  photos.forEach((photo) => {
    photo.remove();
  });
};

/**
*  Ф-ция отрисовки фотографий в миниатюрном формате
*/

const createPhotos = (dataPhotos) => {

  dataPhotos.forEach((dataPhoto) =>  {
    const pictureElement = pictureTemplateElement.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = dataPhoto.url;
    pictureElement.querySelector('.picture__img').id = dataPhoto.id;
    pictureElement.querySelector('.picture__likes').textContent = dataPhoto.likes;
    pictureElement.querySelector('.picture__comments').textContent = dataPhoto.comments.length;

    pictureFragment.appendChild(pictureElement);
  });

  picturesBoxElement.appendChild(pictureFragment);
};


export {
  createPhotos,
  picturesBoxElement,
  removePhotos
};
