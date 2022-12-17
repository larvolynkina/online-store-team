import { useState } from 'react';
import './index.scss';

export default function ProductCartButton() {
  const [product, setProduct] = useState(false);
  const btnInner: string = product ? 'Remove from cart' : 'Add to cart';
  return (
    <button type="button" className="btns-card__cart" onClick={():void => setProduct(!product)}>{btnInner}</button>
  );
}
