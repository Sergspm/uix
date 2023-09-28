import React, { FC, ReactNode, SyntheticEvent } from 'react';
import './TextFieldSimple.css';
import { AlertCircleIcon } from './icons/AlertCircleIcon';
import { CheckIcon } from './icons/CheckIcon';

type TCommonProps = {
  children?: ReactNode;
  className?: string;
  placeholder?: string;
  label?: string;
  value?: string;
  error?: boolean;
  validationRight?: boolean;
  onChange?: (e: SyntheticEvent<HTMLInputElement>) => void;
  onBlur?: (e: SyntheticEvent<HTMLInputElement>) => void;
  onFocus?: (e: SyntheticEvent<HTMLInputElement>) => void;
  onClick?: (e: SyntheticEvent<HTMLInputElement>) => void;
};

export type TInputProps = TCommonProps;

export const TextFieldSimple: FC<TInputProps> = (props) => {
  let className = 'uix-inputs-text-field-simple';
  let classNameIcon = 'uix-inputs-text-field-icon';
  let classNameValidationIcon = 'uix-inputs-text-field-icon-validation';

  if (props.error) {
    className += ' uix-inputs-text-field-simple-error';
  }

  if (props.className) {
    className += ' ' + props.className;
  }

  return (
    <>
      <label>{props.label}</label>
      <br />
      <input
        placeholder={props.placeholder}
        className={`${className} ${props.error || ''}`}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        onChange={props.onChange}
        onClick={props.onClick}
      />
      {!!props.error && <AlertCircleIcon className={classNameIcon} />}

      {!!props.validationRight && <CheckIcon className={classNameValidationIcon} />}
    </>
  );
};
