import './ProductFilterList.scss';
import { useState } from 'react';
import ProductFilter from '../ProductFilter/ProductFilter';
import useFetch from '../../Hooks/useFetch';
import { IProduct } from '../../types';
import DualSlider from '../DualSlider/DualSlider';
import FilterCopyButton from '../FilterCopyButton/FilterCopyButton';
import FilterResetButton from '../FilterResetButton/FilterResetButton';

function ProductFilterList() {
  const { products } = useFetch();
  const [filtersClass, setFilterClass] = useState('filter-wrapper');
  const [closefilterClass, setCloseFilterClass] = useState('filter-close');
  const [filterOverlayClass, setFilterOverlayClass] = useState('filter-overlay');
  const [isModalActive, setIsModalActive] = useState(false);
  const categories: string[] = [...new Set(products.map((item: IProduct) => item.category))];
  const brands: string[] = [...new Set(products.map((item: IProduct) => item.brand))];

  function showFilters(): void {
    if (!isModalActive) {
      setFilterClass('filter-wrapper filter-wrapper_active');
      setCloseFilterClass('filter-close filter-close_active');
      setFilterOverlayClass('filter-overlay filter-overlay_active');
      setIsModalActive(true);
    } else {
      setFilterClass('filter-wrapper');
      setCloseFilterClass('filter-close');
      setFilterOverlayClass('filter-overlay');
      setIsModalActive(false);
    }
  }

  return (
    <>
      <div className={filtersClass}>
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
        <button onClick={showFilters} className={closefilterClass} type="button" aria-label="close filter panel" />
      </div>
      <button type="button" onClick={showFilters} className={filterOverlayClass} aria-label="filter-overlay close" />
    </>
  );
}

export default ProductFilterList;
