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
    setModalVisible,
    setCartEmpty,
    setOrder,
  }: IModalForm,
) {
  const navigate: NavigateFunction = useNavigate();

  function validateForm() {
    if (cardNumber.isValidInputs && cardValid.isValidInputs && cardCvv.isValidInputs
      && name.isValidInputs && phone.isValidInputs && address.isValidInputs
      && email.isValidInputs) {
      setOrder(true);
      setCartEmpty(true);
      setModalVisible(false);

      setTimeout(():void => {
        navigate('/');
        setOrder(false);
      }, 4000);
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
    <form action="" className="modal__form form" onSubmit={(e: React.FormEvent) => e.preventDefault()}>
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
      <button
        type="submit"
        className="form__confirm-btn"
        onClick={():void => validateForm()}
      >
        confirm
      </button>
    </form>
  );
}
