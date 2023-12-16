import { ChangeEvent, FC, SVGProps, useCallback, useRef } from 'react';

import type { TFormController, TFormFile, TValidator } from '../../forms/types';
import type { IError } from '../../utils/errors';
import { formatFileSizeWithLabels } from '../../utils/files';
import { Button } from '../buttons/Button';

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
    value: TFormFile[] | null,
    error: IError | null | undefined,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  placeholder?: string;
  preset?: string;
  status?: 'error' | null;
  validators?: TValidator[];
  value?: TFormFile[] | null;
  multiple?: boolean;
  accept?: string;
  hideFiles?: boolean;
  mode?: 'append' | 'replace';
};

export const presetsSimpleFileField: Record<string, Partial<TSimpleFileFieldProps>> = {};

const acceptPresets: Record<string, string[]> = {
  EXCEL: [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
    'application/vnd.ms-excel.sheet.macroEnabled.12',
    'application/vnd.ms-excel.template.macroEnabled.12',
    'application/vnd.ms-excel.addin.macroEnabled.12',
    'application/vnd.ms-excel.sheet.binary.macroEnabled.12'
  ],
  CSV: ['text/csv']
};

const cachedAcceptPresets: Record<string, string> = {};

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
  let mode = props.mode || preset.mode || 'append';
  let accept = props.accept || preset.accept;

  if (accept) {
    if (!cachedAcceptPresets[accept]) {
      cachedAcceptPresets[accept] = accept
        .split(',')
        .reduce<string[]>((acc, acceptItem) => {
          const acceptItemSanitized = acceptItem.trim();

          if (acceptItemSanitized) {
            acc.push(
              acceptPresets[acceptItemSanitized]
                ? acceptPresets[acceptItemSanitized].join(',')
                : acceptItemSanitized
            );
          }

          return acc;
        }, [])
        .join(',');
    }

    accept = cachedAcceptPresets[accept];
  }

  if (!props.multiple) {
    mode = 'replace';
  }

  const value =
    props.value ||
    (props.controller && Array.isArray(props.controller.value) && props.controller.value.length
      ? (props.controller.value as TFormFile[])
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
      const files: TFormFile[] = mode === 'append' && value ? [...value] : [];

      if (e.target.files) {
        for (let i = 0, l = e.target.files.length; i < l; ++i) {
          const file = e.target.files[i];

          files.push({
            file,
            name: file.name,
            size: file.size,
            type: file.type,
            path: URL.createObjectURL(file),
            id: Date.now() + ':' + Math.random()
          });
        }
      }

      if (controller) {
        controller.onChange(files, null);
      } else if (onChange) {
        onChange(files, null, e);
      }

      e.target.value = '';
    },
    [onChange, controller, mode, value]
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
            multiple={props.multiple || preset.multiple}
            accept={accept}
            disabled={disabled}
          />

          {placeholder && !value && (
            <span className="uix-simple-file-field__placeholder">{placeholder}</span>
          )}

          {!!value && (
            <span className="uix-simple-file-field__values-container">
              {value.map((f, index) => (
                <span key={f.id} className="uix-simple-file-field__file-outer">
                  {FileIcon && <FileIcon className="uix-simple-file-field__file-icon" />}

                  <span className="uix-simple-file-field__file-name">{f.name}</span>

                  {f.size !== null && (
                    <span className="uix-simple-file-field__file-size">
                      {formatFileSizeWithLabels(f.size)}
                    </span>
                  )}

                  {index < value.length - 1 && (
                    <span className="uix-simple-file-field__file-delimiter">,</span>
                  )}
                </span>
              ))}
            </span>
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
