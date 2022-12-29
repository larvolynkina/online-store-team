import React, { SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import { IProduct } from '../../types';
import ProductBreadcrumbs from '../../Components/ProductBreadcrumbs/ProductBreadcrumbs';
import ProductCard from '../../Components/ProductCard/ProductCard';
import Error from '../Error';
import './index.scss';

function Product(
  {
    headerRender,
    setModalVisible,
    setCartEmpty,
  }:
  {
    headerRender: () => void,
    setModalVisible: React.Dispatch<SetStateAction<boolean>>,
    setCartEmpty: React.Dispatch<SetStateAction<boolean>>
  },
) {
  const { products } = useFetch();
  const params = useParams();
  const currentProduct: IProduct | undefined = products
    .find((item: IProduct) => item.id.toString() === params.id);

  return (
    <>
      {currentProduct && (
      <div className="product-page">
        <div className="product-page__wrapper">
          <ProductBreadcrumbs
            category={currentProduct.category}
            brand={currentProduct.brand}
            title={currentProduct.title}
          />
          <ProductCard
            product={currentProduct}
            products={products}
            headerRender={headerRender}
            setModalVisible={setModalVisible}
            setCartEmpty={setCartEmpty}
          />
        </div>
      </div>
      )}
      {!currentProduct && <Error />}
    </>
  );
}
export default Product;
