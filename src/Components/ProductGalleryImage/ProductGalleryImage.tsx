import './index.scss';
import { IGalleryImage } from '../../types';

export default function ProductGalleryImage({ url, alt }: IGalleryImage) {
  return (
    <img className="gallery-product__img" src={url} alt={alt} />
  );
}
