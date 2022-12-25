import React, { useEffect, useState } from 'react';
import useInput from '../../Hooks/useInput';
import './index.scss';
import visaIcon from '../../assets/icons/visaIcon.svg';
import americanExpressIcon from '../../assets/icons/americanExpressIcon.svg';
import mastercardIcon from '../../assets/icons/mastercardIcon.svg';
import creditCard from '../../assets/icons/creditCard.svg';
import { TImages } from '../../types';

export default function FormGroupCard() {
  const cardImages: TImages = {
    4: visaIcon,
    3: americanExpressIcon,
    5: mastercardIcon,
    universalCard: creditCard,
  };

  const [cardImageSrc, setCardImageSrc] = useState<string>(cardImages.universalCard);
  const [cardInputValue, setCardInputValue] = useState<string>('');

  function replaceCardSymbols(event: React.ChangeEvent) {
    const target = event.target as HTMLInputElement;
    target.value = target.value.replace(/[^\d\s]/g, '').trim();
  }

  function addCardSpaces(event: React.KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    if ((target.value.replace(/\s/g, '').length % 4 === 0)
    && event.key !== 'Backspace' && target.value.length !== 19) {
      target.value += ' ';
    }
  }

  function replaceCvvSymbols(event: React.ChangeEvent) {
    const target = event.target as HTMLInputElement;
    target.value = target.value.replace(/[^\d]/g, '');
  }

  function addValidSeparator(event: React.KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    if ((target.value.length > 0)
    && (target.value.replace(/\//g, '').length % 2 === 0)
    && target.value.length !== 5
    && event.key !== 'Backspace') {
      target.value += '/';
    }
  }

  function replaceValidSymbols(event: React.ChangeEvent) {
    const target = event.target as HTMLInputElement;
    target.value = target.value.replace(/[^\d/]/g, '');
  }

  function checkPaymentSystem(value: string) {
    const firstChar:string = value.slice(0, 1);
    if (firstChar in cardImages) {
      setCardImageSrc(cardImages[firstChar]);
    } else {
      setCardImageSrc(cardImages.universalCard);
    }
  }

  useEffect(() => {
    checkPaymentSystem(cardInputValue);
  }, [cardInputValue]);

  const cardNumber = useInput('', 'credit-card__input', { isEmpty: true, isCardNumber: true });
  const cardCvv = useInput('', 'credit-card__input', { isEmpty: true, isCvv: true });
  const cardValid = useInput('', 'credit-card__input', { isEmpty: true, isValid: true });

  return (
    <div className="form__group credit-card">
      <h3 className="credit-card__title">Card info</h3>
      <div className="credit-card__wrapper">
        <div className="credit-card__item credit-card__item_number">
          <label htmlFor="card-number" className="credit-card__label">card number</label>
          <input
            type="text"
            className={cardNumber.inputClassName}
            id="card-number"
            placeholder="0000 0000 0000 0000"
            maxLength={19}
            onKeyDown={(e: React.KeyboardEvent):void => addCardSpaces(e)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>):void => {
              setCardInputValue(e.target.value);
              replaceCardSymbols(e);
              cardNumber.onChange(e);
            }}
            onBlur={():void => cardNumber.onBlur()}
          />
          <div className="credit-card__error-wrapper">
            {cardNumber.isDirty
            && (cardNumber.isEmpty || !cardNumber.isCardNumber)
            && <p className="credit-card__error">{cardNumber.emptyError || cardNumber.error}</p>}
          </div>
        </div>
        <div className="credit-card__item credit-card__item_valid">
          <label htmlFor="card-valid" className="credit-card__label">expires</label>
          <input
            type="text"
            className={cardValid.inputClassName}
            id="card-valid"
            maxLength={5}
            placeholder="MM/YY"
            onKeyDown={(e: React.KeyboardEvent):void => addValidSeparator(e)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>):void => {
              replaceValidSymbols(e);
              cardValid.onChange(e);
            }}
            onBlur={():void => cardValid.onBlur()}
          />
          <div className="credit-card__error-wrapper">
            {cardValid.isDirty
            && (cardValid.isEmpty || !cardValid.isValid)
            && <p className="credit-card__error">{cardValid.emptyError || cardValid.error}</p>}
          </div>
        </div>
        <div className="credit-card__item credit-card__item_cvv">
          <label htmlFor="card-cvv" className="credit-card__label">cvv</label>
          <input
            type="text"
            className={cardCvv.inputClassName}
            id="card-cvv"
            placeholder="CVV"
            maxLength={3}
            onChange={(e: React.ChangeEvent<HTMLInputElement>):void => {
              replaceCvvSymbols(e);
              cardCvv.onChange(e);
            }}
            onBlur={():void => cardCvv.onBlur()}
          />
          <div className="credit-card__error-wrapper">
            {cardCvv.isDirty
            && (cardCvv.isEmpty || !cardCvv.isCvv)
            && <p className="credit-card__error">{cardCvv.emptyError || cardCvv.error}</p>}
          </div>
        </div>
        <div className="credit-card__item credit-card__item_img">
          <img src={cardImageSrc} alt="card-icon" />
        </div>
      </div>
    </div>
  );
}
