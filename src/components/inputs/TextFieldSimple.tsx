import React, { ChangeEvent, FC, SyntheticEvent } from 'react';
import './TextFieldSimple.css';

type TTextFieldSimple = {
  className?: string;
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: (value: string | null, event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: SyntheticEvent<HTMLInputElement>) => void;
  onFocus?: (e: SyntheticEvent<HTMLInputElement>) => void;
  onClick?: (e: SyntheticEvent<HTMLInputElement>) => void;
};

export const TextFieldSimple: FC<TTextFieldSimple> = (props) => {
  let className = 'uix-inputs-text-field-simple';
  let classNameLabel = 'uix-inputs-text-field-simple-label';

  if (props.className) {
    className += ' ' + props.className;
  }

  return (
    <div className="uix-inputs-text-field-simple-wrapper">
      {!!props.label && <label className={classNameLabel}>{props.label}</label>}
      <input
        placeholder={props.placeholder}
        className={`uix-inputs-text-field-simple ${className}`}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        onChange={(e) => {
          if (props.onChange) {
            props.onChange(e.target.value || null, e);
          }
        }}
        onClick={props.onClick}
      />
    </div>
  );
};
