import { useParams } from 'react-router-dom';
import ProductCard from '../../Components/ProductCard/ProductCard';
import useFetch from '../../Hooks/useFetch';
import { IProduct } from '../../types';

function Product() {
  const { products } = useFetch();
  const params = useParams();
  const currentProduct: IProduct | undefined = products
    .find((item: IProduct) => item.id.toString() === params.id);

  return (
    <>
      <h1>Product</h1>
      {currentProduct ? (
        <ProductCard
          title={currentProduct.title}
          images={currentProduct.images}
          brand={currentProduct.brand}
          category={currentProduct.category}
          description={currentProduct.description}
          price={currentProduct.price}
          stock={currentProduct.stock}
          rating={currentProduct.rating}
        />
      ) : <h1>Страница не найдена</h1>}
    </>
  );
}
export default Product;
