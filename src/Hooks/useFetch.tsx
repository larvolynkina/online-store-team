import { useState, useEffect } from 'react';
import { IProduct } from '../types';
import data from '../assets/products.json';

function useFetch() {
  const [products, setProducts] = useState<IProduct[]>([]);

  function fetchData() {
    setProducts(data.products);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return { products };
}

export default useFetch;
