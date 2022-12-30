import './index.scss';
import { Link } from 'react-router-dom';

export default function CartPaginationItem({ btnNum, setCurrentPage, itemsPerPage } :
  { btnNum: number, setCurrentPage: (number: number) => void, itemsPerPage: number}) {
  return (
    <li className="nav__item">
      <Link
        to={`/shopping-cart?page=${btnNum}&itemsPerPage=${itemsPerPage}`}
        type="button"
        className="nav__btn"
        onClick={() => setCurrentPage(btnNum)}
      >
        {btnNum}
      </Link>
    </li>
  );
}
