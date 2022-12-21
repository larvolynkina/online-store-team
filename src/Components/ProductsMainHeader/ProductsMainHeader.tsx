import { useContext, useState, useEffect } from 'react';
import './ProductsMainHeader.scss';
import { IProduct } from '../../types';
import { FilterContext } from '../../Pages/Main';

function ProductsMainHeader() {
  const [total, setTotal] = useState<number>(0);
  const filtered: IProduct[] = useContext<IProduct[]>(FilterContext);

  function getTotal(array: IProduct[]): number {
    return array.length;
  }

  useEffect(() => {
    setTotal(getTotal(filtered));
  }, [filtered]);

  return (
    <div className="products-header">
      <p>
        Found:
        {' '}
        <span className="products-header__total">{total}</span>
      </p>
    </div>
  );
}

export default ProductsMainHeader;
