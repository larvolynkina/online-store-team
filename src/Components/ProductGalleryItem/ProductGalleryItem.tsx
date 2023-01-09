/* eslint-disable jsx-a11y/click-events-have-key-events,
jsx-a11y/no-noninteractive-element-interactions */
import './index.scss';
import { IImageLink } from '../../types';

export default function ProductGalleryItem({ imageLink, onClick, alt }: IImageLink) {
  return (
    <li className="gallery-product__item">
      <img
        className="gallery-product__img-mini"
        src={imageLink}
        alt={alt}
        onClick={onClick}
      />
    </li>
  );
}
