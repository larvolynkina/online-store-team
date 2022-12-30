import React from 'react';
import { IModalForm } from '../../types';
import './index.scss';

export default function FormGroupPersonal(
  {
    name,
    phone,
    address,
    email,
  }: Pick<IModalForm, 'name'|'phone'|'address'|'email'>,
) {
  return (
    <div className="form__group personal">
      <h3 className="personal__title">Personal information</h3>
      <div className="personal__item">
        <label htmlFor="name" className="personal__label">
          <p className="personal__mark">Name</p>
          {(name.isDirty && (name.isEmpty || !name.isName))
          && <p className="personal__error">{name.emptyError || name.error}</p>}
        </label>
        <input
          value={name.value}
          type="text"
          className={name.inputClassName}
          placeholder="Enter name"
          id="name"
          onBlur={():void => name.setDirtyInput()}
          onChange={(e: React.ChangeEvent<HTMLInputElement>):void => name.setInputValue(e)}
        />
      </div>
      <div className="personal__item">
        <label htmlFor="phone" className="personal__label">
          <p className="personal__mark">Phone number</p>
          {(phone.isDirty && (phone.isEmpty || !phone.isPhone))
          && <p className="personal__error">{phone.emptyError || phone.error}</p>}
        </label>
        <input
          value={phone.value}
          type="tel"
          className={phone.inputClassName}
          placeholder="Enter phone number"
          id="phone"
          onBlur={():void => phone.setDirtyInput()}
          onChange={(e: React.ChangeEvent<HTMLInputElement>):void => phone.setInputValue(e)}
        />
      </div>
      <div className="personal__item">
        <label htmlFor="address" className="personal__label">
          <p className="personal__mark">Delivery address</p>
          {(address.isDirty && (address.isEmpty || !address.isAddress))
          && <p className="personal__error">{address.emptyError || address.error}</p>}
        </label>
        <input
          value={address.value}
          type="text"
          className={address.inputClassName}
          placeholder="Enter address"
          id="address"
          onBlur={():void => address.setDirtyInput()}
          onChange={(e: React.ChangeEvent<HTMLInputElement>):void => address.setInputValue(e)}
        />
      </div>
      <div className="personal__item">
        <label htmlFor="email" className="personal__label">
          <p className="personal__mark">Email</p>
          {(email.isDirty && (email.isEmpty || !email.isEmail))
          && <p className="personal__error">{email.emptyError || email.error}</p>}
        </label>
        <input
          value={email.value}
          type="email"
          className={email.inputClassName}
          placeholder="Enter email"
          id="email"
          onBlur={():void => email.setDirtyInput()}
          onChange={(e: React.ChangeEvent<HTMLInputElement>):void => email.setInputValue(e)}
        />
      </div>
    </div>
  );
}
