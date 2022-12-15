import { Data } from './data';

export default function ProductCardTitle({ title } : Pick<Data, 'title'>) {
  return (
    <h2 className="card-product__title">{title}</h2>
  );
}
