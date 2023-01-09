import { Link } from 'react-router-dom';
import './index.scss';

export default function CartEmptyPlug({ isOrder } : { isOrder: boolean }) {
  return (
    <>
      {isOrder
      && (
      <div className="cart__order">
        <p className="cart__order-item">Order successfully completed.</p>
        <p className="cart__order-item">You will be redirected to the products page...</p>
      </div>
      )}
      {!isOrder
         && (
         <div className="cart__empty">
           <p className="cart__empty-message">Cart is empty</p>
           <Link to="/" className="cart__empty-link">Go shopping</Link>
         </div>
         )}
    </>
  );
}
