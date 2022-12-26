import { useEffect, useState } from 'react';

export default function useValidation(currentValue: string, validations: {[key: string]: boolean}) {
  const [isEmpty, setEmpty] = useState<boolean>(true);
  const [emptyError, setEmptyError] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isEmail, setEmail] = useState<boolean>(false);
  const [isPhone, setPhone] = useState<boolean>(false);
  const [isName, setName] = useState<boolean>(false);
  const [isAddress, setAddress] = useState<boolean>(false);
  const [isCardNumber, setCardNumber] = useState<boolean>(false);
  const [isCvv, setCvv] = useState<boolean>(false);
  const [isValid, setValid] = useState<boolean>(false);
  const [isValidInputs, setValidInputs] = useState<boolean>(false);

  const emailReg = /^\S+@\S+\.\S+$/i;
  const phoneReg = /\+\d{9,}/;
  const nameReg = /[A-ZА-ЯЁ]{3,}\s[A-ZА-ЯЁ]{3,}/i;
  const addressReg = /\S{5,}\s\S{5,}\s\S{5,}/i;
  const creditCardReg = /\d{4}\s\d{4}\s\d{4}\s\d{4}/;
  const cvvReg = /\d{3}/;
  const validReg = /\d{2}\/\d{2}/;

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
          if (emailReg.test(currentValue)) {
            setEmail(true);
            setError('');
          } else {
            setEmail(false);
            setError('Invalid email');
          }
          break;
        case 'isPhone':
          if (phoneReg.test(currentValue)) {
            setPhone(true);
            setError('');
          } else {
            setPhone(false);
            setError('Invalid phone number');
          }
          break;
        case 'isName':
          if (nameReg.test(currentValue)) {
            setName(true);
            setError('');
          } else {
            setName(false);
            setError('Invalid name');
          }
          break;
        case 'isAddress':
          if (addressReg.test(currentValue)) {
            setAddress(true);
            setError('');
          } else {
            setAddress(false);
            setError('Invalid address');
          }
          break;
        case 'isCardNumber':
          if (creditCardReg.test(currentValue)) {
            setCardNumber(true);
            setError('');
          } else {
            setCardNumber(false);
            setError('Invalid card number');
          }
          break;
        case 'isCvv':
          if (cvvReg.test(currentValue)) {
            setCvv(true);
            setError('');
          } else {
            setCvv(false);
            setError('Invalid CVV');
          }
          break;
        case 'isValid':
          if (validReg.test(currentValue)) {
            const month = Number(currentValue.slice(0, 2).replace(/^\0/, ''));
            const year = Number(currentValue.slice(-2).replace(/^\0/, ''));
            const currentYear = Number(new Date().getFullYear().toString().slice(-2));
            if ((month <= 12 && month > 0) && (year >= currentYear)) {
              setValid(true);
              setError('');
            }
          } else {
            setValid(false);
            setError('Invalid date');
          }
          break;
        default:
          break;
      }
    });
  }, [currentValue]);

  useEffect(() => {
    if (isEmpty || !isEmail || !isAddress || !isName
        || !isPhone || !isCardNumber || !isCvv || !isValid) {
      setValidInputs(false);
    } else {
      setValidInputs(true);
    }
  }, [isEmpty,
    isEmail,
    isAddress,
    isName,
    isPhone,
    isCardNumber,
    isCvv,
    isValid]);

  useEffect(() => {
    console.log(isValidInputs);
  }, [isValidInputs]);

  return {
    isEmpty,
    isEmail,
    isAddress,
    isName,
    isPhone,
    isCardNumber,
    isCvv,
    isValid,
    error,
    emptyError,
    isValidInputs,
  };
}
