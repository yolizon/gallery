'use strict';

import galleryItems from './gallery-items.js';

const galleryElement = document.querySelector('.js-gallery');

function createGalleryItem({preview, description, original}) {
  const item = document.createElement('li');
  const galleryLink = document.createElement('a');
  const image = document.createElement('img');
  const galleryIcon = document.createElement('span');
  const materialIcon = document.createElement('i');
  materialIcon.classList.add('material-icons');
  galleryIcon.classList.add('gallery__icon');
  item.classList.add('gallery__item');
  galleryLink.classList.add('gallery__link');
  image.classList.add('gallery__image');
  image.src = preview;
  image.alt = description;
  image.setAttribute('data-source', original);
//   galleryLink.setAttribute('href', original); если оставить ссылку активной, то происходит переход вместо открытия lightbox
  galleryIcon.appendChild(materialIcon);
  galleryLink.append(image, galleryIcon);
  item.appendChild(galleryLink);
  return item;
};

  const elements = galleryItems.map((e) => createGalleryItem(e));
  galleryElement.append(...elements);

  galleryElement.addEventListener('click', handleClick);

  const lightbox = document.querySelector('.js-lightbox');
  const lightboxImage = document.querySelector('.lightbox__image');

  function handleClick(e) {
      if(e.target === e.currentTarget) {
        return;
      };
      lightbox.classList.add('is-open');
      const newSrc = e.target.dataset.source;
      lightboxImage.src = newSrc;
  };

  const lightboxButton = document.querySelector('.lightbox__button');

  lightboxButton.addEventListener('click', handleCloseButton);

  function handleCloseButton(e) {
      lightbox.classList.remove('is-open');
      lightboxImage.src = "";
  };


  lightbox.addEventListener('click', handleClose);

  const lightboxContent = document.querySelector('.lightbox__content');

  function handleClose(e) {
      if(e.target === lightboxContent) {
        lightbox.classList.remove('is-open');
        lightboxImage.src = "";
      };
  };

  document.addEventListener('keydown', handleCloseByEcs);

  function handleCloseByEcs(e) {
    const key = e.keyCode;

    if(key === 27) {
      lightbox.classList.remove('is-open');
      lightboxImage.src = "";
    };
  };