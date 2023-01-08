import './index.scss';
import React, {
  useEffect,
  useState,
} from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import CartList from '../CartList/CartList';
import CartEmpty from '../CartEmpty/CartEmpty';
import CartSummary from '../CartSummary/CartSummary';
import CartPagination from '../CartPagination/CartPagination';
import { ICartItem, ICart } from '../../types';

export default function Cart(
  {
    products,
    setModalVisible,
    headerRender,
    isCartEmpty,
    setCartEmpty,
    cart,
    isOrder,
  }: ICart,
) {
  const [searchParams, setSearchParams] = useSearchParams();
  const limit: string | number = searchParams.get('limit') || 3;
  const page: string | number = searchParams.get('page') || 1;

  const [currentCart, setCurrentCart] = useState<ICartItem[]>(cart);
  const [currentPage, setCurrentPage] = useState<number>(Number(page));
  const [itemsPerPage, setItemsPerPage] = useState<number>(Number(limit));
  const [pagesInputValue, setPagesInputValue] = useState<string | number>(limit);

  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
  const currentItems: ICartItem[] = currentCart.slice(indexOfFirstItem, indexOfLastItem);

  function setQueryParams(key: string, value: string): void {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  }

  function handlePagesInput(event: React.ChangeEvent): void {
    const target = event.target as HTMLInputElement;
    const inputValue = target.value.replace(/^0/g, '').slice(0, 2);

    if (!inputValue) {
      searchParams.delete('limit');
      setSearchParams(searchParams);
      setItemsPerPage(currentCart.length);
    } else {
      setQueryParams('limit', inputValue);
      setItemsPerPage(+inputValue);
    }
    setPagesInputValue(inputValue);
  }

  function handleKeypress(e: React.KeyboardEvent): void {
    const keys: Array<string> = ['-', '+', 'e', '.', ','];
    if (keys.some((el: string) => el === e.key)) {
      e.preventDefault();
    }
  }

  useEffect(() => {
    headerRender();
  }, [currentCart]);

  useEffect(() => {
    if (isCartEmpty) {
      setCurrentCart([]);
      localStorage.setItem('cart_@vFKSQ', JSON.stringify([]));
      setSearchParams({});
    }
  }, [isCartEmpty]);

  useEffect(() => {
    if (!currentItems.length && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentItems]);

  useEffect(() => {
    if (searchParams.has('page')) {
      setQueryParams('page', String(currentPage));
    }
  }, [currentPage]);

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
                    currentPage={currentPage}
                  />
                  <div className="cart__pages pages">
                    <label htmlFor="pages-input" className="pages__label">Items per page:</label>
                    <input
                      type="number"
                      className="pages__input"
                      name="pages"
                      value={pagesInputValue}
                      id="pages-input"
                      min="1"
                      max="30"
                      onChange={(e: React.ChangeEvent): void => handlePagesInput(e)}
                      onKeyDown={(e: React.KeyboardEvent): void => handleKeypress(e)}
                    />
                  </div>
                </header>
                <CartList
                  currentItems={currentItems}
                  currentCart={currentCart}
                  setCurrentCart={setCurrentCart}
                  products={products}
                  setCartEmpty={setCartEmpty}
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
