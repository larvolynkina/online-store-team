import './index.scss';
import CartList from '../CartList/CartList';
import CartSummary from '../CartSummary/CartSummary';

export default function Cart() {
  return (
    <div className="cart">
      <CartList />
      <CartSummary />
    </div>
  );
}
