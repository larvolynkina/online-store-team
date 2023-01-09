import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductMain from '../ProductMain/ProductMain';
import { IProduct, TStateAction } from '../../types';
import './ProductsMain.scss';

type ProductsMainProps = {
  products: IProduct[];
  headerRender: () => void;
  setCartEmpty: TStateAction<boolean>;
};

function ProductsMain({ products, headerRender, setCartEmpty }: ProductsMainProps) {
  const [className, setClassName] = useState('products');
  const [searchParams] = useSearchParams();

  function checkProductsView() {
    const view = searchParams.get('view');
    if (view) {
      if (view === 'grid') {
        setClassName('products');
      }
      if (view === 'list') {
        setClassName('products products_list');
      }
    } else {
      setClassName('products');
    }
  }

  useEffect(() => {
    checkProductsView();
  }, [searchParams]);

  return (
    <ul className={className}>
      {products.map((product: IProduct) => (
        <ProductMain
          key={product.id}
          product={product}
          headerRender={headerRender}
          setCartEmpty={setCartEmpty}
        />
      ))}
    </ul>
  );
}

export default ProductsMain;
