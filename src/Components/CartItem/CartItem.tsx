import './index.scss';
import React, { useEffect, useState, SetStateAction } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { ICartItem, IProduct } from '../../types';
import CartCountButton from '../CartCountButton/CartCountButton';
import plusCircle from '../../assets/icons/plusCircle.svg';
import minusCircle from '../../assets/icons/minusCircle.svg';

export default function CartItem(
  {
    currentCart,
    cartItem,
    index,
    count,
    setCurrentCart,
  } :
  {
    currentCart: ICartItem[],
    cartItem: IProduct,
    index: number,
    count: number,
    setCurrentCart: React.Dispatch<SetStateAction<ICartItem[]>>
  },
) {
  const [itemCount, setItemCount] = useState<number>(count);
  const [sum, setSum] = useState<number>(cartItem.price);
  const navigate: NavigateFunction = useNavigate();

  function increaseCount():void {
    if (itemCount >= cartItem.stock) {
      return;
    }
    setItemCount(itemCount + 1);
  }

  function decreaseCount():void {
    if (itemCount < 1) {
      return;
    }
    setItemCount(itemCount - 1);
  }

  function updateCart():void {
    const curCart: Array<ICartItem> = currentCart.map((item: ICartItem) => {
      const newItem: ICartItem = { ...item };
      if (newItem.id === cartItem.id) {
        newItem.count = itemCount;
      }
      return newItem;
    });
    setCurrentCart(curCart);
    localStorage.setItem('cart_@vFKSQ', JSON.stringify(curCart));
  }

  function removeFromCart():void {
    const filteredCart: Array<ICartItem> = currentCart
      .filter((item: ICartItem) => item.id !== cartItem.id);
    setCurrentCart(filteredCart);
    localStorage.setItem('cart_@vFKSQ', JSON.stringify(filteredCart));
  }

  function goToProductPage(e: React.MouseEvent):void {
    const target = e.target as HTMLElement;
    if (!target.closest('.item-cart__controls')) {
      navigate(`/product/${cartItem.id}`);
    }
  }

  useEffect(() => {
    if (itemCount < 1) {
      removeFromCart();
    } else {
      updateCart();
      setSum(itemCount * cartItem.price);
    }
  }, [itemCount]);

  return (
    <li className="cart__item item-cart" onClick={(e: React.MouseEvent):void => goToProductPage(e)} role="presentation">
      <div className="item-cart__number">{index}</div>
      <div className="item-cart__img-wrapper">
        <img className="cart-item__img" src={cartItem.thumbnail} alt={cartItem.title} />
      </div>
      <div className="item-cart__details">
        <h3 className="item-cart__title">{cartItem.title}</h3>
        <p className="item-cart__description">{cartItem.description}</p>
        <div className="item-cart__rating">{cartItem.rating}</div>
        <div className="item-cart__price">{`$${cartItem.price}`}</div>
      </div>
      <div className="item-cart__controls">
        <p className="item-cart__stock">
          <span className="item-cart__stock-label">Stock:</span>
          <span className="item-cart__stock-content">{cartItem.stock}</span>
        </p>
        <div className="item-cart__count-control control">
          <CartCountButton
            className="control__btn control__btn_decrease"
            onClick={():void => decreaseCount()}
            src={minusCircle}
          />
          <span className="control__count">{itemCount}</span>
          <CartCountButton
            className="control__btn control__btn_increase"
            onClick={():void => increaseCount()}
            src={plusCircle}
          />
        </div>
        <p className="item-cart__sum">{`$${sum}`}</p>
      </div>
    </li>
  );
}
