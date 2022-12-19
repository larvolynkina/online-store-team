import React, { createContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductsMain from '../../Components/ProductsMain/ProductsMain';
import useFetch from '../../Hooks/useFetch';
import ProductFilterList from '../../Components/ProductFilterList/ProductFilterList';
import './index.scss';
import { IProduct } from '../../types';

type MainProps = {
  headerRender: () => void;
};

// interface IFilterContextObject {
//   filtered: IProduct[],
// }

// type TFilter = {
//   [key: string]: string;
// };

export const FilterContext = createContext<IProduct[]>([]);

function Main({ headerRender }: MainProps) {
  const [searchParams] = useSearchParams();
  const { products } = useFetch();

  function isFiltered(arr: IProduct[]) {
    const categoryfiltered: IProduct[][] = [];
    const brandFiltered: IProduct[][] = [];
    if (searchParams.toString()) {
      const categoryFilters = searchParams.getAll('category');
      if (categoryFilters.length > 0) {
        categoryFilters.forEach((filter: string) => {
          categoryfiltered.push(arr.filter((product: IProduct) => product.category === filter));
        });
      } else {
        categoryfiltered.push(arr);
      }
      const brandFilters = searchParams.getAll('brand');
      if (brandFilters.length > 0) {
        brandFilters.forEach((filter: string) => {
          brandFiltered.push(
            categoryfiltered.flat().filter((product: IProduct) => product.brand === filter),
          );
        });
        return brandFiltered.flat();
      }
      return categoryfiltered.flat();
    }
    return arr;
  }

  const filtered = isFiltered(products);

  return (
    <FilterContext.Provider value={filtered}>
      <div className="container">
        <ProductFilterList />
        <ProductsMain headerRender={headerRender} products={filtered} />
      </div>
    </FilterContext.Provider>
  );
}

export default Main;
