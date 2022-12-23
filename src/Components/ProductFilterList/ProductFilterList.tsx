import './ProductFilterList.scss';
import ProductFilter from '../ProductFilter/ProductFilter';
import useFetch from '../../Hooks/useFetch';
import { IProduct } from '../../types';
import DualSlider from '../DualSlider/DualSlider';
import FilterCopyButton from '../FilterCopyButton/FilterCopyButton';
import FilterResetButton from '../FilterResetButton/FilterResetButton';

function ProductFilterList() {
  const { products } = useFetch();
  const categories: string[] = [...new Set(products.map((item: IProduct) => item.category))];
  const brands: string[] = [...new Set(products.map((item: IProduct) => item.brand))];

  return (
    <div className="filter-wrapper">
      <div className="filter-buttons">
        <FilterResetButton />
        <FilterCopyButton />
      </div>
      <div className="filter-list">
        <ProductFilter name="Category" list={categories} />
        <ProductFilter name="Brand" list={brands} />
        <DualSlider name="Price" label="$" />
        <DualSlider name="Stock" label="" />
      </div>
    </div>

  );
}

export default ProductFilterList;
