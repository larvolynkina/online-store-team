import { Data } from './data';
import ProductBuyButton from './ProductBuyButton';
import ProductCartButton from './ProductCartButton';

function ProductDescription({
  title,
  brand,
  category,
  description,
  price,
  stock,
  rating,
}: Partial<Data>) {
  return (
    <section className="card-product__desc desc-card">
      <h3 className="desc-card__title">{title}</h3>
      <ul className="desc-card__list">
        <li className="desc-card__item desc-card__item_rating">{`Rating: ${rating}`}</li>
        <li className="desc-card__item desc-card__item_brand">{`Brand: ${brand}`}</li>
        <li className="desc-card__item desc-card__item_description">{`Description: ${description}`}</li>
        <li className="desc-card__item desc-card__item_price">{`Price: ${price}`}</li>
        <li className="desc-card__item desc-card__item_category">{`Category: ${category}`}</li>
        <li className="desc-card__item desc-card__item_stock">{`In stock: ${stock}`}</li>
      </ul>
      <div className="description-card__btns btns-card">
        <ProductCartButton className="btns-card__cart" />
        <ProductBuyButton className="btns-card__buy-now" />
      </div>
    </section>
  );
}

export default ProductDescription;
