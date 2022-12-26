import './index.scss';
import React, { useState, useEffect, SetStateAction } from 'react';
import { IProduct, ICartItem, ProductInnerButton } from '../../types';
import ProductCardTitle from '../ProductCardTitle/ProductCardTitle';
import ProductDescription from '../ProductDescription/ProductDescription';
import ProductGallery from '../ProductGallery/ProductGallery';

export default function ProductCard(
  {
    product,
    products,
    headerRender,
    setModalVisible,
    setCartEmpty,
  }:
   {
    product: IProduct,
    products: IProduct[],
    headerRender: () => void,
    setModalVisible: React.Dispatch<SetStateAction<boolean>>,
    setCartEmpty: React.Dispatch<SetStateAction<boolean>>
  },
) {
  const storage: string | null = localStorage.getItem('cart_@vFKSQ');

  function checkItem():boolean {
    if (storage) {
      const item: ICartItem = JSON.parse(storage)
        .find((element: ICartItem) => element.id === product.id);
      return Boolean(item);
    }
    return false;
  }

  function addItem():void {
    const cart: ICartItem[] = storage ? JSON.parse(storage) : [];
    const currentItem: IProduct | undefined = products
      .find((element: IProduct) => element.id === product.id);
    if (currentItem) {
      const cartItem: ICartItem = {
        id: currentItem.id,
        price: currentItem.price,
        count: 1,
      };
      cart.push(cartItem);
    }
    localStorage.setItem('cart_@vFKSQ', JSON.stringify(cart));
    setCartEmpty(false);
  }

  function removeItem():void {
    if (storage) {
      const filteredCart: ICartItem[] = JSON.parse(storage)
        .filter((element: ICartItem) => element.id !== product.id);
      localStorage.setItem('cart_@vFKSQ', JSON.stringify(filteredCart));
    }
  }

  const check = checkItem();
  const [productInCart, setProductInCart] = useState<boolean>(check);
  const btnInner: ProductInnerButton = productInCart
    ? ProductInnerButton.Remove
    : ProductInnerButton.Add;

  useEffect(() => {
    setProductInCart(check);
  }, [productInCart]);

  return (
    <div className="product-page__card card-product">
      <ProductCardTitle title={product.title} />
      <div className="card-product__content">
        <ProductGallery images={product.images} title={product.title} />
        <ProductDescription
          product={product}
          headerRender={headerRender}
          btnInner={btnInner}
          productInCart={productInCart}
          addItem={() => addItem()}
          removeItem={() => removeItem()}
          setProductInCart={setProductInCart}
          setModalVisible={setModalVisible}
        />
      </div>
    </div>
  );
}
