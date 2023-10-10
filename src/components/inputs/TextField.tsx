import React, { ChangeEvent, FC, SyntheticEvent } from 'react';

import './TextField.css';

type TTextFieldProps = {
  className?: string;
  disabled?: boolean;
  hideNumberArrows?: boolean;
  label?: string;
  onBlur?: (e: SyntheticEvent<HTMLInputElement>) => void;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: SyntheticEvent<HTMLInputElement>) => void;
  onFocus?: (e: SyntheticEvent<HTMLInputElement>) => void;
  placeholder?: string;
  preset?: string;
  type?: 'text' | 'number';
  value?: string | number;
  valueMax?: number | string;
  valueMin?: number | string;
};

const presetsTextField: Record<string, Partial<TTextFieldProps>> = {};

export const TextField: FC<TTextFieldProps> = (p) => {
  const props =
    p.preset && p.preset in presetsTextField ? { ...presetsTextField[p.preset], ...p } : p;

  let className = 'uix-component-input-text-field';
  let inputType = props.type || 'text';

  if (props.disabled) {
    className += ' uix-component-input-text-field--disabled';
  }

  if (props.hideNumberArrows) {
    className += ' uix-component-input-text-field--without-arrows';
    inputType = 'number';
  }

  if (props.className) {
    className += ' ' + props.className;
  }

  return (
    <div className={className}>
      {Boolean(props.label) && (
        <label className="uix-component-input-text-field__label">{props.label}</label>
      )}

      <input
        className="uix-component-input-text-field__input"
        disabled={props.disabled}
        max={props.valueMax}
        min={props.valueMin}
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
