// import { NavLink } from 'react-router-dom';
import './index.scss';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate: NavigateFunction = useNavigate();
  return (
    <header className="header">
      <button type="button" onClick={() => navigate('/')} className="header__logo">Online Store</button>
      <p className="header__cart-total">
        Cart total:
        {' '}
        <span>$0</span>
      </p>
      <p className="header__cart">
        0
      </p>
    </header>
  );
}
