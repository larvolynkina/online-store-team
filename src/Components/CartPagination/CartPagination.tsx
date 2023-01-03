import React, { useEffect, useState } from 'react';
import { ICartItem } from '../../types';
import './index.scss';
import CartPaginationItem from '../CartPaginationItem/CartPaginationItem';
import doubleArrowLeft from '../../assets/icons/doubleArrowLeft.svg';
import doubleArrowRight from '../../assets/icons/doubleArrowRight.svg';

export default function CartPagination(
  {
    currentCart,
    itemsPerPage,
    setCurrentPage,
    setQueryParams,
    currentPage,
  } :
  {
    currentCart: ICartItem[],
    itemsPerPage: number,
    setCurrentPage: (number: number) => void,
    setQueryParams: (key: string, value: string) => void,
    currentPage: number,
  },
) {
  const [isDisabledPrevBtn, setDisabledPrevBtn] = useState(false);
  const [isDisabledNextBtn, setDisabledNextBtn] = useState(false);

  const totalPages: number = Math.ceil(currentCart.length / itemsPerPage);

  function createBtns(): Array<number> {
    const btns: Array<number> = [];
    for (let i = 1; i <= totalPages; i += 1) {
      btns.push(i);
    }
    return btns;
  }

  function goNext(): void {
    setCurrentPage(currentPage + 1);
    setQueryParams('page', String(currentPage));
  }

  function goPrev(): void {
    setCurrentPage(currentPage - 1);
    setQueryParams('page', String(currentPage));
  }

  useEffect(() => {
    if (currentPage === 1) {
      setDisabledPrevBtn(true);
    } else {
      setDisabledPrevBtn(false);
    }

    if (currentPage === totalPages) {
      setDisabledNextBtn(true);
    } else {
      setDisabledNextBtn(false);
    }
  }, [currentPage, totalPages]);

  const pagesBtns: Array<number> = createBtns();

  return (
    <nav className="cart__nav nav">
      <ul className="nav__list">
        <li className="nav__item">
          <button
            type="button"
            disabled={isDisabledPrevBtn}
            className="nav__btn nav__btn_prev"
            onClick={(): void => goPrev()}
          >
            <img src={doubleArrowLeft} alt="go previous" />
          </button>
        </li>
        {pagesBtns.map((page: number) => (
          <CartPaginationItem
            page={page}
            key={page}
            setCurrentPage={(number: number): void => setCurrentPage(number)}
            setQueryParams={setQueryParams}
            currentPage={currentPage}
          />
        ))}
        <li className="nav__item">
          <button
            type="button"
            disabled={isDisabledNextBtn}
            className="nav__btn nav__btn_next"
            onClick={(): void => goNext()}
          >
            <img src={doubleArrowRight} alt="go next" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
