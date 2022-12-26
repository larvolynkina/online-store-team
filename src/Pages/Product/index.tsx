import React, { SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../Components/ProductCard/ProductCard';
import ProductBreadcrumbs from '../../Components/ProductBreadcrumbs/ProductBreadcrumbs';
import useFetch from '../../Hooks/useFetch';
import { IProduct } from '../../types';

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
      <h1>Product</h1>
      {currentProduct
        ? (
          <div className="product-page">
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
        )
        : <h1>Страница не найдена</h1>}
    </>
  );
}
export default Product;
