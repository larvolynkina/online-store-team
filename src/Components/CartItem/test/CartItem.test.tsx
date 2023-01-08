import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { ICartItem, IProduct, TStateAction } from '../../../types';
import CartItem from '../CartItem';

const cartItems: IProduct[] = [
  {
    id: 1,
    title: 'iPhone 9',
    description: 'An apple mobile which is nothing like apple',
    price: 549,
    discountPercentage: 12.96,
    rating: 4.69,
    stock: 94,
    brand: 'Apple',
    category: 'smartphones',
    thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
    images: [
      'https://i.dummyjson.com/data/products/1/2.jpg',
      'https://i.dummyjson.com/data/products/1/3.jpg',
      'https://i.dummyjson.com/data/products/1/4.jpg',
    ],
  },
];

const currentCart: ICartItem[] = [
  {
    id: 1,
    price: 549,
    count: 1,
  },
];

const setCurrentCart: TStateAction<ICartItem[]> = jest.fn();
const setCartEmpty: TStateAction<boolean> = jest.fn();

describe('test cart item', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <CartItem
          cartItem={cartItems[0]}
          index={1}
          count={currentCart[0].count}
          currentCart={currentCart}
          setCurrentCart={setCurrentCart}
          setCartEmpty={setCartEmpty}
        />
      </MemoryRouter>,
    );
  });

  test('cart item renders', () => {
    expect(screen.getByText(/iPhone 9/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toBe(2);
  });

  test('test cart item increase button', () => {
    const btn = screen.getAllByRole('button')[1];
    expect(screen.getByTestId('count').innerHTML).toBe('1');
    userEvent.click(btn);
    expect(screen.getByTestId('count').innerHTML).toBe('2');
  });

  test('test cart item decrease button', () => {
    const btn = screen.getAllByRole('button')[0];
    expect(screen.getAllByTestId('count')[0].innerHTML).toBe('1');
    userEvent.click(btn);
    expect(screen.getAllByTestId('count')[0].innerHTML).toBe('0');
  });
});
