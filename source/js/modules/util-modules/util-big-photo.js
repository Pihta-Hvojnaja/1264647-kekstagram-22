
/*  Функция отрисовки комментариев
   ========================================================================== */

const renderComments = (listElement, dataComments) => {
  listElement.innerHTML = '';

  dataComments.forEach((dataComment) => {
    const tagLiElement = `<li class="social__comment">
                            <img class="social__picture"
                              src="${dataComment.avatar}"
                              alt="${dataComment.name}"
                              width="35" height="35">
                            <p class="social__text">${dataComment.message}</p>
                          </li>`;

    listElement.insertAdjacentHTML('beforeend', tagLiElement);
  });
};


export { renderComments };
