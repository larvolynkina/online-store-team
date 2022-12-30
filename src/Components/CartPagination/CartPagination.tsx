import { ICartItem } from '../../types';
import './index.scss';
import CartPaginationItem from '../CartPaginationItem/CartPaginationItem';

export default function CartPagination(
  {
    currentCart,
    itemsPerPage,
    setPage,
  } :
  {
    currentCart: ICartItem[],
    itemsPerPage: number,
    setPage: (number: number) => void
  },
) {
  const pagesBtns = [];

  for (let i = 1; i <= Math.ceil(currentCart.length / itemsPerPage); i += 1) {
    pagesBtns.push(i);
  }
  return (
    <nav className="cart__nav nav">
      <ul className="nav__list">
        {pagesBtns.map((btn: number) => (
          <CartPaginationItem
            btn={btn}
            key={btn}
            setPage={(number: number) => setPage(number)}
          />
        ))}
      </ul>
    </nav>
  );
}
