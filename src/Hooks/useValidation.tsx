import { useEffect, useState } from 'react';

export default function useValidation(currentValue: string, validations: {[key: string]: boolean}) {
  const [isEmpty, setEmpty] = useState<boolean>(true);
  const [emptyError, setEmptyError] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isEmail, setEmail] = useState<boolean>(false);
  const [isPhone, setPhone] = useState<boolean>(false);
  const [isName, setName] = useState<boolean>(false);
  const [isAddress, setAddress] = useState<boolean>(false);

  useEffect(() => {
    Object.keys(validations).forEach((validation: string) => {
      switch (validation) {
        case 'isEmpty':
          if (currentValue) {
            setEmpty(false);
            setEmptyError('');
          } else {
            setEmpty(true);
            setEmptyError('Field cannot be empty');
          }
          break;
        case 'isEmail':
          if (/^\S+@\S+\.\S+$/i.test(currentValue)) {
            setEmail(true);
            setError('');
          } else {
            setEmail(false);
            setError('Invalid email');
          }
          break;
        case 'isPhone':
          if (/\+\d{9,}/.test(currentValue)) {
            setPhone(true);
            setError('');
          } else {
            setPhone(false);
            setError('Invalid phone number');
          }
          break;
        case 'isName':
          if (/[a-zа-я]{3,}\s[a-zа-я]{3,}/i.test(currentValue)) {
            setName(true);
            setError('');
          } else {
            setName(false);
            setError('Invalid name');
          }
          break;
        case 'isAddress':
          if (/\S{5,}\s\S{5,}\s\S{5,}/i.test(currentValue)) {
            setAddress(true);
            setError('');
          } else {
            setAddress(false);
            setError('Invalid address');
          }
          break;
        default:
          break;
      }
    });
  }, [currentValue]);

  return {
    isEmpty,
    isEmail,
    isAddress,
    isName,
    isPhone,
    error,
    emptyError,
  };
}
