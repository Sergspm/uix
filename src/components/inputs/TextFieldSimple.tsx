import React, { ChangeEvent, FC, SyntheticEvent } from 'react';

import './TextFieldSimple.css';

type TTextFieldSimpleProps = {
  className?: string;
  placeholder?: string;
  label?: string;
  value?: string | number;
  onChange?: (value: string | null, event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: SyntheticEvent<HTMLInputElement>) => void;
  onFocus?: (e: SyntheticEvent<HTMLInputElement>) => void;
  onClick?: (e: SyntheticEvent<HTMLInputElement>) => void;
};

export const TextFieldSimple: FC<TTextFieldSimpleProps> = (props) => {
  let className = 'uix-inputs-text-field-simple';

  if (props.className) {
    className += ' ' + props.className;
  }

  return (
    <div className={className}>
      {Boolean(props.label) && (
        <label className="uix-inputs-text-field-simple__label">{props.label}</label>
      )}

      <input
        placeholder={props.placeholder}
        className="uix-inputs-text-field-simple__input"
        value={props.value}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        onChange={(e) => {
          if (props.onChange) {
            props.onChange(e.target.value, e);
          }
        }}
        onClick={props.onClick}
      />
    </div>
  );
};
