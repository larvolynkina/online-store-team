import './index.scss';
import { useNavigate } from 'react-router-dom';

export default function ProductBuyButton(
  {
    headerRender,
    addItem,
    productInCart,
  }:
  {
    headerRender: () => void,
    addItem: () => void,
    productInCart: boolean
  },
) {
  const navigate = useNavigate();

  function goToCart() {
    if (!productInCart) {
      addItem();
      headerRender();
    }
    navigate('/shopping-cart');
  }
  return (
    <button type="button" className="btns-card__buy-now" onClick={() => goToCart()}>
      Buy now
    </button>
  );
}
