/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './ProductMain.scss';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { IProduct, ICartItem } from '../../types';

type ProductMainProps = {
  product: IProduct;
  headerRender: () => void;
};

type TCartArray = Array<ICartItem>;

function ProductMain({ product, headerRender }: ProductMainProps) {
  const navigate = useNavigate();
  const [cartButton, setCartButton] = useState('Add to cart');
  const [productClass, setProductClass] = useState('product');

  function addItemtoLocalStorage(array: TCartArray):void {
    const item: ICartItem = {
      id: product.id,
      price: product.price,
      count: 1,
    };
    array.push(item);
    const arrayToJson: string = JSON.stringify(array);
    localStorage.setItem('cart_@vFKSQ', arrayToJson);
  }

  function addToCartFromMain(): void {
    if (cartButton === 'Add to cart') {
      setCartButton('Delete');
      setProductClass('product product_active');
      const json = localStorage.getItem('cart_@vFKSQ');
      if (json) {
        const cartArray: TCartArray = JSON.parse(json);
        addItemtoLocalStorage(cartArray);
      } else {
        const cartArray: TCartArray = [];
        addItemtoLocalStorage(cartArray);
      }
    } else {
      setCartButton('Add to cart');
      setProductClass('product');
      const json: string | null = localStorage.getItem('cart_@vFKSQ');
      if (json) {
        const cartArray: TCartArray = JSON.parse(json);
        const filteredArray: TCartArray = cartArray.filter(
          (value: ICartItem) => value.id !== product.id,
        );
        const arrayToJson: string = JSON.stringify(filteredArray);
        localStorage.setItem('cart_@vFKSQ', arrayToJson);
      }
    }
    headerRender();
  }

  function isProductInCart(): void {
    const json: string | null = localStorage.getItem('cart_@vFKSQ');
    if (json) {
      const array: TCartArray = JSON.parse(json);
      const productsInCartLength: number = array.filter(
        (value: ICartItem) => value.id === product.id,
      ).length;
      if (productsInCartLength) {
        setCartButton('Delete');
        setProductClass('product product_active');
      }
    }
  }

  useEffect(() => {
    isProductInCart();
  }, []);

  return (
    <li
      className={productClass}
      onClick={(event: React.MouseEvent) => {
        const current = event.target as HTMLElement;
        if (!current.classList.contains('btn_cart')) {
          navigate(`/product/${product.id}`);
        }
      }}
    >
      <div className="product__image">
        <img className="product__img" src={product.thumbnail} alt={product.title} />
      </div>
      <div className="product__digits">
        <span className="product__rating">{product.rating}</span>
        <span className="product__price">{`$${product.price}`}</span>
      </div>
      <div className="product__info">
        <p className="product__title">{product.title}</p>
        <p className="product__descr">{product.description}</p>
        <hr className="product__line" />
        <dl className="product__list">
          <dt className="product__term">Category:</dt>
          <dd className="product__def">{product.category}</dd>
          <dt className="product__term">Brand:</dt>
          <dd className="product__def">{product.brand}</dd>
          <dt className="product__term">Stock:</dt>
          <dd className="product__def">{product.stock}</dd>
        </dl>
      </div>
      <div className="product__buttons">
        <button
          onClick={() => navigate(`/product/${product.id}`)}
          className="btn btn_details"
          type="button"
        >
          Details
        </button>
        <button onClick={addToCartFromMain} className="btn btn_cart" type="button">
          {cartButton}
        </button>
      </div>
    </li>
  );
}

export default ProductMain;
