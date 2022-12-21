import React, { SetStateAction } from 'react';
import { IProduct, ICartItem } from '../../types';
import CartItem from '../CartItem/CartItem';
import './index.scss';

export default function CartList(
  {
    products,
    currentCart,
    setCurrentCart,
  }:
  {
    products: Array<IProduct>,
    currentCart: Array<ICartItem>,
    setCurrentCart: React.Dispatch<SetStateAction<ICartItem[]>>
  },
) {
  function getCartItems():IProduct[] {
    const itemsArr: IProduct[] = [];
    currentCart.forEach((element: ICartItem) => {
      const curItem: IProduct | undefined = products
        .find((el: IProduct) => el.id === element.id);
      if (curItem) {
        itemsArr.push(curItem);
      }
    });
    return itemsArr;
  }

  const cartItems: IProduct[] = getCartItems();

  return (
    <ul className="cart__list">
      {cartItems.map((cartItem: IProduct, index: number) => (
        <CartItem
          cartItem={cartItem}
          key={cartItem.id}
          index={index + 1}
          count={currentCart[index].count}
          currentCart={currentCart}
          setCurrentCart={setCurrentCart}
        />
      ))}
    </ul>
  );
}
