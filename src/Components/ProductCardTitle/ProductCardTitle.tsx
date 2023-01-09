import { IProduct } from '../../types';
import './index.scss';

export default function ProductCardTitle({ title } : Partial<IProduct>) {
  return (
    <h2 className="card-product__title">{title}</h2>
  );
}
