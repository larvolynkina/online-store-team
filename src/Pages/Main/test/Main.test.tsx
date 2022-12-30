import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Main from '../index';
import { IProduct } from '../../../types';
import useFetch from '../../../Hooks/useFetch';

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

const headerRender: () => void = jest.fn();
const setCartEmpty: React.Dispatch<React.SetStateAction<boolean>> = jest.fn();
const setProducts: React.Dispatch<React.SetStateAction<IProduct[]>> = jest.fn();

jest.mock('../../../Hooks/useFetch');

const mockUseFetch = useFetch as jest.MockedFunction<typeof useFetch>;

describe('Main page test', () => {
  it('main page products render', () => {
    mockUseFetch.mockReturnValue({ products, setProducts });
    render(
      <MemoryRouter>
        <Main headerRender={headerRender} setCartEmpty={setCartEmpty} />
      </MemoryRouter>,
    );
    const productItems = screen.getAllByRole('listitem');
    expect(productItems.length).toBe(2);
    expect(mockUseFetch).toBeCalled();
  });
});
