import React, { useEffect, useState } from 'react';
import { ICartItem, TPromocodes, TStateAction } from '../../types';
import './index.scss';
import SummaryPromo from '../SummaryPromo/SummaryPromo';

export default function CartSummary({ currentCart, setModalVisible }:
  {currentCart: ICartItem[], setModalVisible: TStateAction<boolean>}) {
  const totalProduct: number = currentCart
    .reduce((total: number, product: ICartItem) => total + product.count, 0);

  const getTotalSum = ():number => currentCart
    .reduce((total: number, product: ICartItem) => total + product.count * product.price, 0);

  const storagePromo: string | null = localStorage.getItem('promo_@vFKSQ');
  const promocodes: TPromocodes = storagePromo ? JSON.parse(storagePromo) : {};

  const [discount, setDiscount] = useState<boolean>(Object.keys(promocodes).length > 0);
  const [amount, setAmount] = useState<number>(():number => getTotalSum());
  const [total, setTotal] = useState<number>(():number => getTotalSum());

  useEffect(() => {
    setTotal(():number => getTotalSum());
  }, [currentCart]);

  return (
    <section className="cart__summary summary">
      <header className="summary__header">
        <h3 className="summary__title">Summary</h3>
      </header>
      <div className="summary__container">
        <div className="summary__products products-summary">
          <span className="products-summary__label">Products:</span>
          <span className="products-summary__output">{totalProduct}</span>
        </div>
        <div className={discount ? 'summary__total total discounted' : 'summary__total total'}>
          <span className="total__label">Total:</span>
          <span className="total__output">{`$${total}`}</span>
          {discount && <span className="total__discount">{`$${amount}`}</span>}
        </div>
        <SummaryPromo
          setDiscount={setDiscount}
          setAmount={setAmount}
          total={total}
          promocodes={promocodes}
        />
        <button type="button" className="summary__btn" onClick={():void => setModalVisible(true)}>Buy now</button>
      </div>
    </section>
  );
}
