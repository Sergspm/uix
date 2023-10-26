import React, { ChangeEvent, FC, SVGProps, useCallback, useRef } from 'react';

import type { TFormController, TFormFile, TValidator } from '../../forms/types';
import type { IError } from '../../utils/errors';
import { Button } from '../buttons/Button';

import './SimpleFileField.css';

type TSimpleFileFieldProps = {
  buttonText?: string;
  className?: string;
  classNameButton?: string;
  controller?: TFormController | null;
  disabled?: boolean;
  errorIcon?: FC<SVGProps<SVGSVGElement>>;
  fileIcon?: FC<SVGProps<SVGSVGElement>>;
  helpText?: string;
  label?: string;
  onChange?: (
    value: TFormFile | null,
    error: IError | null | undefined,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  placeholder?: string;
  preset?: string;
  status?: 'error' | null;
  validators?: TValidator[];
  value?: TFormFile | null;
};

export const presetsSimpleFileField: Record<string, Partial<TSimpleFileFieldProps>> = {};

export const SimpleFileField: FC<TSimpleFileFieldProps> = (props) => {
  const preset = (props.preset ? presetsSimpleFileField[props.preset] : null) || {};
  const disabled = props.disabled || preset.disabled;
  const label = props.label || preset.label;
  const hasError =
    props.status === 'error' ||
    preset.status === 'error' ||
    Boolean(props.controller && props.controller.error);
  const helpText =
    (props.controller && props.controller.error ? props.controller.error.message : null) ||
    props.helpText ||
    preset.helpText;
  const buttonText = props.buttonText || preset.buttonText;
  const placeholder = props.placeholder || preset.placeholder;
  const FileIcon = props.fileIcon || preset.fileIcon;
  const ErrorIcon = props.errorIcon || preset.errorIcon;
  const onChange = props.onChange || preset.onChange;
  const controller = props.controller || preset.controller;

  const value =
    props.value ||
    (props.controller && typeof props.controller.value === 'object'
      ? (props.controller.value as TFormFile)
      : null) ||
    null;

  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = useCallback(() => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }, []);

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files && e.target.files.length ? e.target.files[0] : null;
      const value = file
        ? {
            file,
            name: file.name,
            size: file.size,
            type: file.type
          }
        : null;

      if (controller) {
        controller.onChange(value, null);
      } else if (onChange) {
        onChange(value, null, e);
      }
    },
    [onChange, controller]
  );

  return (
    <div
      className={
        'uix-simple-file-field' +
        (disabled ? ' uix--disabled' : '') +
        (value ? ' uix--with-value' : '') +
        (props.status === 'error' || preset.status === 'error' || hasError ? ' uix--error' : '') +
        (preset.className ? ' ' + preset.className : '') +
        (props.className ? ' ' + props.className : '')
      }
    >
      {label && <label className="uix-simple-file-field__label">{label}</label>}

      <div className="uix-simple-file-field__inner">
        <label className="uix-simple-file-field__inner-field">
          <input
            ref={fileRef}
            className="uix-simple-file-field__input"
            onChange={handleFileChange}
            type="file"
          />

          {placeholder && !value && (
            <span className="uix-simple-file-field__placeholder">{placeholder}</span>
          )}

          {!!value && (
            <>
              {FileIcon && <FileIcon className="uix-simple-file-field__file-icon" />}

              <span className="uix-simple-file-field__file-name">{value.name}</span>

              <span className="uix-simple-file-field__file-size">{value.size} кб</span>
            </>
          )}

          {hasError && ErrorIcon && <ErrorIcon className="uix-simple-file-field__error-icon" />}
        </label>

        {buttonText && (
          <Button
            disabled={disabled}
            onClick={handleButtonClick}
            className={
              'uix-simple-file-field__button' +
              (props.classNameButton ? ' ' + props.classNameButton : '') +
              (preset.classNameButton ? ' ' + preset.classNameButton : '')
            }
          >
            {buttonText}
          </Button>
        )}
      </div>

      {helpText && <div className="uix-simple-file-field__help-text">{helpText}</div>}
    </div>
  );
};
