import './index.scss';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Link, useSearchParams } from 'react-router-dom';
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
    isOrder,
  }:
  {
    products: Array<IProduct>,
    setModalVisible: Dispatch<SetStateAction<boolean>>,
    headerRender: () => void,
    isCartEmpty: boolean,
    setCartEmpty: Dispatch<SetStateAction<boolean>>,
    cart: Array<ICartItem>,
    isOrder: boolean,
  },
) {
  const [searchParams, setSearchParams] = useSearchParams();
  const limit: string | number = searchParams.get('limit') || 3;
  const page: string | number = searchParams.get('page') || 1;

  const [currentCart, setCurrentCart] = useState<ICartItem[]>(cart);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(Number(page));
  const [pagesInputValue, setPagesInputValue] = useState<string | number>(limit);

  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
  const currentItems: ICartItem[] = currentCart.slice(indexOfFirstItem, indexOfLastItem);

  function setQueryParams(key: string, value: string): void {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  }

  function handlePagesInput(event: React.ChangeEvent) {
    const target = event.target as HTMLInputElement;
    const inputValue: string = target.value.replace(/[^\d]/g, '');
    if (inputValue) {
      setQueryParams('limit', inputValue);
    }
    setPagesInputValue(inputValue);
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

  useEffect(() => {
    if (pagesInputValue) {
      setItemsPerPage(Number(pagesInputValue));
    }
  }, [pagesInputValue]);

  useEffect(() => {
    if (!currentItems.length) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentItems]);

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
                    setCurrentPage={(value: number): void => setCurrentPage(value)}
                    setQueryParams={(key: string, value: string):void => setQueryParams(key, value)}
                  />
                  <div className="cart__pages pages">
                    <label htmlFor="pages-input" className="pages__label">Items per page:</label>
                    <input
                      type="text"
                      className="pages__input"
                      name="pages"
                      value={pagesInputValue}
                      id="pages-input"
                      maxLength={2}
                      onChange={(e: React.ChangeEvent): void => handlePagesInput(e)}
                    />
                  </div>
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
                  <button
                    type="button"
                    className="cart__btn cart__btn_clear"
                    onClick={(): void => setCartEmpty(true)}
                  >
                    clear cart
                  </button>
                </div>
              </section>
              <CartSummary currentCart={currentCart} setModalVisible={setModalVisible} />
            </>
          )
          : <CartEmpty isOrder={isOrder} />}
      </div>

    </div>
  );
}
