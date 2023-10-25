import { TValidator } from './types';

type TIsNotEmptyProps = {
  message?: string;
  trim?: boolean;
};

export const isNotEmpty = (props: TIsNotEmptyProps = {}): TValidator => ({
  name: 'isNotEmpty',
  message: props.message,
  validate: (value) => {
    let isEmpty = value === null || value === undefined || value === '';

    if (props.trim && !isEmpty && typeof value === 'string' && value.trim() === '') {
      isEmpty = true;
    }

    return !isEmpty;
  }
});

type TIsStringLengthProps = {
  max?: number;
  message?: string;
  min?: number;
  trim?: boolean;
};

export const isStringLength = (props: TIsStringLengthProps = {}): TValidator => ({
  name: 'isNotEmpty',
  message: props.message,
  validate: (value) => {
    if (typeof value === 'string') {
      const length = (props.trim ? value.trim() : value).length;

      if (
        (props.min !== undefined && props.min > length) ||
        (props.max !== undefined && props.max < length)
      ) {
        return false;
      }
    }

    return true;
  }
});
