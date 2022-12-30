import './index.scss';
import React from 'react';

export default function CartPaginationItem(
  {
    btnNum,
    setCurrentPage,
    setQueryParams,
  } :
  {
    btnNum: number,
    setCurrentPage: (number: number) => void,
    setQueryParams: (key: string, value: string) => void
  },
) {
  return (
    <li className="nav__item">
      <button
        type="button"
        className="nav__btn"
        onClick={():void => {
          setCurrentPage(btnNum);
          setQueryParams('page', String(btnNum));
        }}
      >
        {btnNum}
      </button>
    </li>
  );
}
