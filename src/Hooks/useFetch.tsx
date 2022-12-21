import { useState, useEffect } from 'react';
import { IProduct } from '../types';
import data from '../assets/products.json';

function useFetch() {
  const [products, setProducts] = useState<IProduct[]>([]);

  function fetchData() {
    setProducts(data.products);
    console.log('setProducts');
  }

  useEffect(() => {
    fetchData();
  }, []);
  return { products, setProducts };
}

export default useFetch;
