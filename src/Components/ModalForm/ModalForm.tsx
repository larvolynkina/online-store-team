import './index.scss';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import React from 'react';
import FormGroupCard from '../FormGroupCard/FormGroupCard';
import FormGroupPersonal from '../FormGroupPersonal/FormGroupPersonal';
import { IModalForm } from '../../types';

export default function ModalForm(
  {
    cardNumber,
    cardCvv,
    cardValid,
    name,
    phone,
    address,
    email,
    closeModal,
    setCartEmpty,
  }: IModalForm,
) {
  const navigate: NavigateFunction = useNavigate();

  function validateForm(event: React.MouseEvent) {
    event.preventDefault();

    if (cardNumber.isValidInputs && cardValid.isValidInputs && cardCvv.isValidInputs
      && name.isValidInputs && phone.isValidInputs && address.isValidInputs
      && email.isValidInputs) {
      closeModal();
      setCartEmpty(true);

      setTimeout(() => {
        navigate('/');
      }, 3000);
    } else {
      cardNumber.setDirtyInput();
      cardValid.setDirtyInput();
      cardCvv.setDirtyInput();
      name.setDirtyInput();
      phone.setDirtyInput();
      address.setDirtyInput();
      email.setDirtyInput();
    }
  }

  return (
    <form action="" className="modal__form form">
      <FormGroupPersonal
        name={name}
        phone={phone}
        address={address}
        email={email}
      />
      <FormGroupCard
        cardNumber={cardNumber}
        cardCvv={cardCvv}
        cardValid={cardValid}
      />
      <button type="submit" onClick={(e: React.MouseEvent):void => validateForm(e)}>confirm</button>
    </form>
  );
}
