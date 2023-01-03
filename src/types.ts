import React, { SetStateAction } from 'react';

export enum ProductInnerButton {
  Remove = 'Remove',
  Add = 'Add to cart'
}

type TStateAction<T> = React.Dispatch<SetStateAction<T>>;

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
  alt: string;
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
}

interface IModal {
  setModalVisible: TStateAction<boolean>;
  setCartEmpty: TStateAction<boolean>;
  setOrder: TStateAction<boolean>;
}

interface IModalForm {
  cardNumber: IInput;
  cardCvv: IInput;
  cardValid: IInput;
  name: IInput;
  phone: IInput;
  address: IInput;
  email: IInput;
  setModalVisible: TStateAction<boolean>;
  setCartEmpty: TStateAction<boolean>;
  setOrder: TStateAction<boolean>;
}

type TBreadcrumbs = Pick<IProduct, 'category' | 'brand' | 'title'>;

type TPromocodes = {
  [key: string]: [string, number];
}

type TPromo = {
  setDiscount: TStateAction<boolean>;
  setAmount: TStateAction<number>;
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

interface ICart {
  products: Array<IProduct>;
  setModalVisible: TStateAction<boolean>;
  headerRender: () => void;
  isCartEmpty: boolean;
  setCartEmpty: TStateAction<boolean>;
  cart: Array<ICartItem>;
  isOrder: boolean;
}

interface IProductCard {
  product: IProduct;
  products: IProduct[];
  headerRender: () => void;
  setModalVisible: TStateAction<boolean>;
  setCartEmpty: TStateAction<boolean>;
}

interface ICartList {
  products: Array<IProduct>;
  currentCart: Array<ICartItem>;
  currentItems: Array<ICartItem>;
  setCurrentCart: TStateAction<ICartItem[]>;
  setCartEmpty: TStateAction<boolean>;
}

type TItemCart = {
  currentCart: ICartItem[];
  cartItem: IProduct;
  index: number;
  count: number;
  setCurrentCart: TStateAction<ICartItem[]>;
  setCartEmpty: TStateAction<boolean>;
}

 type TCartPagination = {
  currentCart: ICartItem[];
  itemsPerPage: number;
  setCurrentPage: (number: number) => void;
  setQueryParams: (key: string, value: string) => void;
  currentPage: number;
 }

 interface IProductDescription {
  productInCart: boolean;
  setProductInCart: TStateAction<boolean>;
  product: IProduct;
  headerRender: () => void;
  btnInner: ProductInnerButton;
  addItem: () => void;
  removeItem: () => void;
  setModalVisible: TStateAction<boolean>;
 }

export type {
  IProduct, IData, ICartItem, ICart, ICartList, IGallery, IGalleryImage, IImageLink, TBreadcrumbs,
  TPromocodes, TPromo, TPromoCodesItem, TImages, IInput, IValidations, IModal, IModalForm,
  TCountButton, IProductCard, TItemCart, TCartPagination, TStateAction, IProductDescription,
};
