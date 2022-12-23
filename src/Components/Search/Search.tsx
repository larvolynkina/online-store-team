import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Search.scss';

function Search() {
  const [className, setClassName] = useState('search__clearBtn');
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState('');

  function clearSearchField(): void {
    setClassName('search__clearBtn');
    searchParams.delete('search');
    setSearchParams(searchParams);
  }

  function addSearchFilter(event: React.ChangeEvent<HTMLInputElement>): void {
    setSearchValue(event.target.value);
    if (event.target.value !== '') {
      setClassName('search__clearBtn search__clearBtn_active');
      searchParams.set('search', event.target.value);
      setSearchParams(searchParams);
    } else {
      clearSearchField();
    }
  }

  function isSearchFilter() {
    const search: string | null = searchParams.get('search');
    if (search) {
      setSearchValue(search);
      setClassName('search__clearBtn search__clearBtn_active');
    } else {
      setSearchValue('');
    }
  }

  useEffect(() => {
    isSearchFilter();
  }, [searchParams]);

  return (
    <div className="search">
      <input
        className="search__input"
        autoComplete="off"
        type="text"
        id="search"
        value={searchValue}
        placeholder="Search..."
        onChange={
          (event: React.ChangeEvent<HTMLInputElement>) => addSearchFilter(event)
        }
      />
      <button onClick={clearSearchField} className={className} type="button" aria-label="Clear search field" />
    </div>
  );
}

export default Search;
