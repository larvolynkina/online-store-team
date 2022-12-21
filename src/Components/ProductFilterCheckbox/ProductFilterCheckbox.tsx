import { useEffect, useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterContext } from '../../Pages/Main';
import { IProduct } from '../../types';
import data from '../../assets/products.json';

interface IProductFilterCheckboxProps {
  item: string;
  name: string;
}

export default function ProductFilterCheckbox({ item, name }: IProductFilterCheckboxProps) {
  const [checked, setCheked] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const filtered = useContext(FilterContext);
  // console.log(filtered);

  function addFilter(target: any) {
    const filter: string = name.toLowerCase();
    if (target.checked) {
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
    let flag = false;
    searchParams.forEach((key) => {
      if (key === str) {
        flag = true;
      }
    });
    return flag;
  }

  useEffect(() => {
    setCheked(isChecked(item));
  }, [checked]);

  const activeItems = filtered.filter(
    (it: IProduct) => it[name.toLowerCase() as keyof IProduct] === item,
  ).length;

  const totalItems = data.products.filter(
    (it: IProduct) => it[name.toLowerCase() as keyof IProduct] === item,
  ).length;

  return (
    <div className="filter__item">
      <input
        checked={checked}
        onChange={(event) => {
          setCheked(event.target.checked);
          addFilter(event.target);
        }}
        type="checkbox"
        name=""
        id={item}
      />
      <label htmlFor={item}>{item}</label>
      <span>
        {' '}
        {activeItems}
        /
        {totalItems}
      </span>
    </div>
  );
}
