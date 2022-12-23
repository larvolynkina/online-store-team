import { useEffect, useState } from 'react';
import { ICartItem } from '../../types';
import './index.scss';
import SummaryPromo from '../SummaryPromo/SummaryPromo';

export default function CartSummary({ currentCart } : {currentCart: ICartItem[]}) {
  const totalProduct: number = currentCart.reduce((total, product) => total + product.count, 0);
  const getTotalSum = ():number => currentCart
    .reduce((total, product) => total + product.count * product.price, 0);

  const [discount, setDiscount] = useState<boolean>(false);
  const [totalClass, setTotalClass] = useState<string>('summary__total total');
  const [amount, setAmount] = useState<number>(():number => getTotalSum());
  const [total, setTotal] = useState<number>(():number => getTotalSum());

  useEffect(() => {
    if (discount) {
      setTotalClass('summary__total total discounted');
    } else {
      setTotalClass('summary__total total');
    }
  }, [discount]);

  useEffect(() => {
    setTotal(():number => getTotalSum());
  }, [currentCart]);

  return (
    <section className="cart__summary summary">
      <h3 className="summary__title">Summary</h3>
      <div className="summary__container">
        <div className="summary__products products-summary">
          <span className="products-summary__label">Products:</span>
          <span className="products-summary__output">{totalProduct}</span>
        </div>
        <div className={totalClass}>
          <span className="total__label">Total:</span>
          <span className="total__output">{`$${total}`}</span>
          {discount && <span className="total__discount">{`$${amount}`}</span>}
        </div>
        <SummaryPromo
          setDiscount={setDiscount}
          setAmount={setAmount}
          total={total}
        />
        <button type="button" className="summary__btn">Buy now</button>
      </div>
    </section>
  );
}
