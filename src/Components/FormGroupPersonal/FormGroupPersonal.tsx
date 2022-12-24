import React from 'react';
import useInput from '../../Hooks/useInput';
import './index.scss';

export default function FormGroupPersonal() {
  const name = useInput('', { isEmpty: true, isName: true });
  const phone = useInput('', { isEmpty: true, isPhone: true });
  const address = useInput('', { isEmpty: true, isAddress: true });
  const email = useInput('', { isEmpty: true, isEmail: true });

  return (
    <div className="form__group personal">
      <h3 className="personal__title">Personal info</h3>
      {(name.isDirty && (name.isEmpty || !name.isName))
    && <label htmlFor="name">{name.emptyError || name.error}</label>}
      <input
        value={name.value}
        type="text"
        className={name.inputClassName}
        placeholder="Enter name"
        id="name"
        onBlur={():void => name.onBlur()}
        onChange={(e: React.ChangeEvent<HTMLInputElement>):void => name.onChange(e)}
      />
      {(phone.isDirty && (phone.isEmpty || !phone.isPhone))
    && <label htmlFor="phone">{phone.emptyError || phone.error}</label>}
      <input
        value={phone.value}
        type="tel"
        className={phone.inputClassName}
        placeholder="Enter phone number"
        id="phone"
        onBlur={():void => phone.onBlur()}
        onChange={(e: React.ChangeEvent<HTMLInputElement>):void => phone.onChange(e)}
      />
      {(address.isDirty && (address.isEmpty || !address.isAddress))
    && <label htmlFor="address">{address.emptyError || address.error}</label>}
      <input
        value={address.value}
        type="text"
        className={address.inputClassName}
        placeholder="Enter address"
        id="address"
        onBlur={():void => address.onBlur()}
        onChange={(e: React.ChangeEvent<HTMLInputElement>):void => address.onChange(e)}
      />
      {(email.isDirty && (email.isEmpty || !email.isEmail))
    && <label htmlFor="email">{email.emptyError || email.error}</label>}
      <input
        value={email.value}
        type="email"
        className={email.inputClassName}
        placeholder="Enter email"
        id="email"
        onBlur={():void => email.onBlur()}
        onChange={(e: React.ChangeEvent<HTMLInputElement>):void => email.onChange(e)}
      />
    </div>
  );
}
