import React, { Dispatch, SetStateAction } from 'react';

export enum ProductInnerButton {
  Remove = 'Remove',
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

type TImages = {
  [key: string]: string;
}

interface IValidations {
  isEmpty: boolean;
  isEmail: boolean;
  isAddress: boolean;
  isName: boolean;
  isPhone: boolean;
  isCardNumber: boolean;
  isCvv: boolean;
  isValid: boolean;
  error: string;
  emptyError: string;
}

interface IInput extends IValidations{
  value: string;
  isDirty: boolean;
  inputClassName: string;
  isValidInputs: boolean;
  setInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setDirtyInput: () => void;
  clearInput: () => void;
}

interface IModal {
  className: string;
  setModalVisible: React.Dispatch<SetStateAction<boolean>>;
  setCartEmpty: React.Dispatch<SetStateAction<boolean>>;
  setOrder: Dispatch<SetStateAction<boolean>>;
}

interface IModalForm {
  cardNumber: IInput;
  cardCvv: IInput;
  cardValid: IInput;
  name: IInput;
  phone: IInput;
  address: IInput;
  email: IInput;
  closeModal: () => void;
  setCartEmpty: React.Dispatch<SetStateAction<boolean>>;
  setOrder: Dispatch<SetStateAction<boolean>>;
}

type TBreadcrumbs = Pick<IProduct, 'category' | 'brand' | 'title'>;

type TPromocodes = {
  [key: string]: [string, number];
}

type TPromo = {
  setDiscount: React.Dispatch<SetStateAction<boolean>>;
  setAmount: React.Dispatch<SetStateAction<number>>;
  total: number;
  promocodes: TPromocodes;
}

type TPromoCodesItem = {
  promocode: string;
  discountPercentage: number;
  removePromocode: () => void;
}

type TCountButton = {
  className: string;
  onClick: () => void;
  src: string;
}

interface IProductCard {
  product: IProduct;
  products: IProduct[];
  headerRender: () => void;
  setModalVisible: React.Dispatch<SetStateAction<boolean>>;
  setCartEmpty: React.Dispatch<SetStateAction<boolean>>;
}

export type {
  IProduct, IData, ICartItem, IGallery, IGalleryImage, IImageLink, TBreadcrumbs,
  TPromocodes, TPromo, TPromoCodesItem, TImages, IInput, IValidations, IModal, IModalForm,
  TCountButton, IProductCard,
};
