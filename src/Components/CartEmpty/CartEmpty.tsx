import { Link } from 'react-router-dom';

export default function CartEmptyPlug() {
  return (
    <div className="cart__plug">
      <p>Cart is empty</p>
      <Link to="/">Continue shopping</Link>
    </div>
  );
}
