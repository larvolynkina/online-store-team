import './index.scss';
import React, { SetStateAction, useState } from 'react';
import ProductBuyButton from '../ProductBuyButton/ProductBuyButton';
import ProductCartButton from '../ProductCartButton/ProductCartButton';
import { ProductInnerButton, IProduct } from '../../types';
import arrowDown from '../../assets/icons/arrowDown.svg';

function ProductDescription(
  {
    productInCart,
    setProductInCart,
    product,
    headerRender,
    btnInner,
    addItem,
    removeItem,
    setModalVisible,
  }:
   {
    productInCart: boolean,
    setProductInCart: React.Dispatch<SetStateAction<boolean>>
    product: IProduct,
    headerRender: () => void,
    btnInner: ProductInnerButton,
    addItem: () => void,
    removeItem: () => void,
    setModalVisible: React.Dispatch<SetStateAction<boolean>>
  },
) {
  const [isDescription, setDescription] = useState(false);
  return (
    <section className="card-product__desc desc-card">
      <h3 className="desc-card__title">{product.title}</h3>
      <div className="desc-card__rating">{product.rating}</div>
      <h4 className="desc-card__specifications">specifications</h4>
      <ul className="desc-card__list">
        <li className="desc-card__item">
          <span className="desc-card__label">price:</span>
          <span className="desc-card__description">{`$${product.price}`}</span>
        </li>
        <li className="desc-card__item">
          <span className="desc-card__label">brand:</span>
          <span className="desc-card__description">{`${product.brand}`}</span>
        </li>
        <li className="desc-card__item">
          <span className="desc-card__label">category:</span>
          <span className="desc-card__description">{`${product.category}`}</span>
        </li>
        <li className="desc-card__item">
          <span className="desc-card__label">in stock:</span>
          <span className="desc-card__description">{`${product.stock}`}</span>
        </li>
        <li className="desc-card__item accordeon">
          <button type="button" className="accordeon__btn" onClick={():void => setDescription(!isDescription)}>
            <span className="accordeon__title"> Show description</span>
            <img src={arrowDown} alt="open arrow" className={isDescription ? 'accordeon__arrow up' : 'accordeon__arrow'} />
          </button>
          <p className={isDescription ? 'accordeon__panel visible' : 'accordeon__panel'}>{product.description}</p>
        </li>
      </ul>
      <div className="description-card__btns btns-card">
        <ProductCartButton
          productInCart={productInCart}
          headerRender={headerRender}
          btnInner={btnInner}
          addItem={addItem}
          removeItem={removeItem}
          setProductInCart={setProductInCart}
        />
        <ProductBuyButton
          headerRender={headerRender}
          addItem={addItem}
          productInCart={productInCart}
          setModalVisible={setModalVisible}
        />
      </div>
    </section>
  );
}

export default ProductDescription;
