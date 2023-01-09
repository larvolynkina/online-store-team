import React, { useState } from 'react';
import './index.scss';
import visaIcon from '../../assets/icons/visaIcon.svg';
import americanExpressIcon from '../../assets/icons/americanExpressIcon.svg';
import mastercardIcon from '../../assets/icons/mastercardIcon.svg';
import creditCard from '../../assets/icons/creditCard.svg';
import { IInput, TImages } from '../../types';

export default function FormGroupCard({ cardNumber, cardCvv, cardValid }:
  {cardNumber: IInput, cardCvv: IInput, cardValid: IInput}) {
  const cardImages: TImages = {
    4: visaIcon,
    3: americanExpressIcon,
    5: mastercardIcon,
    universalCard: creditCard,
  };

  const [cardImageSrc, setCardImageSrc] = useState<string>(cardImages.universalCard);

  function replaceSymbols(event: React.ChangeEvent): void {
    const target = event.target as HTMLInputElement;
    if (target.id === 'card-cvv') {
      target.value = target.value.replace(/[^\d]/g, '');
    }
    if (target.id === 'card-number') {
      target.value = target.value.match(/\d{1,4}/g)?.join(' ').slice(0, 19) || '';
    }
    if (target.id === 'card-valid') {
      target.value = target.value.match(/\d{1,2}/g)?.join('/').slice(0, 5) || '';
    }
  }

  function checkPaymentSystem(event: React.KeyboardEvent): void {
    const target = event.target as HTMLInputElement;
    const firstChar:string = target.value.slice(0, 1);
    if (firstChar in cardImages) {
      setCardImageSrc(cardImages[firstChar]);
    } else {
      setCardImageSrc(cardImages.universalCard);
    }
  }

  return (
    <div className="form__group credit-card">
      <h3 className="credit-card__title">Card information</h3>
      <div className="credit-card__wrapper">
        <div className="credit-card__item credit-card__item_number">
          <label htmlFor="card-number" className="credit-card__label">card number</label>
          <input
            type="text"
            className={cardNumber.inputClassName}
            id="card-number"
            placeholder="0000 0000 0000 0000"
            maxLength={19}
            value={cardNumber.value}
            onKeyUp={(e: React.KeyboardEvent):void => checkPaymentSystem(e)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>):void => {
              replaceSymbols(e);
              cardNumber.setInputValue(e);
            }}
            onBlur={():void => cardNumber.setDirtyInput()}
          />
          <div className="credit-card__error-wrapper">
            {cardNumber.isDirty
            && (cardNumber.isEmpty || !cardNumber.isCardNumber)
            && <p className="credit-card__error">{cardNumber.emptyError || cardNumber.error}</p>}
          </div>
        </div>
        <div className="credit-card__item credit-card__item_payment-system">
          <img className="credit-card__img" src={cardImageSrc} alt="card-icon" />
        </div>
        <div className="credit-card__item credit-card__item_valid">
          <label htmlFor="card-valid" className="credit-card__label">expires</label>
          <input
            type="text"
            className={cardValid.inputClassName}
            id="card-valid"
            maxLength={5}
            value={cardValid.value}
            placeholder="MM/YY"
            onChange={(e: React.ChangeEvent<HTMLInputElement>):void => {
              replaceSymbols(e);
              cardValid.setInputValue(e);
            }}
            onBlur={():void => cardValid.setDirtyInput()}
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
            value={cardCvv.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>):void => {
              replaceSymbols(e);
              cardCvv.setInputValue(e);
            }}
            onBlur={():void => cardCvv.setDirtyInput()}
          />
          <div className="credit-card__error-wrapper">
            {cardCvv.isDirty
            && (cardCvv.isEmpty || !cardCvv.isCvv)
            && <p className="credit-card__error">{cardCvv.emptyError || cardCvv.error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
