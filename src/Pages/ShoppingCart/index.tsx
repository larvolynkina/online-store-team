import React, { Dispatch, SetStateAction } from 'react';
import Cart from '../../Components/Cart/Cart';
import useFetch from '../../Hooks/useFetch';
import { ICartItem } from '../../types';

export default function ShoppingCart(
  {
    setModalVisible,
    headerRender,
    isCartEmpty,
    setCartEmpty,
    cart,
  }:
  {
    setModalVisible: React.Dispatch<SetStateAction<boolean>>,
    headerRender: () => void,
    isCartEmpty: boolean,
    setCartEmpty: Dispatch<SetStateAction<boolean>>,
    cart: Array<ICartItem>
  },
) {
  const { products } = useFetch();

  return (
    <Cart
      isCartEmpty={isCartEmpty}
      products={products}
      setModalVisible={setModalVisible}
      headerRender={headerRender}
      cart={cart}
      setCartEmpty={setCartEmpty}
    />
  );
}
