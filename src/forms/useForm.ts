import { useCallback, useMemo, useRef, useState } from 'react';

import {
  extractErrorsFromApi,
  type IError,
  type IErrorCommon,
  type TErrorsBag
} from '../utils/errors';
import type { TFormControllers, TFormValidatorsBag, TFormValue, TFormValues } from './types';
import { validateValue } from './validator';

interface IUseFormProps {
  defaultValues?: TFormValues;
  validators?: TFormValidatorsBag;
}

export const useForm = (props: IUseFormProps = {}) => {
  const [values, setValuesInternal] = useState<TFormValues>(() => props.defaultValues || {});
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
            setValuesInternal((values) => ({ ...values, [name]: value }));

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
          }
        };

        return acc;
      }, {}),
    [values, errors, props.validators]
  );

  const setValue = useCallback((name: string, value: TFormValue) => {
    setValuesInternal((values) => ({ ...values, [name]: value }));
  }, []);

  const setValues = useCallback((values: TFormValues) => {
    setValuesInternal((v) => ({ ...v, ...values }));
  }, []);

  const setError = useCallback((name: string, error: IError) => {
    setErrors((errors) => ({ ...errors, [name]: error }));
  }, []);

  const setApiErrors = useCallback((e: IErrorCommon | unknown) => {
    const newErrors = extractErrorsFromApi(e);

    if (newErrors) {
      setErrors((errors) => ({ ...errors, ...newErrors }));
    }

    return Boolean(newErrors);
  }, []);

  const resetErrors = useCallback(() => {
    setErrors({});
  }, []);

  return { values, errors, controllers, setValue, setValues, setError, setApiErrors, resetErrors };
};
