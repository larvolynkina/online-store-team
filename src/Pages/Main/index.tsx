import ProductsMain from '../../Components/ProductsMain/ProductsMain';
import useFetch from '../../Hooks/useFetch';

function Main() {
  const { products } = useFetch();

  return (
    <>
      <h1>Main</h1>
      <ProductsMain products={products} />
    </>
  );
}

export default Main;
