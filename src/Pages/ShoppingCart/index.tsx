import React, { SetStateAction } from 'react';
import Cart from '../../Components/Cart/Cart';
import useFetch from '../../Hooks/useFetch';

export default function ShoppingCart(
  {
    setModalVisible,
    headerRender,
    isCartEmpty,
  }:
  {
    setModalVisible: React.Dispatch<SetStateAction<boolean>>,
    headerRender: () => void,
    isCartEmpty: boolean
  },
) {
  const { products } = useFetch();

  return (
    <Cart
      isCartEmpty={isCartEmpty}
      products={products}
      setModalVisible={setModalVisible}
      headerRender={headerRender}
    />
  );
}
