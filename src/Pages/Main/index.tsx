import ProductsMain from '../../Components/ProductsMain/ProductsMain';
import useFetch from '../../Hooks/useFetch';

type MainProps = {
  headerRender: () => void;
}

function Main({ headerRender }: MainProps) {
  const { products } = useFetch();

  return (
    <>
      <h1>Main</h1>
      <ProductsMain headerRender={headerRender} products={products} />
    </>
  );
}

export default Main;
