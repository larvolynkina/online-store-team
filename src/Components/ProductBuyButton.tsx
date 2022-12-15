import { Link } from 'react-router-dom';

export default function ProductBuyButton({ className } : {className: string}) {
  return (
    <Link to="/shopping-cart" className={className}>Buy now</Link>
  );
}
