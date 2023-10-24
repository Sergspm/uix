import React, { FC, ReactNode, SVGProps } from 'react';

import type { TFormController, TValidator } from '../../forms/types';
import { validateValue } from '../../forms/validator';
import type { TTextFieldProps } from './TextField';

import './SmartTextField.css';

type TSmartTextFieldProps = TTextFieldProps & {
  controller?: TFormController | null;
  errorIcon?: FC<SVGProps<SVGSVGElement>>;
  helpText?: string | null;
  status?: 'error' | null;
  successIcon?: FC<SVGProps<SVGSVGElement>>;
  suffix?: ReactNode;
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

  let className = 'uix-component-input-smart-text-field';
  let inputType = props.type || preset.type || 'text';
  let value = props.controller ? props.controller.value : props.value;

  if (value === null) {
    value = undefined;
  } else if (typeof value === 'boolean') {
    value = `${value}`;
  }

  if (disabled) {
    className += ' uix--disabled';
  }

  if (props.hideNumberArrows || preset.hideNumberArrows) {
    className += ' uix--without-arrows';
    inputType = 'number';
  }

  if (props.status === 'error' || preset.status === 'error') {
    className += ' uix--error';
  }

  if (preset.className) {
    className += ' ' + preset.className;
  }

  if (props.className) {
    className += ' ' + props.className;
  }

  return (
    <div className={className}>
      {label && <label className="uix-component-input-smart-text-field__label">{label}</label>}

      <div className="uix-component-input-smart-text-field__inner">
        <input
          className="uix-component-input-smart-text-field__input"
          disabled={disabled}
          max={props.valueMax || preset.valueMax}
          min={props.valueMin || preset.valueMin}
          onBlur={props.onBlur || preset.onBlur}
          onClick={props.onClick || preset.onClick}
          onFocus={props.onFocus || preset.onFocus}
          placeholder={props.placeholder || preset.placeholder}
          type={inputType}
          value={value}
          onChange={(e) => {
            const value = e.target.value;
            const error = props.validators ? validateValue(value, props.validators) : null;

            if (props.controller) {
              props.controller.onChange(e.target.value, error);
            } else if (props.onChange) {
              props.onChange(e.target.value, error, e);
            }
          }}
        />

        {(suffix || hasValidators) && (
          <div className="uix-component-input-smart-text-field__suffix-container">
            {hasValidators && !hasError && SuccessIcon && (
              <SuccessIcon className="uix-component-input-smart-text-field__success-icon" />
            )}

            {hasValidators && hasError && ErrorIcon && (
              <ErrorIcon className="uix-component-input-smart-text-field__error-icon" />
            )}

            {suffix && <div className="uix-component-input-smart-text-field__suffix">{suffix}</div>}
          </div>
        )}
      </div>

      {helpText && (
        <div className="uix-component-input-smart-text-field__help-text">{helpText}</div>
      )}
    </div>
  );
};
