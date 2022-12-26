/* eslint-disable no-unused-vars */
import React, { createContext, SetStateAction } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductsMain from '../../Components/ProductsMain/ProductsMain';
import useFetch from '../../Hooks/useFetch';
import ProductFilterList from '../../Components/ProductFilterList/ProductFilterList';
import './index.scss';
import { IProduct } from '../../types';
import ProductsMainHeader from '../../Components/ProductsMainHeader/ProductsMainHeader';
import ProductsNotFound from '../../Components/ProductsNotFound/ProductsNotFound';

type MainProps = {
  headerRender: () => void;
  setCartEmpty: React.Dispatch<SetStateAction<boolean>>;
};

interface IFilterFunctions {
  category(items: IProduct[], value: string): IProduct[];
  brand(items: IProduct[], value: string): IProduct[];
  price(items: IProduct[], value: string): IProduct[];
  stock(items: IProduct[], value: string): IProduct[];
  count(items: IProduct[], value: string): IProduct[];
  filter(items: IProduct[], value: string): IProduct[];
  search(items: IProduct[], value: string): IProduct[];
  sort(items: IProduct[], value: string): IProduct[];
}

export const FilterContext = createContext<IProduct[]>([]);

function Main({ headerRender, setCartEmpty }: MainProps) {
  const [searchParams] = useSearchParams();
  const { products } = useFetch();

  function isFiltered(arr: IProduct[]) {
    const filterFunctions: IFilterFunctions = {
      category(items: IProduct[], value: string): IProduct[] {
        return filterFunctions.filter(items, value);
      },

      brand(items: IProduct[], value: string): IProduct[] {
        return filterFunctions.filter(items, value);
      },

      price(items: IProduct[], value: string): IProduct[] {
        return filterFunctions.count(items, value);
      },

      stock(items: IProduct[], value: string): IProduct[] {
        return filterFunctions.count(items, value);
      },

      filter(items: IProduct[], value: string) {
        const propertyFilters = searchParams.getAll(value);
        const result: IProduct[][] = [];
        if (propertyFilters.length > 0) {
          propertyFilters.forEach((filter: string) => {
            result.push(
              items.filter((product: IProduct) => product[value as keyof IProduct] === filter),
            );
          });
        }
        return result.flat();
      },

      count(items: IProduct[], value: string): IProduct[] {
        const countFilters: string | null = searchParams.get(value);
        const result: IProduct[][] = [];
        if (countFilters) {
          const countFiltersArr: string[] = countFilters.split('↕');
          const min: number = Math.min(...countFiltersArr.map((item) => +item));
          const max: number = Math.max(...countFiltersArr.map((item) => +item));
          result.push(
            items.filter(
              (product: IProduct) => +product[value as keyof IProduct] >= min
                && +product[value as keyof IProduct] <= max,
            ),
          );
        }
        return result.flat();
      },

      search(items: IProduct[], value: string): IProduct[] {
        const searchFilter: string | null = searchParams.get(value);
        const result: IProduct[][] = [];
        if (searchFilter) {
          result.push(
            items.filter(
              (
                product: IProduct,
              ) => product.title.toLowerCase().includes(searchFilter.toLowerCase())
                || product.description.toLowerCase().includes(searchFilter.toLowerCase())
                || product.brand.toLowerCase().includes(searchFilter.toLowerCase())
                || product.category.toLowerCase().includes(searchFilter.toLowerCase())
                || product.stock.toString().includes(searchFilter.toLowerCase())
                || product.rating.toString().includes(searchFilter.toLowerCase())
                || product.price.toString().includes(searchFilter.toLowerCase()),
            ),
          );
        }
        return result.flat();
      },

      sort(items: IProduct[], value: string): IProduct[] {
        const sortFilter: string | null = searchParams.get(value);
        const result: IProduct[][] = [];
        if (sortFilter) {
          const sortObject: string = sortFilter.split('-')[0];
          const sortDirection: string = sortFilter.split('-')[1];
          if (sortDirection === 'ASC') {
            result.push(
              [...items].sort(
                (a, b) => +a[sortObject as keyof IProduct] - +b[sortObject as keyof IProduct],
              ),
            );
          } else {
            result.push(
              [...items].sort(
                (a, b) => +b[sortObject as keyof IProduct] - +a[sortObject as keyof IProduct],
              ),
            );
          }
        }
        return result.flat();
      },
    };

    const allFilters: string[] = [];
    const validFilters: string[] = ['category', 'brand', 'price', 'stock', 'search', 'sort'];
    searchParams.forEach((_key, value) => {
      if (validFilters.includes(value)) {
        allFilters.push(value);
      }
    });
    const uniqueFilters = [...new Set(allFilters)].sort();

    function recursiveFilter(items: IProduct[], keys: string[]): IProduct[] {
      if (keys.length === 1) {
        return filterFunctions[keys[0] as keyof IFilterFunctions](items, keys[0]);
      }
      const newItems = filterFunctions[keys[0] as keyof IFilterFunctions](items, keys[0]);
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
          {filtered.length > 0 ? (
            <ProductsMain
              headerRender={headerRender}
              products={filtered}
              setCartEmpty={setCartEmpty}
            />
          ) : (
            <ProductsNotFound />
          )}
        </div>
      </div>
    </FilterContext.Provider>
  );
}

export default Main;
