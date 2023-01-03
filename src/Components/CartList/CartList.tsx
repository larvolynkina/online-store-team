import React, { SetStateAction } from 'react';
import { IProduct, ICartItem } from '../../types';
import CartItem from '../CartItem/CartItem';
import './index.scss';

export default function CartList(
  {
    products,
    currentCart,
    currentItems,
    setCurrentCart,
    setCartEmpty,
  }:
  {
    products: Array<IProduct>,
    currentCart: Array<ICartItem>,
    currentItems: Array<ICartItem>,
    setCurrentCart: React.Dispatch<SetStateAction<ICartItem[]>>,
    setCartEmpty: React.Dispatch<SetStateAction<boolean>>
  },
) {
  function getCartItems():IProduct[] {
    const itemsArr: IProduct[] = [];
    currentItems.forEach((element: ICartItem) => {
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
          index={currentCart.findIndex((el) => el.id === cartItem.id) + 1}
          count={currentCart[index].count}
          currentCart={currentCart}
          setCurrentCart={setCurrentCart}
          setCartEmpty={setCartEmpty}
        />
      ))}
    </ul>
  );
}
