import './index.scss';
import ProductBuyButton from '../ProductBuyButton/ProductBuyButton';
import ProductCartButton from '../ProductCartButton/ProductCartButton';
import { IProduct } from '../../types';

function ProductDescription({ product, products, headerRender }:
   {
    product: IProduct,
    products: IProduct[],
    headerRender: () => void
  }) {
  return (
    <section className="card-product__desc desc-card">
      <h3 className="desc-card__title">{product.title}</h3>
      <ul className="desc-card__list">
        <li className="desc-card__item desc-card__item_rating">{`Rating: ${product.rating}`}</li>
        <li className="desc-card__item desc-card__item_brand">{`Brand: ${product.brand}`}</li>
        <li className="desc-card__item desc-card__item_description">{`Description: ${product.description}`}</li>
        <li className="desc-card__item desc-card__item_price">{`Price: ${product.price}`}</li>
        <li className="desc-card__item desc-card__item_category">{`Category: ${product.category}`}</li>
        <li className="desc-card__item desc-card__item_stock">{`In stock: ${product.stock}`}</li>
      </ul>
      <div className="description-card__btns btns-card">
        <ProductCartButton id={product.id} products={products} headerRender={headerRender} />
        <ProductBuyButton />
      </div>
    </section>
  );
}

export default ProductDescription;
