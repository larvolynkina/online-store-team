/* eslint-disable no-unused-vars */
import React, { createContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductsMain from '../../Components/ProductsMain/ProductsMain';
import useFetch from '../../Hooks/useFetch';
import ProductFilterList from '../../Components/ProductFilterList/ProductFilterList';
import './index.scss';
import { IProduct } from '../../types';
import ProductsMainHeader from '../../Components/ProductsMainHeader/ProductsMainHeader';

type MainProps = {
  headerRender: () => void;
};

interface IFilterFunctions {
  category(items: IProduct[]): IProduct[];
  brand(items: IProduct[]): IProduct[];
  price(items: IProduct[]): IProduct[];
}

export const FilterContext = createContext<IProduct[]>([]);

function Main({ headerRender }: MainProps) {
  const [searchParams] = useSearchParams();
  const { products } = useFetch();

  function isFiltered(arr: IProduct[]) {
    const filterFunctions: IFilterFunctions = {
      category(items: IProduct[]) : IProduct[] {
        const categoryFilters = searchParams.getAll('category');
        const result: IProduct[][] = [];
        if (categoryFilters.length > 0) {
          categoryFilters.forEach((filter: string) => {
            result.push(
              items.filter((product: IProduct) => product.category === filter),
            );
          });
        }
        return result.flat();
      },

      brand(items: IProduct[]) : IProduct[] {
        const brandFilters = searchParams.getAll('brand');
        const result: IProduct[][] = [];
        if (brandFilters.length > 0) {
          brandFilters.forEach((filter: string) => {
            result.push(
              items.filter((product: IProduct) => product.brand === filter),
            );
          });
        }
        return result.flat();
      },

      price(items: IProduct[]) : IProduct[] {
        const priceFilters: string | null = searchParams.get('price');
        const result: IProduct[][] = [];
        if (priceFilters) {
          const priceFiltersArr: string[] = priceFilters.split('↕');
          const min: number = Math.min(...priceFiltersArr.map((item) => +item));
          const max: number = Math.max(...priceFiltersArr.map((item) => +item));
          result.push(
            items.filter((product: IProduct) => product.price >= min && product.price <= max),
          );
        }
        return result.flat();
      },
    };

    const allFilters: string[] = [];
    searchParams.forEach((_key, value) => {
      allFilters.push(value);
    });
    const uniqueFilters = [...new Set(allFilters)];

    function recursiveFilter(items: IProduct[], keys: string[]): IProduct[] {
      if (keys.length === 1) {
        return filterFunctions[keys[0] as keyof IFilterFunctions](items);
      }
      const newItems = filterFunctions[keys[0] as keyof IFilterFunctions](items);
      const newKeys: string[] = keys.filter((item: string) => item !== keys[0]);
      return recursiveFilter(newItems, newKeys);
    }

    if (uniqueFilters.length > 0) {
      return recursiveFilter(arr, uniqueFilters);
    }
    return arr;
  }

  const filtered = isFiltered(products);

  return (
    <FilterContext.Provider value={filtered}>
      <div className="container">
        <ProductFilterList />
        <div className="products-wrapper">
          <ProductsMainHeader />
          <ProductsMain headerRender={headerRender} products={filtered} />
        </div>
      </div>
    </FilterContext.Provider>
  );
}

export default Main;
