import { useState } from 'react';
import ProductGalleryItem from './ProductGalleryItem';
import ProductGalleryImage from './ProductGalleryImage';
import { Data } from './data';

export default function ProductGallery({ title, images }: Pick<Data, 'title' | 'images'>) {
  const [url, setUrl] = useState(images[0]);

  return (
    <section className="card-product__gallery gallery-product">
      <ul className="gallery-product__list">
        {images.slice(0, images.length - 1)
          .map((link: string) => (
            <ProductGalleryItem
              imageLink={link}
              key={link}
              onClick={() => setUrl(link)}
            />
          ))}
      </ul>
      <ProductGalleryImage url={url} title={title} />
    </section>
  );
}
