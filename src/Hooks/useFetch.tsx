import { useState, useEffect } from 'react';
import { IProduct, IData } from '../types';

function useFetch() {
  const [products, setProducts] = useState<IProduct[]>([]);

  async function fetchData(): Promise<void> {
    try {
      const data: Response = await fetch('https://dummyjson.com/products?limit=10');
      const res: IData = await data.json();
      setProducts(res.products);
    } catch (err: unknown) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return { products };
}

export default useFetch;
