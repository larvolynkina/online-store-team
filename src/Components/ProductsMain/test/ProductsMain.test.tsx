import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import RootRouter from '../../../App/RootRouter';
import ProductsMain from '../ProductsMain';
import { IProduct } from '../../../types';

const data: IProduct[] = [
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
  {
    id: 2,
    title: 'iPhone X',
    description:
      'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
    price: 899,
    discountPercentage: 17.94,
    rating: 4.44,
    stock: 34,
    brand: 'Apple',
    category: 'smartphones',
    thumbnail: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
    images: [
      'https://i.dummyjson.com/data/products/2/1.jpg',
      'https://i.dummyjson.com/data/products/2/2.jpg',
      'https://i.dummyjson.com/data/products/2/3.jpg',
      'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
    ],
  },
];

const emptyData: IProduct[] = [];

const headerRender: () => void = jest.fn();
const setCartEmpty: React.Dispatch<React.SetStateAction<boolean>> = jest.fn();

describe('Products list test', () => {
  it('products render', () => {
    render(
      <ProductsMain products={data} headerRender={headerRender} setCartEmpty={setCartEmpty} />,
      { wrapper: BrowserRouter },
    );
    const productImage = screen.getByAltText('iPhone 9');
    const productPrice = screen.getByText(/899/);
    expect(productImage).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
  });

  it('product links to product page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <RootRouter />
      </MemoryRouter>,
    );

    const buyNowButton = screen.queryByRole('button', { name: 'Buy now' });
    expect(buyNowButton).toBeNull();
    const detailsButton = screen.getAllByRole('button', { name: 'Details' })[0];
    expect(detailsButton).toBeInTheDocument();
    userEvent.click(detailsButton);
    expect(screen.getByRole('button', { name: 'Buy now' })).toBeInTheDocument();
  });

  it('no products found render', () => {
    render(
      <ProductsMain products={emptyData} headerRender={headerRender} setCartEmpty={setCartEmpty} />,
      { wrapper: BrowserRouter },
    );

    const productsListItem = screen.queryByRole('listitem');
    expect(productsListItem).toBeNull();
  });
});
