import { ChangeEvent, FC } from 'react';

import { IError } from '../../utils/errors';

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
  value?: string | number | null;
  valueMax?: number | string;
  valueMin?: number | string;
};

const presetsTextField: Record<string, Partial<TTextFieldProps>> = {};

export const TextField: FC<TTextFieldProps> = (p) => {
  const props =
    p.preset && p.preset in presetsTextField ? { ...presetsTextField[p.preset], ...p } : p;

  let inputType = props.type || 'text';

  if (props.hideNumberArrows) {
    inputType = 'number';
  }

  return (
    <div
      className={
        'uix-component-input-text-field' +
        (props.disabled ? ' uix--disabled' : '') +
        (props.hideNumberArrows ? ' uix--without-arrows' : '') +
        (props.className ? ' ' + props.className : '')
      }
    >
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
        value={props.value ?? undefined}
        onChange={(e) => {
          if (props.onChange) {
            props.onChange(e.target.value, null, e);
          }
        }}
      />
    </div>
  );
};
