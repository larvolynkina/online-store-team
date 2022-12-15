import React from 'react';

interface ImageLink{
  imageLink: string;
  onClick(): void
}

export default function ProductGalleryItem({ imageLink, onClick }: ImageLink) {
  return (
    <li className="gallery-product__item">
      <img
        className="gallery-product__img-mini"
        src={imageLink}
        alt="gallery-item"
        role="presentation"
        onClick={onClick}
      />
    </li>
  );
}
