import React, { SetStateAction } from 'react';
import Cart from '../../Components/Cart/Cart';
import useFetch from '../../Hooks/useFetch';
import { ICartItem } from '../../types';

export default function ShoppingCart(
  {
    setModalVisible,
    headerRender,
    isCartEmpty,
    cart,
  }:
  {
    setModalVisible: React.Dispatch<SetStateAction<boolean>>,
    headerRender: () => void,
    isCartEmpty: boolean,
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
    />
  );
}
