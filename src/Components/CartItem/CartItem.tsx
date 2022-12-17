import './index.scss';
import { useState } from 'react';
import { IProduct } from '../../types';

export default function CartItem({ product, index } : {product: IProduct, index: number}) {
  const [itemCount, setItemCount] = useState(1);
  const [sum, setSum] = useState(product.price);
  return (
    <li className="cart__item item-cart">
      <div className="item-cart__number">{index + 1}</div>
      <img src={product.thumbnail} alt={product.title} />
      <div className="item-cart__details">
        <h3 className="item-cart__title">{product.title}</h3>
        <p className="item-cart__description">{product.description}</p>
        <p className="item cart__rating">{product.rating}</p>
      </div>
      <div className="item-cart__controls">
        <p className="item-cart__stock">{`Stock: ${product.stock}`}</p>
        <div className="item-cart__num-control">
          <button
            type="button"
            onClick={
              () => {
                setItemCount(itemCount - 1);
                setSum(sum - product.price);
              }
            }
          >
            -
          </button>
          <span>{itemCount}</span>
          <button
            type="button"
            onClick={
              () => {
                setItemCount(itemCount + 1);
                setSum(sum + product.price);
              }
            }
          >
            +
          </button>
        </div>
        <p className="item-cart__sum">{sum}</p>
      </div>
    </li>
  );
}
