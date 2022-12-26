import React, { useEffect, useState } from 'react';
import { TPromocodes, TPromo } from '../../types';
import PromoCodesItem from '../PromoCodesItem/PromoCodesItem';
import './index.scss';

export default function SummaryPromo(
  {
    setDiscount,
    setAmount,
    total,
    promocodes,
  }: TPromo,
) {
  const validPromoCodes: TPromocodes = {
    RS: ['Rolling Scopes School', 10],
    EPM: ['EPAM Systems', 15],
  };

  const [inputValue, setInputValue] = useState<string>('');
  const [appliedPromoCodes, setAppliedPromoCodes] = useState<TPromocodes>(promocodes);
  const [isValidCode, setIsValidCode] = useState<boolean>(false);
  const [isAppliedCode, setIsAppliedCode] = useState<boolean>(false);
  const [currentCode, setCurrentCode] = useState<string>('');

  function changeInputValue(event: React.FocusEvent<HTMLInputElement>):void {
    const target = event.target as HTMLInputElement;
    setInputValue(target.value);
  }

  function applyDiscount():void {
    let discounted: number = total;
    Object.values(appliedPromoCodes).forEach((item: [string, number]) => {
      discounted = Math.floor(discounted - ((discounted / 100) * item[1]));
    });
    setAmount(discounted);
  }

  function addNewPromocode():void {
    const newPromoCodes: TPromocodes = { ...appliedPromoCodes };
    newPromoCodes[inputValue] = validPromoCodes[inputValue];
    setAppliedPromoCodes(newPromoCodes);
    setCurrentCode(inputValue);
    setDiscount(true);
    localStorage.setItem('promo_@vFKSQ', JSON.stringify(newPromoCodes));
  }

  function removePromocode(value: string):void {
    const newPromoCodes: TPromocodes = { ...appliedPromoCodes };
    delete newPromoCodes[value];
    setAppliedPromoCodes(newPromoCodes);
    localStorage.setItem('promo_@vFKSQ', JSON.stringify(newPromoCodes));

    if (!Object.keys(newPromoCodes).length) {
      setDiscount(false);
    }

    if (value === currentCode) {
      setIsAppliedCode(false);
    }
  }

  function checkPromocode():void {
    if (inputValue in validPromoCodes) {
      setCurrentCode(inputValue);
      setIsValidCode(true);
      setIsAppliedCode(inputValue in appliedPromoCodes);
    } else {
      setIsValidCode(false);
    }
  }

  useEffect(() => {
    checkPromocode();
  }, [inputValue]);

  useEffect(() => {
    if (currentCode in appliedPromoCodes) {
      setIsAppliedCode(true);
    }
  }, [appliedPromoCodes]);

  useEffect(() => {
    applyDiscount();
  }, [appliedPromoCodes]);

  useEffect(() => {
    applyDiscount();
  }, [total]);

  return (
    <div className="summary__promo promo">
      <label htmlFor="promo-input" className="promo__label">Use promo code RS or EPM to get discount:</label>
      <input
        id="promo-input"
        type="search"
        placeholder="Enter promo code"
        className="promo__input"
        onChange={(e: React.FocusEvent<HTMLInputElement>):void => changeInputValue(e)}
      />
      {isValidCode && (
      <div className="promo__output">
        <p className="promo__title">{`${validPromoCodes[currentCode][0]} - ${validPromoCodes[currentCode][1]}%`}</p>
        {!isAppliedCode
        && (
        <button className="promo__btn" type="button" onClick={():void => addNewPromocode()}>
          Add
        </button>
        )}
      </div>
      )}
      {Object.keys(appliedPromoCodes).length > 0 && (
      <div>
        <h4>Applied codes</h4>
        <ul className="promo__list applied-codes">
          {Object.entries(appliedPromoCodes)
            .map((item: [string, [string, number]]) => (
              <PromoCodesItem
                promocode={item[1][0]}
                discountPercentage={item[1][1]}
                key={item[0]}
                removePromocode={():void => removePromocode(item[0])}
              />
            ))}
        </ul>
      </div>
      )}
    </div>
  );
}
