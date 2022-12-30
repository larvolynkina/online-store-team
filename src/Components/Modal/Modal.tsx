import React from 'react';
import ModalForm from '../ModalForm/ModalForm';
import './index.scss';
import useInput from '../../Hooks/useInput';
import { IInput, IModal } from '../../types';

export default function Modal(
  {
    className,
    setModalVisible,
    setCartEmpty,
    setOrder,
  }: IModal,
) {
  const cardNumber: IInput = useInput('', 'credit-card__input', { isEmpty: true, isCardNumber: false });
  const cardCvv: IInput = useInput('', 'credit-card__input', { isEmpty: true, isCvv: false });
  const cardValid: IInput = useInput('', 'credit-card__input', { isEmpty: true, isValid: false });
  const name: IInput = useInput('', 'personal__input', { isEmpty: true, isName: false });
  const phone: IInput = useInput('', 'personal__input', { isEmpty: true, isPhone: false });
  const address: IInput = useInput('', 'personal__input', { isEmpty: true, isAddress: false });
  const email: IInput = useInput('', 'personal__input', { isEmpty: true, isEmail: false });

  function closeModal() {
    setModalVisible(false);
    cardNumber.clearInput();
    cardValid.clearInput();
    cardCvv.clearInput();
    name.clearInput();
    phone.clearInput();
    address.clearInput();
    email.clearInput();
  }
  return (
    <div
      className={className}
      role="presentation"
      onClick={():void => closeModal()}
    >
      <div className="modal__wrapper">
        <div
          className="modal__content"
          role="presentation"
          onClick={(e: React.MouseEvent):void => e.stopPropagation()}
        >
          <ModalForm
            cardNumber={cardNumber}
            cardCvv={cardCvv}
            cardValid={cardValid}
            name={name}
            phone={phone}
            address={address}
            email={email}
            closeModal={():void => closeModal()}
            setCartEmpty={setCartEmpty}
            setOrder={setOrder}
          />
        </div>
      </div>
    </div>
  );
}
