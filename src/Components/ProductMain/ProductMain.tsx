import React from 'react';
import './ProductMain.scss';
import { useNavigate } from 'react-router-dom';
import { IProduct } from '../../types';

type ProductMainProps = {
  product: IProduct;
}

function ProductMain({ product } :ProductMainProps) {
  const navigate = useNavigate();
  return (
    <li className="product">
      <div className="product__image">
        <img className="product__img" src={product.thumbnail} alt={product.title} />
      </div>
      <div className="product__digits">
        <span className="product__rating">{product.rating}</span>
        <span className="product__price">{`$${product.price}`}</span>
      </div>
      <div className="product__info">
        <p className="product__title">{product.title}</p>
        <p className="product__descr">{product.description}</p>
        <hr className="product__line" />
        <dl className="product__list">
          <dt className="product__term">Category:</dt>
          <dd className="product__def">{product.category}</dd>
          <dt className="product__term">Brand:</dt>
          <dd className="product__def">{product.brand}</dd>
          <dt className="product__term">Stock:</dt>
          <dd className="product__def">{product.stock}</dd>
        </dl>
      </div>
      <div className="product__buttons">
        <button onClick={() => navigate(`/product/${product.id}`)} className="btn btn_details" type="button">Details</button>
        <button className="btn btn_cart" type="button">Add to cart</button>
      </div>
    </li>
  );
}

export default ProductMain;
