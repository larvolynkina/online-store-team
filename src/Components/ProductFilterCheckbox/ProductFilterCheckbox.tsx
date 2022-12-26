import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterContext } from '../../Pages/Main';
import { IProduct } from '../../types';
import data from '../../assets/products.json';
import './ProductFilterCheckbox.scss';

interface IProductFilterCheckboxProps {
  item: string;
  name: string;
}

export default function ProductFilterCheckbox({ item, name }: IProductFilterCheckboxProps) {
  const [checked, setCheked] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const filtered: IProduct[] = useContext(FilterContext);
  const [className, setClassName] = useState('filter__item');

  function addFilter(event: React.ChangeEvent<HTMLInputElement>) {
    const filter: string = name.toLowerCase();
    if (event.target.checked) {
      searchParams.append(filter, item);
      setSearchParams(searchParams);
      setCheked(true);
    } else {
      const allValues = searchParams.getAll(filter).filter((value) => value !== item);
      searchParams.delete(filter);
      allValues.forEach((value) => searchParams.append(filter, value));
      setSearchParams(searchParams);
      setCheked(false);
    }
  }

  function isChecked(str: string): boolean {
    const validFilters: string[] = ['category', 'brand'];
    let flag = false;
    searchParams.forEach((key, value) => {
      if (validFilters.includes(value)) {
        if (key === str) {
          flag = true;
        }
      }
    });
    return flag;
  }

  const activeItems = filtered.filter(
    (it: IProduct) => it[name.toLowerCase() as keyof IProduct] === item,
  ).length;

  const totalItems = data.products.filter(
    (it: IProduct) => it[name.toLowerCase() as keyof IProduct] === item,
  ).length;

  const isActive = () => (activeItems ? setClassName('filter__item filter__item_active') : setClassName('filter__item'));

  useEffect(() => {
    setCheked(isChecked(item));
    isActive();
  }, [checked, searchParams]);

  return (
    <div className={className}>
      <div className="filter__item-wrapper">
        <input
          checked={checked}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCheked(event.target.checked);
            addFilter(event);
          }}
          type="checkbox"
          name=""
          id={item}
        />
        <label htmlFor={item}>{item}</label>
      </div>
      <span>
        (
        {activeItems}
        /
        {totalItems}
        )
      </span>
    </div>
  );
}
