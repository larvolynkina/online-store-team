import React from 'react';
import ProductMain from '../ProductMain/ProductMain';
import { IProduct } from '../../types';
import './ProductsMain.scss';

type ProductsMainProps = {
  products: IProduct[];
  headerRender: () => void;
};

function ProductsMain({ products, headerRender }: ProductsMainProps) {
  return (
    <ul className="products">
      {products.map((product: IProduct) => (
        <ProductMain key={product.id} product={product} headerRender={headerRender} />
      ))}
    </ul>
  );
}

export default ProductsMain;
