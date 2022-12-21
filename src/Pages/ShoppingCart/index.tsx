import Cart from '../../Components/Cart/Cart';
import useFetch from '../../Hooks/useFetch';

export default function ShoppingCart({ headerRender }: { headerRender: () => void }) {
  const { products } = useFetch();
  return (
    <>
      <h1>Shopping Cart</h1>
      <Cart products={products} headerRender={headerRender} />
    </>
  );
}
