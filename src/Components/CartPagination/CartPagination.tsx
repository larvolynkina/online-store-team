import React from 'react';
import { ICartItem } from '../../types';
import './index.scss';
import CartPaginationItem from '../CartPaginationItem/CartPaginationItem';

export default function CartPagination(
  {
    currentCart,
    itemsPerPage,
    setCurrentPage,
    setQueryParams,
  } :
  {
    currentCart: ICartItem[],
    itemsPerPage: number,
    setCurrentPage: (number: number) => void,
    setQueryParams: (key: string, value: string) => void,
  },
) {
  function createBtns() {
    const btns = [];
    for (let i = 1; i <= Math.ceil(currentCart.length / itemsPerPage); i += 1) {
      btns.push(i);
    }
    return btns;
  }

  const pagesBtns = createBtns();

  return (
    <nav className="cart__nav nav">
      <ul className="nav__list">
        {pagesBtns.map((btnNum: number) => (
          <CartPaginationItem
            btnNum={btnNum}
            key={btnNum}
            setCurrentPage={(number: number) => setCurrentPage(number)}
            setQueryParams={setQueryParams}
          />
        ))}
      </ul>
    </nav>
  );
}
