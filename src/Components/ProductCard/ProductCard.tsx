import './index.scss';
import { IProduct } from '../../types';
import ProductCardTitle from '../ProductCardTitle/ProductCardTitle';
import ProductDescription from '../ProductDescription/ProductDescription';
import ProductGallery from '../ProductGallery/ProductGallery';

export default function ProductCard({
  images,
  title,
  brand,
  category,
  description,
  price,
  stock,
  rating,
}: Partial<IProduct>) {
  return (
    <div className="product__card card-product">
      <ProductCardTitle title={title} />
      <div className="card-product__content">
        <ProductGallery images={images} title={title} />
        <ProductDescription
          title={title}
          brand={brand}
          category={category}
          description={description}
          price={price}
          stock={stock}
          rating={rating}
        />
      </div>
    </div>
  );
}
