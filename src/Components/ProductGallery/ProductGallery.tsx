import './index.scss';
import { useEffect, useState } from 'react';
import ProductGalleryItem from '../ProductGalleryItem/ProductGalleryItem';
import ProductGalleryImage from '../ProductGalleryImage/ProductGalleryImage';
import { IGallery } from '../../types';

export default function ProductGallery({ images = [], title }: IGallery) {
  const [url, setUrl] = useState('');
  useEffect(() => {
    setUrl(images[0]);
  }, [images[0]]);
  return (
    <section className="card-product__gallery gallery-product">
      <ul className="gallery-product__list">
        {images.map((link: string, index: number) => (
          <ProductGalleryItem
            imageLink={link}
            key={link}
            alt={`${title} ${index + 1}`}
            onClick={():void => setUrl(link)}
          />
        ))}
      </ul>
      <ProductGalleryImage url={url} alt={`${title} 1`} />
    </section>
  );
}
