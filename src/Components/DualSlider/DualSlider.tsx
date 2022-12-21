import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import { FilterContext } from '../../Pages/Main';
import { IProduct } from '../../types';
import './DualSlider.scss';
import data from '../../assets/products.json';

interface DualSliderProps {
  name: string;
  label: string;
}

function DualSlider({ name, label }: DualSliderProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const filtered: IProduct[] = useContext(FilterContext);
  const [rangeMinValue, setRangeMinValue] = useState<string>('');
  const [rangeMaxValue, setRangeMaxValue] = useState<string>('');
  const [isMoving, setIsMoving] = useState<boolean>(false);

  const filter: string = name.toLowerCase();

  const min: number = Math.min(
    ...data.products.map((item: IProduct) => +item[filter as keyof IProduct]),
  );
  const max: number = Math.max(
    ...data.products.map((item: IProduct) => +item[filter as keyof IProduct]),
  );

  function getMinValue(array: IProduct[]): number {
    if (isMoving) {
      setIsMoving(false);
      return +rangeMinValue;
    }
    const filterArray = array.map((item: IProduct) => +item[filter as keyof IProduct]);
    const filterArrayMin = Math.min(...filterArray);
    return filterArrayMin;
  }

  function getMaxValue(array: IProduct[]): number {
    if (isMoving) {
      setIsMoving(false);
      return +rangeMaxValue;
    }
    const filterArray = array.map((item: IProduct) => +item[filter as keyof IProduct]);
    const filterArrayMax = Math.max(...filterArray);
    return filterArrayMax;
  }

  function changeRangeMinValue(event: React.ChangeEvent<HTMLInputElement>): void {
    setIsMoving(true);
    if (+event.target.value > +rangeMaxValue) {
      setRangeMinValue(rangeMaxValue);
      setRangeMaxValue(event.target.value);
      searchParams.set(filter, `${rangeMaxValue}↕${event.target.value}`);
    } else {
      setRangeMinValue(event.target.value);
      searchParams.set(filter, `${event.target.value}↕${rangeMaxValue}`);
    }
    setSearchParams(searchParams);
  }

  function changeRangeMaxValue(event: React.ChangeEvent<HTMLInputElement>): void {
    setIsMoving(true);
    if (+event.target.value < +rangeMinValue) {
      setRangeMaxValue(rangeMinValue);
      setRangeMinValue(event.target.value);
      searchParams.set(filter, `${event.target.value}↕${rangeMinValue}`);
    } else {
      setRangeMaxValue(event.target.value);
      searchParams.set(filter, `${rangeMinValue}↕${event.target.value}`);
    }

    setSearchParams(searchParams);
  }

  useEffect(() => {
    if (filtered.length > 0) {
      setRangeMinValue(getMinValue(filtered).toString());
      setRangeMaxValue(getMaxValue(filtered).toString());
    }
  }, [filtered]);

  return (
    <>
      <h2>{name}</h2>
      <div className="dualSlider">
        <div className="dualSlider__values">
          <span className="dualSlider__valueMin">
            {label}
            {rangeMinValue}
          </span>
          <span className="dualSlider__valueMax">
            {label}
            {rangeMaxValue}
          </span>
        </div>
        <div className="dualSlider__ranges">
          <div className="dualSlider__track" />
          <DebounceInput
            type="range"
            name="rangeMin"
            id="rangeMin"
            min={min}
            max={max}
            value={rangeMinValue}
            debounceTimeout={150}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeRangeMinValue(event)}
          />
          <DebounceInput
            type="range"
            name="rangeMax"
            id="rangeMax"
            min={min}
            max={max}
            value={rangeMaxValue}
            debounceTimeout={150}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeRangeMaxValue(event)}
          />
        </div>
      </div>
    </>
  );
}

export default DualSlider;
