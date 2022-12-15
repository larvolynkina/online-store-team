import React, { useEffect, useState } from 'react';
import ProductsMain from '../../Components/ProductsMain/ProductsMain';
import { IProduct, IData } from '../../types';

function Main() {
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

  return (
    <>
      <h1>Main</h1>
      <ProductsMain products={products} />
    </>
  );
}

export default Main;
