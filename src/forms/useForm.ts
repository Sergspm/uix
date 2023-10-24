import { useCallback, useMemo, useState } from 'react';

import type { IError, TErrorsBag } from '../utils/errors';
import type { TFormControllers, TFormValidatorsBag, TFormValue, TFormValues } from './types';
import { validateValue } from './validator';

interface IUseFormProps {
  defaultValues?: TFormValues;
  validators?: TFormValidatorsBag;
}

export const useForm = (props: IUseFormProps) => {
  const [values, setValues] = useState<TFormValues>(() => props.defaultValues || {});
  const [errors, setErrors] = useState<TErrorsBag>({});

  const controllers = useMemo<TFormControllers>(
    () =>
      Object.keys(values).reduce<TFormControllers>((acc, name) => {
        acc[name] = {
          value: values[name],
          error: errors[name],
          hasValidators: Boolean(props.validators && props.validators[name]),
          onChange: (value, error) => {
            setValues((values) => ({ ...values, [name]: value }));

            let validationError = error;

            if (!error && props.validators && props.validators[name]) {
              validationError = validateValue(value, props.validators[name]);
            }

            if (validationError) {
              setErrors((errors) => ({ ...errors, [name]: validationError }));
            }
          }
        };

        return acc;
      }, {}),
    [values, errors, props.validators]
  );

  const setValue = useCallback((name: string, value: TFormValue) => {
    setValues((values) => ({ ...values, [name]: value }));
  }, []);

  const setError = useCallback((name: string, error: IError) => {
    setErrors((errors) => ({ ...errors, [name]: error }));
  }, []);

  return { values, errors, controllers, setValue, setError };
};
