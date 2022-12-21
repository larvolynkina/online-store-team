import React, { SetStateAction } from 'react';
import { InnerButton } from '../../types';
import './index.scss';

export default function ProductCartButton({
  productInCart,
  setProductInCart,
  headerRender,
  btnInner,
  addItem,
  removeItem,
}:
   {
    productInCart: boolean,
    setProductInCart: React.Dispatch<SetStateAction<boolean>>,
    headerRender: () => void
    btnInner: InnerButton,
    addItem: () => void,
    removeItem: () => void
  }) {
  return (
    <button
      type="button"
      className="btns-card__cart"
      onClick={
        ():void => {
          if (productInCart) {
            removeItem();
          } else {
            addItem();
          }
          headerRender();
          setProductInCart(!productInCart);
        }
      }
    >
      {btnInner}
    </button>
  );
}
