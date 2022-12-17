import './index.scss';
import { Link } from 'react-router-dom';

export default function ProductBuyButton() {
  function showAlert() {
    alert('Типа модалка :))');
  }
  return (
    <Link
      to="/shopping-cart"
      className="btns-card__buy-now"
      onClick={
      ():void => {
        setTimeout(showAlert, 500);
      }
      }
    >
      Buy now
    </Link>
  );
}
