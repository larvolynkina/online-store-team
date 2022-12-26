import React, { SetStateAction } from 'react';
import Cart from '../../Components/Cart/Cart';
import useFetch from '../../Hooks/useFetch';

export default function ShoppingCart({ headerRender, setModalVisible }:
  { headerRender: () => void, setModalVisible: React.Dispatch<SetStateAction<boolean>>}) {
  const { products } = useFetch();
  return (
    <>
      <h1>Shopping Cart</h1>
      <Cart products={products} headerRender={headerRender} setModalVisible={setModalVisible} />
    </>
  );
}
