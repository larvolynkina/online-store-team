import { useState } from 'react';
import ProductGalleryItem from './ProductGalleryItem';
import ProductGalleryImage from './ProductGalleryImage';
import { Data } from './data';

export default function ProductGallery({ title, images }: Pick<Data, 'title' | 'images'>) {
  const [url, setUrl] = useState<string>(images[0]);

  return (
    <section className="card-product__gallery gallery-product">
      <ul className="gallery-product__list">
        {images.map((link: string) => (
          <ProductGalleryItem
            imageLink={link}
            key={link}
            onClick={():void => setUrl(link)}
          />
        ))}
      </ul>
      <ProductGalleryImage url={url} title={title} />
    </section>
  );
}
