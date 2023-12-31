import React, { createElement, useRef, useCallback } from 'react';

const presetsButton = {};
const Button = (props) => {
    const preset = (props.preset ? presetsButton[props.preset] : null) || {};
    return createElement(props.element || preset.element || 'button', {
        className: 'uix-component-button-button' +
            (props.active || preset.active ? ' uix--active' : '') +
            (props.disabled || preset.disabled ? ' uix--disabled' : '') +
            (preset.className ? ' ' + preset.className : '') +
            (props.className ? ' ' + props.className : ''),
        href: props.href || preset.href || '',
        // eslint-disable-next-line
        // @ts-ignore
        disabled: props.disabled || preset.disabled,
        target: props.target || preset.target,
        onClick: props.onClick || preset.onClick
    }, props.children || preset.children);
};

const formatFileSizeWithLabels = (size) => {
    if (size < 1024) {
        return `${size} б`;
    }
    let label = 'кб';
    let value = size / 1024;
    if (value >= 1024) {
        label = 'мб';
        value = size / 1024 / 1024;
        if (value >= 1024) {
            label = 'гб';
            value = size / 1024 / 1024 / 1024;
        }
    }
    return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(value) + ' ' + label;
};

const presetsSimpleFileField = {};
const SimpleFileField = (props) => {
    const preset = (props.preset ? presetsSimpleFileField[props.preset] : null) || {};
    const disabled = props.disabled || preset.disabled;
    const label = props.label || preset.label;
    const hasError = props.status === 'error' ||
        preset.status === 'error' ||
        Boolean(props.controller && props.controller.error);
    const helpText = (props.controller && props.controller.error ? props.controller.error.message : null) ||
        props.helpText ||
        preset.helpText;
    const buttonText = props.buttonText || preset.buttonText;
    const placeholder = props.placeholder || preset.placeholder;
    const FileIcon = props.fileIcon || preset.fileIcon;
    const ErrorIcon = props.errorIcon || preset.errorIcon;
    const onChange = props.onChange || preset.onChange;
    const controller = props.controller || preset.controller;
    const value = props.value ||
        (props.controller && typeof props.controller.value === 'object'
            ? props.controller.value
            : null) ||
        null;
    const fileRef = useRef(null);
    const handleButtonClick = useCallback(() => {
        if (fileRef.current) {
            fileRef.current.click();
        }
    }, []);
    const handleFileChange = useCallback((e) => {
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
        }
        else if (onChange) {
            onChange(value, null, e);
        }
    }, [onChange, controller]);
    return (React.createElement("div", { className: 'uix-simple-file-field' +
            (disabled ? ' uix--disabled' : '') +
            (value ? ' uix--with-value' : '') +
            (props.status === 'error' || preset.status === 'error' || hasError ? ' uix--error' : '') +
            (preset.className ? ' ' + preset.className : '') +
            (props.className ? ' ' + props.className : '') },
        label && React.createElement("label", { className: "uix-simple-file-field__label" }, label),
        React.createElement("div", { className: "uix-simple-file-field__inner" },
            React.createElement("label", { className: "uix-simple-file-field__inner-field" },
                React.createElement("input", { ref: fileRef, className: "uix-simple-file-field__input", onChange: handleFileChange, type: "file" }),
                placeholder && !value && (React.createElement("span", { className: "uix-simple-file-field__placeholder" }, placeholder)),
                !!value && (React.createElement(React.Fragment, null,
                    FileIcon && React.createElement(FileIcon, { className: "uix-simple-file-field__file-icon" }),
                    React.createElement("span", { className: "uix-simple-file-field__file-name" }, value.name),
                    React.createElement("span", { className: "uix-simple-file-field__file-size" }, value.size !== null ? formatFileSizeWithLabels(value.size) : ''))),
                hasError && ErrorIcon && React.createElement(ErrorIcon, { className: "uix-simple-file-field__error-icon" })),
            buttonText && (React.createElement(Button, { disabled: disabled, onClick: handleButtonClick, className: 'uix-simple-file-field__button' +
                    (props.classNameButton ? ' ' + props.classNameButton : '') +
                    (preset.classNameButton ? ' ' + preset.classNameButton : '') }, buttonText))),
        helpText && React.createElement("div", { className: "uix-simple-file-field__help-text" }, helpText)));
};

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const validateValue = (value, validators) => {
    for (const validator of validators) {
        if (!validator.validate(value)) {
            return {
                validator: validator.name,
                message: validator.message || `Validation "${validator.name}" failed`
            };
        }
    }
    return null;
};

const presetsSmartTextField = {};
const SmartTextField = (props) => {
    const preset = (props.preset ? presetsSmartTextField[props.preset] : null) || {};
    const disabled = props.disabled || preset.disabled;
    const label = props.label || preset.label;
    const SuccessIcon = props.successIcon || preset.successIcon;
    const ErrorIcon = props.errorIcon || preset.errorIcon;
    const hasError = props.status === 'error' ||
        preset.status === 'error' ||
        Boolean(props.controller && props.controller.error);
    const helpText = props.helpText ||
        preset.helpText ||
        (props.controller && props.controller.error ? props.controller.error.message : null);
    const hasValidators = Boolean(props.validators || (props.controller && props.controller.hasValidators));
    const suffix = props.suffix || preset.suffix;
    const touched = Boolean(props.controller && props.controller.touched);
    const inputType = props.type || preset.type || 'text';
    const isTextarea = inputType === 'textarea';
    const showSymbolsLength = props.showSymbolsLength || preset.showSymbolsLength || false;
    const maxAvailableSymbols = props.maxAvailableSymbols || preset.maxAvailableSymbols;
    let value = props.controller ? props.controller.value : props.value;
    if (value === null) {
        value = undefined;
    }
    else if (typeof value === 'boolean') {
        value = `${value}`;
    }
    return (React.createElement("div", { className: 'uix-smart-text-field' +
            (disabled ? ' uix--disabled' : '') +
            (props.hideNumberArrows || preset.hideNumberArrows ? ' uix--without-arrows' : '') +
            (props.status === 'error' || preset.status === 'error' || hasError ? ' uix--error' : '') +
            (isTextarea ? ' uix--textarea' : '') +
            (preset.className ? ' ' + preset.className : '') +
            (props.className ? ' ' + props.className : '') },
        (label || (Boolean(showSymbolsLength) && typeof value === 'string')) && (React.createElement("div", { className: "uix-smart-text-field__head" },
            label && React.createElement("label", { className: "uix-smart-text-field__label" }, label),
            Boolean(showSymbolsLength) && typeof value === 'string' && (React.createElement("div", { className: "uix-smart-text-field__symbols-length" }, `${(showSymbolsLength === 'trim' ? value.trim() : value).length}${maxAvailableSymbols !== undefined ? `/${maxAvailableSymbols}` : ''}`)))),
        React.createElement("div", { className: "uix-smart-text-field__inner" },
            createElement(isTextarea ? 'textarea' : 'input', {
                className: 'uix-smart-text-field__input',
                disabled,
                max: isTextarea ? undefined : props.valueMax || preset.valueMax,
                min: isTextarea ? undefined : props.valueMin || preset.valueMin,
                placeholder: props.placeholder || preset.placeholder,
                type: isTextarea ? undefined : inputType,
                value: value,
                onChange: (e) => {
                    const value = e.target.value;
                    const error = props.validators ? validateValue(value, props.validators) : null;
                    if (props.controller) {
                        props.controller.onChange(e.target.value, error);
                    }
                    else if (props.onChange) {
                        props.onChange(e.target.value, error, e);
                    }
                }
            }),
            (suffix || hasValidators || hasError) && (React.createElement("div", { className: "uix-smart-text-field__suffix-container" },
                hasValidators && !hasError && SuccessIcon && touched && value !== '' && (React.createElement(SuccessIcon, { className: "uix-smart-text-field__success-icon" })),
                hasValidators && hasError && ErrorIcon && (React.createElement(ErrorIcon, { className: "uix-smart-text-field__error-icon" })),
                suffix && React.createElement("div", { className: "uix-smart-text-field__suffix" }, suffix)))),
        helpText && React.createElement("div", { className: "uix-smart-text-field__help-text" }, helpText)));
};

const presetsTextField = {};
const TextField = (p) => {
    const props = p.preset && p.preset in presetsTextField ? Object.assign(Object.assign({}, presetsTextField[p.preset]), p) : p;
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
    return (React.createElement("div", { className: className },
        Boolean(props.label) && (React.createElement("label", { className: "uix-component-input-text-field__label" }, props.label)),
        React.createElement("input", { className: "uix-component-input-text-field__input", disabled: props.disabled, max: props.valueMax, min: props.valueMin, placeholder: props.placeholder, type: inputType, value: props.value, onChange: (e) => {
                if (props.onChange) {
                    props.onChange(e.target.value, null, e);
                }
            } })));
};

export { SimpleFileField, SmartTextField, TextField, presetsSimpleFileField, presetsSmartTextField };
