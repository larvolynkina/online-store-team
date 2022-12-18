import { useEffect, useState } from 'react';
import { IProduct, ICartItem, InnerButton } from '../../types';
import './index.scss';

export default function ProductCartButton({ id, products, headerRender }:
   { id: number,
    products: IProduct[],
    headerRender: () => void
  }) {
  const storage: string | null = localStorage.getItem('cart_@vFKSQ');

  function checkItem():boolean {
    if (storage) {
      const item: ICartItem = JSON.parse(storage)
        .find((element: ICartItem) => element.id === id);
      return Boolean(item);
    }
    return false;
  }

  function addItem():void {
    const cart: ICartItem[] = storage ? JSON.parse(storage) : [];
    const currentItem: IProduct | undefined = products
      .find((element: IProduct) => element.id === id);
    if (currentItem) {
      const cartItem: ICartItem = {
        id: currentItem.id,
        price: currentItem.price,
        count: 1,
      };
      cart.push(cartItem);
    }
    localStorage.setItem('cart_@vFKSQ', JSON.stringify(cart));
  }

  function removeItem():void {
    if (storage) {
      const filteredCart: ICartItem[] = JSON.parse(storage)
        .filter((element: ICartItem) => element.id !== id);
      localStorage.setItem('cart_@vFKSQ', JSON.stringify(filteredCart));
    }
  }

  const check = checkItem();
  const [product, setProduct] = useState<boolean>(check);
  const btnInner: InnerButton = product ? InnerButton.Remove : InnerButton.Add;

  useEffect(() => {
    setProduct(check);
  }, [check]);

  return (
    <button
      type="button"
      className="btns-card__cart"
      onClick={
        ():void => {
          if (product) {
            removeItem();
          } else {
            addItem();
          }
          headerRender();
          setProduct(!product);
        }
      }
    >
      {btnInner}
    </button>
  );
}
