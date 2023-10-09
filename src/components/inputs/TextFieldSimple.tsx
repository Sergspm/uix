import React, { ChangeEvent, FC, SyntheticEvent } from 'react';

import './TextFieldSimple.css';

type TTextFieldSimpleProps = {
  className?: string;
  disabled?: boolean;
  hideNumberArrows?: boolean;
  label?: string;
  onBlur?: (e: SyntheticEvent<HTMLInputElement>) => void;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: SyntheticEvent<HTMLInputElement>) => void;
  onFocus?: (e: SyntheticEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: 'text' | 'number';
  value?: string | number;
};

export const TextFieldSimple: FC<TTextFieldSimpleProps> = (props) => {
  let className = 'uix-inputs-text-field-simple';
  let inputType = props.type || 'text';

  if (props.disabled) {
    className += ' uix-inputs-text-field-simple--disabled';
  }

  if (props.hideNumberArrows) {
    className += ' uix-inputs-text-field-simple--without-arrows';
    inputType = 'number';
  }

  if (props.className) {
    className += ' ' + props.className;
  }

  return (
    <div className={className}>
      {Boolean(props.label) && (
        <label className="uix-inputs-text-field-simple__label">{props.label}</label>
      )}

      <input
        className="uix-inputs-text-field-simple__input"
        disabled={props.disabled}
        onBlur={props.onBlur}
        onClick={props.onClick}
        onFocus={props.onFocus}
        placeholder={props.placeholder}
        type={inputType}
        value={props.value}
        onChange={(e) => {
          if (props.onChange) {
            props.onChange(e.target.value, e);
          }
        }}
      />
    </div>
  );
};
