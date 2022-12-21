import React, { SetStateAction } from 'react';

export enum InnerButton {
  Remove = 'Remove from cart',
  Add = 'Add to cart'
}

interface IProduct {
  brand: string,
  category: string,
  description: string,
  discountPercentage: number,
  id: number,
  images: string[],
  price: number,
  rating: number,
  stock: number,
  thumbnail: string,
  title: string,
}

interface IData {
  limit: number,
  skip: number,
  total: number,
  products: IProduct[]
}

interface ICartItem {
  id: number;
  price: number;
  count: number;
}

interface IGallery{
  images: string[] | undefined;
  title: string | undefined
}

interface IGalleryImage{
  url: string;
  alt: string | undefined;
}

interface IImageLink{
  imageLink: string;
  onClick(): void
  alt: string;
}

type TBreadcrumbs = Pick<IProduct, 'category' | 'brand' | 'title'>;

type TPromocodes = {
  [key: string]: number;
}

type TPromo = {
  setDiscount: React.Dispatch<SetStateAction<boolean>>;
  promoCodes: TPromocodes;
  setPromocodes: React.Dispatch<SetStateAction<TPromocodes>>;
  setAmount: React.Dispatch<SetStateAction<number>>;
  total: number;
}

export type {
  IProduct, IData, ICartItem, IGallery, IGalleryImage, IImageLink, TBreadcrumbs,
  TPromocodes, TPromo,
};
