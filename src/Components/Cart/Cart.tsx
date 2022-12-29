import './index.scss';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import CartList from '../CartList/CartList';
import CartEmpty from '../CartEmpty/CartEmpty';
import CartSummary from '../CartSummary/CartSummary';
import CartPagination from '../CartPagination/CartPagination';
import { IProduct, ICartItem } from '../../types';

export default function Cart(
  {
    products,
    setModalVisible,
    headerRender,
    isCartEmpty,
    setCartEmpty,
    cart,
  }:
  {
    products: Array<IProduct>,
    setModalVisible: React.Dispatch<SetStateAction<boolean>>,
    headerRender: () => void,
    isCartEmpty: boolean,
    setCartEmpty: Dispatch<SetStateAction<boolean>>
    cart: Array<ICartItem>
  },
) {
  const [currentCart, setCurrentCart] = useState<ICartItem[]>(cart);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(3);

  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
  const currentItems = currentCart.slice(indexOfFirstItem, indexOfLastItem);

  function setPage(number: number):void {
    const num = number;
    setCurrentPage(num);
  }

  useEffect(() => {
    headerRender();
  }, [currentCart]);

  useEffect(() => {
    if (isCartEmpty) {
      setCurrentCart([]);
      localStorage.setItem('cart_@vFKSQ', JSON.stringify([]));
    }
  }, [isCartEmpty]);

  return (
    <div className="cart">
      <div className="cart__wrapper">
        {currentCart.length
          ? (
            <>
              <section className="cart__items ">
                <header className="cart__header">
                  <h3 className="cart__title">Products In Cart</h3>
                  <CartPagination
                    currentCart={currentCart}
                    itemsPerPage={itemsPerPage}
                    setPage={(number: number):void => setPage(number)}
                  />
                </header>
                <CartList
                  currentItems={currentItems}
                  currentCart={currentCart}
                  setCurrentCart={setCurrentCart}
                  products={products}
                />
                <div className="cart__btns">
                  <Link to="/" className="cart__btn cart__btn_continue">
                    continue shopping
                  </Link>
                  <button type="button" className="cart__btn cart__btn_clear" onClick={() => setCartEmpty(true)}>
                    clear cart
                  </button>
                </div>
              </section>
              <CartSummary currentCart={currentCart} setModalVisible={setModalVisible} />
            </>
          )
          : <CartEmpty />}
      </div>

    </div>
  );
}
