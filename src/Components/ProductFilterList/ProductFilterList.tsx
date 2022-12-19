import './ProductFilterList.scss';
import ProductFilter from '../ProductFilter/ProductFilter';
import useFetch from '../../Hooks/useFetch';
import { IProduct } from '../../types';

function ProductFilterList() {
  const { products } = useFetch();
  const categories: string[] = [...new Set(products.map((item: IProduct) => item.category))];
  const brands: string[] = [...new Set(products.map((item: IProduct) => item.brand))];

  return (
    <div className="filter-list">
      <ProductFilter name="Category" list={categories} />
      <ProductFilter name="Brand" list={brands} />
    </div>
  );
}

export default ProductFilterList;
