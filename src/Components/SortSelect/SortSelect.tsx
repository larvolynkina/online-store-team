import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './SortSelect.scss';

function SortSelect() {
  const [selectValue, setSelectValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  function addSortType(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectValue(event.target.value);
    if (event.target.value) {
      searchParams.set('sort', event.target.value);
      setSearchParams(searchParams);
    }
  }

  function isSortSet(): void {
    const sortValue: string | null = searchParams.get('sort');
    if (!sortValue) {
      setSelectValue('');
    } else {
      setSelectValue(sortValue);
    }
  }

  useEffect(() => {
    isSortSet();
  }, [searchParams]);

  return (
    <form className="select-form">
      <select className="sortSelect" value={selectValue} onChange={addSortType} name="sort">
        <option disabled value="">Sort options:</option>
        <option value="price-ASC">Sort by price ASC</option>
        <option value="price-DESC">Sort by price DESC</option>
        <option value="rating-ASC">Sort by rating ASC</option>
        <option value="rating-DESC">Sort by rating DESC</option>
      </select>
    </form>
  );
}

export default SortSelect;
