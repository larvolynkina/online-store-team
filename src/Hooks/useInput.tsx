import React, { useEffect, useState } from 'react';
import useValidation from './useValidation';
import { IValidations } from '../types';

export default function useInput(
  initValue: string,
  classname: string,
  validations:{[key: string]: boolean},
) {
  const [value, setValue] = useState<string>(initValue);
  const [isDirty, setDirty] = useState<boolean>(false);
  const [inputClassName, setInputClassName] = useState<string>('');
  const [isValidInputs, setValidInputs] = useState<boolean>(false);
  const valid: IValidations = useValidation(value, validations);
  const setInputValue = (e: React.ChangeEvent<HTMLInputElement>):void => setValue(e.target.value);
  const setDirtyInput = ():void => setDirty(true);
  const clearInput = ():void => {
    setValue('');
    setDirty(false);
  };

  useEffect(() => {
    if (!isDirty) {
      setInputClassName(classname);
    } else if (isDirty && !valid.isEmpty && !valid.error) {
      setInputClassName(`${classname} valid`);
    } else {
      setInputClassName(`${classname} invalid`);
    }
  }, [isDirty, valid.isEmpty, valid.error]);

  useEffect(() => {
    if (!isDirty || valid.error || valid.emptyError) {
      setValidInputs(false);
    } else {
      setValidInputs(true);
    }
  }, [isDirty, valid.error, valid.emptyError]);

  return {
    value,
    isDirty,
    inputClassName,
    isValidInputs,
    setInputValue,
    setDirtyInput,
    clearInput,
    ...valid,
  };
}
