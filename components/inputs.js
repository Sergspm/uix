import React, { createElement } from 'react';

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
                onBlur: props.onBlur || preset.onBlur,
                onClick: props.onClick || preset.onClick,
                onFocus: props.onFocus || preset.onFocus,
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
        React.createElement("input", { className: "uix-component-input-text-field__input", disabled: props.disabled, max: props.valueMax, min: props.valueMin, onBlur: props.onBlur, onClick: props.onClick, onFocus: props.onFocus, placeholder: props.placeholder, type: inputType, value: props.value, onChange: (e) => {
                if (props.onChange) {
                    props.onChange(e.target.value, null, e);
                }
            } })));
};

export { SmartTextField, TextField, presetsSmartTextField };
