import { IError } from '../utils/errors';
import { TFormValue, TValidator } from './types';

export const validateValueAsync = async (
  value: TFormValue,
  validators: TValidator[]
): Promise<IError | null> => {
  for (const validator of validators) {
    const result = validator.validate(value);
    const success = result instanceof Promise ? await result : result;

    if (!success) {
      return {
        validator: validator.name,
        message: validator.message || `Validation "${validator.name}" failed`
      };
    }
  }

  return null;
};

export const validateValue = (value: TFormValue, validators: TValidator[]): IError | null => {
  for (const validator of validators) {
    if (!validator.validate(value)) {
      return {
        validator: validator.name,
        message: validator.message || `Validation "${validator.name}" failed`
      };
    }
  }

  return null;
};
