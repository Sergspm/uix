import { useCallback, useMemo, useRef, useState } from 'react';

import type { IError, TErrorsBag } from '../utils/errors';
import type { TFormControllers, TFormValidatorsBag, TFormValue, TFormValues } from './types';
import { validateValue } from './validator';

interface IUseFormProps {
  defaultValues?: TFormValues;
  validators?: TFormValidatorsBag;
}

export const useForm = (props: IUseFormProps = {}) => {
  const [values, setValues] = useState<TFormValues>(() => props.defaultValues || {});
  const [errors, setErrors] = useState<TErrorsBag>({});

  const touched = useRef<Record<string, boolean>>({});

  const controllers = useMemo<TFormControllers>(
    () =>
      Object.keys(values).reduce<TFormControllers>((acc, name) => {
        acc[name] = {
          value: values[name],
          error: errors[name],
          hasValidators: Boolean(props.validators && props.validators[name]),
          touched: touched.current[name] || false,
          onChange: (value, error) => {
            setValues((values) => ({ ...values, [name]: value }));

            touched.current[name] = true;

            let validationError = error;

            if (!error && props.validators && props.validators[name]) {
              validationError = validateValue(value, props.validators[name]);
            }

            setErrors((errors) => {
              if (!validationError && !errors[name]) {
                return errors;
              }

              const newErrors = { ...errors };

              if (validationError) {
                newErrors[name] = validationError;
              } else {
                delete newErrors[name];
              }

              return newErrors;
            });

            if (validationError) {
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