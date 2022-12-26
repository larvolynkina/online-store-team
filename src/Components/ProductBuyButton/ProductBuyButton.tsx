import './index.scss';
import { useNavigate } from 'react-router-dom';
import React, { SetStateAction } from 'react';

export default function ProductBuyButton(
  {
    headerRender,
    addItem,
    productInCart,
    setModalVisible,
  }:
  {
    headerRender: () => void,
    addItem: () => void,
    productInCart: boolean
    setModalVisible: React.Dispatch<SetStateAction<boolean>>
  },
) {
  const navigate = useNavigate();

  function goToCart() {
    if (!productInCart) {
      addItem();
      headerRender();
    }
    setTimeout(() => setModalVisible(true), 500);
    navigate('/shopping-cart');
  }
  return (
    <button type="button" className="btns-card__buy-now" onClick={() => goToCart()}>
      Buy now
    </button>
  );
}
