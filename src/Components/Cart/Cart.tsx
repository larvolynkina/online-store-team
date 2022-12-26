import './index.scss';
import React, { SetStateAction, useEffect, useState } from 'react';
import CartList from '../CartList/CartList';
import CartEmpty from '../CartEmpty/CartEmpty';
import CartSummary from '../CartSummary/CartSummary';
import { IProduct, ICartItem } from '../../types';

export default function Cart(
  {
    products,
    setModalVisible,
    headerRender,
    isCartEmpty,
    cart,
  }:
  {
    products: Array<IProduct>,
    setModalVisible: React.Dispatch<SetStateAction<boolean>>,
    headerRender: () => void,
    isCartEmpty: boolean,
    cart: Array<ICartItem>
  },
) {
  const [currentCart, setCurrentCart] = useState<ICartItem[]>(cart);

  useEffect(() => {
    headerRender();
  }, [currentCart]);

  useEffect(() => {
    if (isCartEmpty) {
      setCurrentCart([]);
      localStorage.setItem('cart_@vFKSQ', JSON.stringify([]));
    }
  }, [isCartEmpty]);

  return (
    <div className="cart">
      {currentCart.length
        ? (
          <>
            <section className="cart__items ">
              <header className="cart__header">Products In Cart</header>
              <CartList
                currentCart={currentCart}
                setCurrentCart={setCurrentCart}
                products={products}
              />
            </section>
            <CartSummary currentCart={currentCart} setModalVisible={setModalVisible} />
          </>
        )
        : <CartEmpty />}
    </div>
  );
}
