import React, { FC, SyntheticEvent } from 'react';
import './TextFieldSimple.css';

type TCommonProps = {
  className?: string;
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: (e: SyntheticEvent<HTMLInputElement>) => void;
  onBlur?: (e: SyntheticEvent<HTMLInputElement>) => void;
  onFocus?: (e: SyntheticEvent<HTMLInputElement>) => void;
  onClick?: (e: SyntheticEvent<HTMLInputElement>) => void;
};

export type TInputProps = TCommonProps;

export const TextFieldSimple: FC<TInputProps> = (props) => {
  let className = 'uix-inputs-text-field-simple';

  if (props.className) {
    className += ' ' + props.className;
  }

  return (
    <div className="uix-inputs-text-field-simple-wrapper">
      <label>{props.label}</label>
      <input
        placeholder={props.placeholder}
        className={className}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        onChange={props.onChange}
        onClick={props.onClick}
      />
    </div>
  );
};
