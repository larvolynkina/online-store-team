import { useParams } from 'react-router-dom';
import ProductCard from '../../Components/ProductCard';
import useFetch from '../../Hooks/useFetch';
import { IProduct } from '../../types';

function Product() {
  const { products } = useFetch();
  const params = useParams();
  const currentProduct = products.filter((item: IProduct) => item.id.toString() === params.id);

  return (
    <>
      <h1>Product</h1>
      <div>{currentProduct[0]?.title}</div>
      <ProductCard />
    </>
  );
}
export default Product;
