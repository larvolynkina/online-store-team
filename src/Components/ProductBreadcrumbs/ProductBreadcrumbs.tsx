import { Link } from 'react-router-dom';
import { TBreadcrumbs } from '../../types';
import './index.scss';

export default function ProductBreadcrumbs({ category, brand, title }: TBreadcrumbs) {
  return (
    <div className="product-page__breadcrumbs breadcrumbs">
      <Link to="/" className="breadcrumbs__item breadcrumbs__item_store">Store</Link>
      <p className="breadcrumbs__item">{category}</p>
      <p className="breadcrumbs__item">{brand}</p>
      <p className="breadcrumbs__item">{title}</p>
    </div>
  );
}
