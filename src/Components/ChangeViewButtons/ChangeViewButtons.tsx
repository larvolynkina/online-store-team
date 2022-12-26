import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ViewButton from '../ViewButton/ViewButton';
import gridImg from './grid.svg';
import listImg from './list.svg';
import './ChangeViewButtons.scss';

function ChangeViewButtons() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isGrid, setIsGrid] = useState<boolean>(false);
  const [isList, setIsList] = useState<boolean>(false);

  function setGrid(): void {
    setIsGrid(true);
    setIsList(false);
  }

  function setList(): void {
    setIsGrid(false);
    setIsList(true);
  }

  function checkURLParams(): void {
    const view = searchParams.get('view');
    if (view) {
      if (view === 'grid') {
        setGrid();
      } else {
        setList();
      }
    } else {
      setGrid();
    }
  }

  function onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    if (event.currentTarget.id === 'grid') {
      setGrid();
      searchParams.set('view', 'grid');
    } else {
      setList();
      searchParams.set('view', 'list');
    }
    setSearchParams(searchParams);
  }

  useEffect(() => {
    checkURLParams();
  }, [searchParams]);

  return (
    <div className="viewButton-wrapper">
      <ViewButton
        url={gridImg}
        alt="grid view"
        activeButton={isGrid}
        name="grid"
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onClick(event)}
      />
      <ViewButton
        url={listImg}
        alt="list view"
        activeButton={isList}
        name="list"
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onClick(event)}
      />
    </div>
  );
}

export default ChangeViewButtons;
