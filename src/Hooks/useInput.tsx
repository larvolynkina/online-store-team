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
  const onChange = (e: React.ChangeEvent<HTMLInputElement>):void => setValue(e.target.value);
  const onBlur = ():void => setDirty(true);
  const valid: IValidations = useValidation(value, validations);

  useEffect(() => {
    if (!isDirty) {
      setInputClassName(classname);
    } else if (isDirty && !valid.isEmpty && !valid.error) {
      setInputClassName(`${classname} valid`);
    } else {
      setInputClassName(`${classname} invalid`);
    }
  }, [isDirty, valid.isEmpty, valid.error]);

  return {
    value,
    isDirty,
    inputClassName,
    onChange,
    onBlur,
    ...valid,
  };
}
