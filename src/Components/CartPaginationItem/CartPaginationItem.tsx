export default function CartPaginationItem({ btn, setPage } :
  { btn: number, setPage: (number: number) => void}) {
  return (
    <li className="nav__item">
      <button type="button" className="nav__btn" onClick={() => setPage(btn)}>{btn}</button>
    </li>
  );
}
