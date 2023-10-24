import { TValidator } from './types';

export const isNotEmpty = ({ message }: { message?: string } = {}): TValidator => ({
  name: 'isNotEmpty',
  message,
  validate: (value) => {
    const isEmpty = value === null || value === undefined || value === '';

    return !isEmpty;
  }
});
