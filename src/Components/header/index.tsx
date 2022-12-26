import React from 'react';
import './index.scss';
import { NavigateFunction, useNavigate } from 'react-router-dom';

type HeaderProps = {
  headerCartCount: number;
  headerCartSum: number;
}

export default function Header({ headerCartCount, headerCartSum }: HeaderProps) {
  const navigate: NavigateFunction = useNavigate();

  function addKeyHandlerOnCart(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter') {
      navigate('/shopping-cart');
    }
  }

  return (
    <header className="header">
      <div className="header__wrapper">
        <button type="button" onClick={() => navigate('/')} className="header__logo">Online Store</button>
        <p className="header__cart-total">
          Cart total:
          {' '}
          <span>
            $
            {headerCartSum}
          </span>
        </p>
        <div
          onClick={() => navigate('/shopping-cart')}
          onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => addKeyHandlerOnCart(event)}
          className="header__cart"
          role="button"
          tabIndex={0}
        >
          <button className="header__cart-button" type="button" aria-label="Go to cart" />
          <div>{headerCartCount}</div>
        </div>
      </div>
    </header>
  );
}
