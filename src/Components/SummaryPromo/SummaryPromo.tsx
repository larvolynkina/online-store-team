import React, { useEffect, useState } from 'react';
import { TPromocodes, TPromo } from '../../types';
import './index.scss';

export default function SummaryPromo(
  {
    setDiscount,
    promoCodes,
    setPromocodes,
    setAmount,
    total,
  }: TPromo,
) {
  const validPromoCodes: TPromocodes = { RS: 10, EPM: 20 };

  const [inputValue, setInputValue] = useState<string>('');
  const [placeholder, setPlaceholder] = useState<string>('Enter promo code');

  function changeInputValue(event: React.FocusEvent<HTMLInputElement>):void {
    const target = event.target as HTMLInputElement;
    setInputValue(target.value);
  }

  function clearInput(event: React.FocusEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    setPlaceholder('Enter promo code');
    target.value = '';
  }

  function addNewPromocode(data: string):void {
    const appliedPromoCodes: TPromocodes = { ...promoCodes };
    appliedPromoCodes[data] = validPromoCodes[data];
    setPromocodes(appliedPromoCodes);
  }

  function removePromocodes():void {
    setPromocodes({});
    setAmount(total);
    setDiscount(false);
  }

  function applyDiscount():void {
    let discounted: number = total;
    Object.values(promoCodes).forEach((value: number) => {
      discounted = Math.floor(discounted - ((discounted / 100) * value));
    });
    setAmount(discounted);
  }

  useEffect(() => {
    if (inputValue in validPromoCodes && total) {
      setDiscount(true);
      addNewPromocode(inputValue);
      applyDiscount();
    }
  }, [inputValue]);

  useEffect(() => {
    applyDiscount();
  }, [promoCodes]);

  useEffect(() => {
    if (total === 0) {
      removePromocodes();
    } else {
      applyDiscount();
    }
  }, [total]);

  return (
    <div className="summary__promo promo">
      <label htmlFor="promo-input" className="promo__label">Use promo code RS or EPM to get discount:</label>
      <input
        id="promo-input"
        type="text"
        placeholder={placeholder}
        className="promo__input"
        onFocus={() => setPlaceholder('')}
        onBlur={(e: React.FocusEvent<HTMLInputElement>):void => clearInput(e)}
        onChange={(e: React.FocusEvent<HTMLInputElement>):void => changeInputValue(e)}
      />
      <div className="promo__applied-codes codes">
        <span className="codes__label">Applied promo codes:</span>
        <span className="codes__output">{Object.keys(promoCodes).join(', ')}</span>
      </div>
      <button type="button" className="promo__btn" onClick={() => removePromocodes()}>Delete promocode</button>
    </div>
  );
}
