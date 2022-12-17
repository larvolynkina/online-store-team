import ProductsMain from '../../Components/ProductsMain/ProductsMain';
import useFetch from '../../Hooks/useFetch';
import { IProduct } from '../../types';

type MainProps = {
  headerRender: () => void;
}

function Main({ headerRender }: MainProps) {
  const { products } = useFetch();
  const categories: string[] = [...new Set(products.map((item: IProduct) => item.category))];
  const brands: string[] = [...new Set(products.map((item: IProduct) => item.brand))];
  console.log(categories, brands);

  return (
    <>
      <h1>Main</h1>
      <ProductsMain headerRender={headerRender} products={products} />
    </>
  );
}

export default Main;
