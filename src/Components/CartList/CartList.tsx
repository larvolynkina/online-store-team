import useFetch from '../../Hooks/useFetch';
import CartItem from '../CartItem/CartItem';
import './index.scss';

export default function CartList() {
  const { products } = useFetch();
  return (
    <section className="cart__items ">
      <header className="cart__header">Шапка</header>
      <ul className="cart__list">
        {products.map((product, index) => (
          <CartItem
            product={product}
            key={product.id}
            index={index}
          />
        ))}
      </ul>
    </section>
  );
}
