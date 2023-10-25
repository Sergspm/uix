import React, { ChangeEvent, FC, ReactNode, SVGProps, createElement } from 'react';

import type { TFormController, TValidator } from '../../forms/types';
import { validateValue } from '../../forms/validator';
import type { TTextFieldProps } from './TextField';

import './SmartTextField.css';

type TSmartTextFieldProps = Omit<TTextFieldProps, 'type'> & {
  controller?: TFormController | null;
  errorIcon?: FC<SVGProps<SVGSVGElement>>;
  helpText?: string | null;
  maxAvailableSymbols?: number;
  showSymbolsLength?: boolean;
  status?: 'error' | null;
  successIcon?: FC<SVGProps<SVGSVGElement>>;
  suffix?: ReactNode;
  type?: 'text' | 'number' | 'password' | 'textarea';
  validators?: TValidator[];
};

export const presetsSmartTextField: Record<string, Partial<TSmartTextFieldProps>> = {};

export const SmartTextField: FC<TSmartTextFieldProps> = (props) => {
  const preset = (props.preset ? presetsSmartTextField[props.preset] : null) || {};
  const disabled = props.disabled || preset.disabled;
  const label = props.label || preset.label;
  const SuccessIcon = props.successIcon || preset.successIcon;
  const ErrorIcon = props.errorIcon || preset.errorIcon;
  const hasError =
    props.status === 'error' ||
    preset.status === 'error' ||
    Boolean(props.controller && props.controller.error);
  const helpText =
    props.helpText ||
    preset.helpText ||
    (props.controller && props.controller.error ? props.controller.error.message : null);
  const hasValidators = Boolean(
    props.validators || (props.controller && props.controller.hasValidators)
  );
  const suffix = props.suffix || preset.suffix;
  const touched = Boolean(props.controller && props.controller.touched);
  const inputType = props.type || preset.type || 'text';
  const isTextarea = inputType === 'textarea';
  const showSymbolsLength = props.showSymbolsLength || preset.showSymbolsLength || false;
  const maxAvailableSymbols = props.maxAvailableSymbols || preset.maxAvailableSymbols;

  let value = props.controller ? props.controller.value : props.value;

  if (value === null) {
    value = undefined;
  } else if (typeof value === 'boolean') {
    value = `${value}`;
  }

  return (
    <div
      className={
        'uix-smart-text-field' +
        (disabled ? ' uix--disabled' : '') +
        (props.hideNumberArrows || preset.hideNumberArrows ? ' uix--without-arrows' : '') +
        (props.status === 'error' || preset.status === 'error' || hasError ? ' uix--error' : '') +
        (isTextarea ? ' uix--textarea' : '') +
        (preset.className ? ' ' + preset.className : '') +
        (props.className ? ' ' + props.className : '')
      }
    >
      {(label || (showSymbolsLength && typeof value === 'string')) && (
        <div className="uix-smart-text-field__head">
          {label && <label className="uix-smart-text-field__label">{label}</label>}

          {showSymbolsLength && typeof value === 'string' && (
            <div className="uix-smart-text-field__symbols-length">{`${value.length}${
              maxAvailableSymbols !== undefined ? `/${maxAvailableSymbols}` : ''
            }`}</div>
          )}
        </div>
      )}

      <div className="uix-smart-text-field__inner">
        {createElement(isTextarea ? 'textarea' : 'input', {
          className: 'uix-smart-text-field__input',
          disabled,
          max: isTextarea ? undefined : props.valueMax || preset.valueMax,
          min: isTextarea ? undefined : props.valueMin || preset.valueMin,
          onBlur: props.onBlur || preset.onBlur,
          onClick: props.onClick || preset.onClick,
          onFocus: props.onFocus || preset.onFocus,
          placeholder: props.placeholder || preset.placeholder,
          type: isTextarea ? undefined : inputType,
          value: value,
          onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = e.target.value;
            const error = props.validators ? validateValue(value, props.validators) : null;

            if (props.controller) {
              props.controller.onChange(e.target.value, error);
            } else if (props.onChange) {
              props.onChange(e.target.value, error, e);
            }
          }
        })}

        {(suffix || hasValidators || hasError) && (
          <div className="uix-smart-text-field__suffix-container">
            {hasValidators && !hasError && SuccessIcon && touched && (
              <SuccessIcon className="uix-smart-text-field__success-icon" />
            )}

            {hasValidators && hasError && ErrorIcon && (
              <ErrorIcon className="uix-smart-text-field__error-icon" />
            )}

            {suffix && <div className="uix-smart-text-field__suffix">{suffix}</div>}
          </div>
        )}
      </div>

      {helpText && <div className="uix-smart-text-field__help-text">{helpText}</div>}
    </div>
  );
};
