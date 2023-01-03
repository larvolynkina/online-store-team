import './index.scss';

export default function CartPaginationItem(
  {
    page,
    setCurrentPage,
    setQueryParams,
    currentPage,
  } :
  {
    page: number,
    setCurrentPage: (number: number) => void,
    setQueryParams: (key: string, value: string) => void,
    currentPage: number,
  },
) {
  return (
    <li className="nav__item">
      <button
        type="button"
        className={currentPage === page ? 'nav__btn active' : 'nav__btn'}
        onClick={():void => {
          setCurrentPage(+page);
          setQueryParams('page', String(page));
        }}
      >
        {page}
      </button>
    </li>
  );
}
