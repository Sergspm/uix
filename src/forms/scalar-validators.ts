import { TValidator } from './types';

type TIsNotEmptyProps = {
  message?: string;
  trim?: boolean;
};

export const isNotEmpty = ({ message }: TIsNotEmptyProps = {}): TValidator => ({
  name: 'isNotEmpty',
  message,
  validate: (value) => {
    let isEmpty = value === null || value === undefined || value === '';

    if (!isEmpty && typeof value === 'string' && value.trim() === '') {
      isEmpty = true;
    }

    return !isEmpty;
  }
});
