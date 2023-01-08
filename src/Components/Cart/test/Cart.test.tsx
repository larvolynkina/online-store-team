import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TStateAction, ICartItem, IProduct } from '../../../types';
import Cart from '../Cart';

const setModalVisible: TStateAction<boolean> = jest.fn();
const headerRender: () => void = jest.fn();
const setCartEmpty: TStateAction<boolean> = jest.fn();

const products: IProduct[] = [
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

const cart: ICartItem[] = [
  {
    id: 1,
    price: 549,
    count: 1,
  },
];

describe('test cart component', () => {
  test('cart renders', () => {
    render(
      <MemoryRouter>
        <Cart
          isCartEmpty={false}
          products={products}
          setModalVisible={setModalVisible}
          headerRender={headerRender}
          cart={cart}
          setCartEmpty={setCartEmpty}
          isOrder={false}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Products In Cart/i)).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('empty cart with unfinished order renders', () => {
    render(
      <MemoryRouter>
        <Cart
          isCartEmpty
          products={products}
          setModalVisible={setModalVisible}
          headerRender={headerRender}
          cart={cart}
          setCartEmpty={setCartEmpty}
          isOrder={false}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Cart is empty/i)).toBeInTheDocument();
    expect(screen.queryByText(/Order successfully completed/i)).not.toBeInTheDocument();
    const link = screen.getByRole('link');
    expect(link).toContainHTML('Go shopping');
  });

  test('empty cart with finished order renders', () => {
    render(
      <MemoryRouter>
        <Cart
          isCartEmpty
          products={products}
          setModalVisible={setModalVisible}
          headerRender={headerRender}
          cart={cart}
          setCartEmpty={setCartEmpty}
          isOrder
        />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Order successfully completed/i)).toBeInTheDocument();
    expect(screen.queryByText(/Cart is empty/i)).not.toBeInTheDocument();
  });
});
