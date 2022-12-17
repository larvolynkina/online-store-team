import './index.scss';
import { NavigateFunction, useNavigate } from 'react-router-dom';

type HeaderProps = {
  headerCartCount: number;
  headerCartSum: number;
}

export default function Header({ headerCartCount, headerCartSum }: HeaderProps) {
  const navigate: NavigateFunction = useNavigate();
  return (
    <header className="header">
      <button type="button" onClick={() => navigate('/')} className="header__logo">Online Store</button>
      <p className="header__cart-total">
        Cart total:
        {' '}
        <span>
          $
          {headerCartSum}
        </span>
      </p>
      <div className="header__cart">{headerCartCount}</div>
    </header>
  );
}
