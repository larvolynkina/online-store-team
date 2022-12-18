import './index.scss';
import { IProduct } from '../../types';
import ProductCardTitle from '../ProductCardTitle/ProductCardTitle';
import ProductDescription from '../ProductDescription/ProductDescription';
import ProductGallery from '../ProductGallery/ProductGallery';

export default function ProductCard({ product, products, headerRender }:
   {
    product: IProduct,
    products: IProduct[],
    headerRender: () => void
  }) {
  return (
    <div className="product__card card-product">
      <ProductCardTitle title={product.title} />
      <div className="card-product__content">
        <ProductGallery images={product.images} title={product.title} />
        <ProductDescription product={product} products={products} headerRender={headerRender} />
      </div>
    </div>
  );
}
