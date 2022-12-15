import { data } from './data';
import '../Pages/Product/index.scss';
import ProductCardTitle from './ProductCardTitle';
import ProductDescription from './ProductDescription';
import ProductGallery from './ProductGallery';

export default function ProductCard() {
  return (
    <div className="product__card card-product">
      <ProductCardTitle title={data.title} />
      <div className="card-product__content">
        <ProductGallery title={data.title} images={data.images} />
        <ProductDescription
          title={data.title}
          brand={data.brand}
          category={data.category}
          description={data.description}
          price={data.price}
          stock={data.stock}
          rating={data.rating}
        />
      </div>
    </div>
  );
}
