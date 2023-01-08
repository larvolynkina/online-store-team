import Cart from '../../Components/Cart/Cart';
import useFetch from '../../Hooks/useFetch';
import { ICartItem, TStateAction } from '../../types';

export default function ShoppingCart(
  {
    setModalVisible,
    headerRender,
    isCartEmpty,
    setCartEmpty,
    cart,
    isOrder,
  }:
  {
    setModalVisible: TStateAction<boolean>,
    headerRender: () => void,
    isCartEmpty: boolean,
    setCartEmpty: TStateAction<boolean>,
    cart: Array<ICartItem>,
    isOrder: boolean
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
      isOrder={isOrder}
    />
  );
}
