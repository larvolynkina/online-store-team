import React, { SetStateAction } from 'react';
import ModalForm from '../ModalForm/ModalForm';
import './index.scss';

export default function Modal({ className, setModalVisible }:
  { className: string, setModalVisible: React.Dispatch<SetStateAction<boolean>> }) {
  return (
    <div
      className={className}
      role="presentation"
      onClick={():void => setModalVisible(false)}
    >
      <div className="modal__wrapper">
        <div
          className="modal__content"
          role="presentation"
          onClick={(e: React.MouseEvent):void => e.stopPropagation()}
        >
          <ModalForm />
        </div>
      </div>
    </div>
  );
}
