import { useState, useEffect, useContext } from 'react';
import { IProduct } from '../../types';
import { FilterContext } from '../../Pages/Main';

function ProductTotal() {
  const [total, setTotal] = useState<number>(0);
  const filtered: IProduct[] = useContext<IProduct[]>(FilterContext);

  function getTotal(array: IProduct[]): number {
    return array.length;
  }

  useEffect(() => {
    setTotal(getTotal(filtered));
  }, [filtered]);

  return (
    <p className="products-header__total">
      Found:
      {' '}
      <span>{total}</span>
    </p>
  );
}

export default ProductTotal;
