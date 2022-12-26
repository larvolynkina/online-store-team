import React from 'react';
import { IInput } from '../../types';
import './index.scss';

export default function FormGroupPersonal(
  {
    name,
    phone,
    address,
    email,
  }:
  {
    name: IInput,
    phone: IInput,
    address: IInput,
    email: IInput,
  },
) {
  return (
    <div className="form__group personal">
      <h3 className="personal__title">Personal info</h3>
      <div className="personal__item">
        <label htmlFor="name" className="personal__label">Name:</label>
        <input
          value={name.value}
          type="text"
          className={name.inputClassName}
          placeholder="Enter name"
          id="name"
          onBlur={():void => name.onBlur()}
          onChange={(e: React.ChangeEvent<HTMLInputElement>):void => name.onChange(e)}
        />
        <div className="personal__error-wrapper">
          {(name.isDirty && (name.isEmpty || !name.isName))
          && <p className="personal__error">{name.emptyError || name.error}</p>}
        </div>
      </div>
      <div className="personal__item">
        <label htmlFor="phone" className="personal__label">Phone number:</label>
        <input
          value={phone.value}
          type="tel"
          className={phone.inputClassName}
          placeholder="Enter phone number"
          id="phone"
          onBlur={():void => phone.onBlur()}
          onChange={(e: React.ChangeEvent<HTMLInputElement>):void => phone.onChange(e)}
        />
        <div className="personal__error-wrapper">
          {(phone.isDirty && (phone.isEmpty || !phone.isPhone))
          && <p className="personal__error">{phone.emptyError || phone.error}</p>}
        </div>
      </div>
      <div className="personal__item">
        <label htmlFor="address" className="personal__label">Delivery address:</label>
        <input
          value={address.value}
          type="text"
          className={address.inputClassName}
          placeholder="Enter address"
          id="address"
          onBlur={():void => address.onBlur()}
          onChange={(e: React.ChangeEvent<HTMLInputElement>):void => address.onChange(e)}
        />
        <div className="personal__error-wrapper">
          {(address.isDirty && (address.isEmpty || !address.isAddress))
          && <p className="personal__error">{address.emptyError || address.error}</p>}
        </div>
      </div>
      <div className="personal__item">
        <label htmlFor="email" className="personal__label">Email:</label>
        <input
          value={email.value}
          type="email"
          className={email.inputClassName}
          placeholder="Enter email"
          id="email"
          onBlur={():void => email.onBlur()}
          onChange={(e: React.ChangeEvent<HTMLInputElement>):void => email.onChange(e)}
        />
        <div className="personal__error-wrapper">
          {(email.isDirty && (email.isEmpty || !email.isEmail))
          && <p className="personal__error">{email.emptyError || email.error}</p>}
        </div>
      </div>
    </div>
  );
}
