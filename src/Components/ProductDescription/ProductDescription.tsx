import './index.scss';
import React, { SetStateAction } from 'react';
import ProductBuyButton from '../ProductBuyButton/ProductBuyButton';
import ProductCartButton from '../ProductCartButton/ProductCartButton';
import { InnerButton, IProduct } from '../../types';

function ProductDescription(
  {
    productInCart,
    setProductInCart,
    product,
    headerRender,
    btnInner,
    addItem,
    removeItem,
  }:
   {
    productInCart: boolean,
    setProductInCart: React.Dispatch<SetStateAction<boolean>>
    product: IProduct,
    headerRender: () => void,
    btnInner: InnerButton,
    addItem: () => void,
    removeItem: () => void
  },
) {
  return (
    <section className="card-product__desc desc-card">
      <h3 className="desc-card__title">{product.title}</h3>
      <ul className="desc-card__list">
        <li className="desc-card__item desc-card__item_rating">{`Rating: ${product.rating}`}</li>
        <li className="desc-card__item desc-card__item_brand">{`Brand: ${product.brand}`}</li>
        <li className="desc-card__item desc-card__item_description">{`Description: ${product.description}`}</li>
        <li className="desc-card__item desc-card__item_price">{`Price: ${product.price}`}</li>
        <li className="desc-card__item desc-card__item_category">{`Category: ${product.category}`}</li>
        <li className="desc-card__item desc-card__item_stock">{`In stock: ${product.stock}`}</li>
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
        />
      </div>
    </section>
  );
}

export default ProductDescription;
