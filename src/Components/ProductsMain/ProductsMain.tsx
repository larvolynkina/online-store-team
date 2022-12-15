import React from 'react';
import ProductMain from '../ProductMain/ProductMain';
import { IProduct } from '../../types';
import './ProductsMain.scss';

type ProductsMainProps = {
  products: IProduct[];
}

function ProductsMain({ products }: ProductsMainProps) {
  return (
    <ul className="products">
      {products.map((product: IProduct) => <ProductMain key={product.id} product={product} />)}
    </ul>
  );
}

export default ProductsMain;
