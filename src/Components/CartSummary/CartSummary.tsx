import './index.scss';

export default function CartSummary() {
  return (
    <section className="cart__summary summary">
      <header className="summary__header">
        <h3 className="summary__title">Summary</h3>
      </header>
      <p className="summary__products">Products: 0</p>
      <p className="summary__total">Total: 0</p>
      <input type="text" placeholder="Enter promo code" />
      <p className="summary__promo">Promo for test: RS, EPM</p>
      <button type="button" className="summary__btn">Buy now</button>
    </section>
  );
}
