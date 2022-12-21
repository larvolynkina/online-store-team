import React, {
  useContext, useEffect, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import { FilterContext } from '../../Pages/Main';
import { IProduct } from '../../types';
import './DualSlider.scss';
import data from '../../assets/products.json';

interface DualSliderProps {
  name: string;
}

function DualSlider({ name }: DualSliderProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const filtered: IProduct[] = useContext(FilterContext);
  const [rangeMinValue, setRangeMinValue] = useState<string>('');
  const [rangeMaxValue, setRangeMaxValue] = useState<string>('');

  const min: number = Math.min(...data.products.map((item: IProduct) => item.price));
  const max: number = Math.max(...data.products.map((item: IProduct) => item.price));

  function getMinValue(array: IProduct[]): number {
    if (searchParams.has('price')) {
      const result = searchParams.get('price');
      if (result) {
        const mini = Math.min(...result.split('↕').map((item) => +item));
        return +mini;
      }
    }
    const priceArray = array.map((item: IProduct) => item.price);
    return Math.min(...priceArray);
  }

  function getMaxValue(array: IProduct[]): number {
    if (searchParams.has('price')) {
      const result = searchParams.get('price');
      if (result) {
        const maxi = Math.max(...result.split('↕').map((item) => +item));
        return +maxi;
      }
    }
    const priceArray = array.map((item: IProduct) => item.price);
    return Math.max(...priceArray);
  }

  function changeRangeMinValue(event: React.ChangeEvent<HTMLInputElement>): void {
    if (+event.target.value > +rangeMaxValue) {
      setRangeMinValue(event.target.value);
      setRangeMaxValue(event.target.value);
    } else {
      setRangeMinValue(event.target.value);
    }
    searchParams.set('price', `${event.target.value}↕${rangeMaxValue}`);
    setSearchParams(searchParams);
  }

  function changeRangeMaxValue(event: React.ChangeEvent<HTMLInputElement>): void {
    if (+event.target.value < +rangeMinValue) {
      setRangeMinValue(event.target.value);
      setRangeMaxValue(event.target.value);
    } else {
      setRangeMaxValue(event.target.value);
    }
    searchParams.set('price', `${rangeMinValue}↕${event.target.value}`);
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
            $
            {rangeMinValue}
          </span>
          <span className="dualSlider__valueMax">
            $
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
