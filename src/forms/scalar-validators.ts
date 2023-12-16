import { TValidator } from './types';

export const isNotEmpty = (
  props: {
    message?: string;
    trim?: boolean;
  } = {}
): TValidator => ({
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

export const isStringLength = (
  props: {
    max?: number;
    message?: string;
    min?: number;
    trim?: boolean;
  } = {}
): TValidator => ({
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

export const isArrayLength = (
  props: {
    max?: number;
    message?: string;
    min?: number;
  } = {}
): TValidator => ({
  name: 'isArrayLength',
  message: props.message,
  validate: (value) => {
    if (!Array.isArray(value)) {
      return false;
    }

    const length = value.length;

    if (
      (props.min !== undefined && props.min > length) ||
      (props.max !== undefined && props.max < length)
    ) {
      return false;
    }

    return true;
  }
});
