import React, { ChangeEvent, FC } from 'react';

import { IError } from '../../utils/errors';

import './TextField.css';

export type TTextFieldProps = {
  className?: string;
  disabled?: boolean;
  hideNumberArrows?: boolean;
  label?: string;
  onChange?: (
    value: string,
    error: IError | null | undefined,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  preset?: string;
  type?: 'text' | 'number' | 'password';
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
    className += ' uix--disabled';
  }

  if (props.hideNumberArrows) {
    className += ' uix--without-arrows';
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
        placeholder={props.placeholder}
        type={inputType}
        value={props.value}
        onChange={(e) => {
          if (props.onChange) {
            props.onChange(e.target.value, null, e);
          }
        }}
      />
    </div>
  );
};
