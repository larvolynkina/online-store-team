import { Data } from './data';

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
    <section className="card-product__description description-card">
      <h3 className="description-card__title">{title}</h3>
      <p className="description-card__rating">{`Rating: ${rating}`}</p>
      <p className="description-card__brand">{`Brand: ${brand}`}</p>
      <p className="description-card__category">{`Category: ${category}`}</p>
      <p className="description-card__description">{`Description: ${description}`}</p>
      <p className="description-card__price">{`Price: ${price}`}</p>
      <p className="description-card__stock">{`In stock: ${stock}`}</p>
    </section>
  );
}

export default ProductDescription;
