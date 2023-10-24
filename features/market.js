import React, { createElement, useState } from 'react';

const presetsButton = {};
const Button = (props) => {
    const preset = (props.preset ? presetsButton[props.preset] : null) || {};
    let className = 'uix-component-button-button';
    if (props.active || preset.active) {
        className += ' uix-component-button-button--active';
    }
    if (props.disabled || preset.disabled) {
        className += ' uix-component-button-button--disabled';
    }
    if (preset.className) {
        className += ' ' + preset.className;
    }
    if (props.className) {
        className += ' ' + props.className;
    }
    return createElement(props.element || preset.element || 'button', {
        className,
        href: props.href || preset.href || '',
        // eslint-disable-next-line
        // @ts-ignore
        disabled: props.disabled || preset.disabled,
        target: props.target || preset.target,
        onClick: props.onClick || preset.onClick
    }, props.children || preset.children);
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

const Card = (props) => {
    let className = 'uix-widget-card-card';
    if (props.className) {
        className += ' ' + props.className;
    }
    return (React.createElement("section", { className: className },
        props.header && React.createElement("div", { className: "uix-widget-card-card__header" }, props.header),
        props.children));
};

const presetsAmountCalculationCard = {};
const calculate = (amountSelected, amountMax, price) => {
    if (amountSelected !== '' &&
        amountMax &&
        amountMax > 0 &&
        typeof price === 'number' &&
        price >= 0) {
        const amountRaw = parseInt(amountSelected);
        const amount = Math.min(isNaN(amountRaw) || amountRaw < 0 ? 0 : amountRaw, amountMax && amountMax >= 0 ? amountMax : 0);
        const resultPrice = price && price >= 0 ? price : 0;
        return {
            amount,
            sum: amount * resultPrice
        };
    }
    return null;
};
const AmountCalculationCard = (p) => {
    var _a;
    const props = p.preset && p.preset in presetsAmountCalculationCard
        ? Object.assign(Object.assign({}, presetsAmountCalculationCard[p.preset]), p) : p;
    const [amountSelected, setAmountSelected] = useState('');
    const calculation = calculate(amountSelected, props.amountMax, props.price);
    let className = 'uix-feature-market-amount-calculation-card';
    let classNameInput = 'uix-feature-market-amount-calculation-card__input';
    let classNameButton = 'uix-feature-market-amount-calculation-card__button';
    if (props.className) {
        className += ' ' + props.className;
    }
    if (props.classNameInput) {
        classNameInput += ' ' + props.classNameInput;
    }
    if (props.classNameButton) {
        classNameButton += ' ' + props.classNameButton;
    }
    return (React.createElement(Card, { className: className, header: props.header },
        React.createElement(TextField, { className: classNameInput, hideNumberArrows: true, label: props.inputLabel, onChange: setAmountSelected, placeholder: props.inputPlaceholder, value: amountSelected, valueMax: props.amountMax, valueMin: (_a = props.amountMin) !== null && _a !== void 0 ? _a : 0 }),
        calculation && (React.createElement("div", { className: "uix-feature-market-amount-calculation-card__calculation" },
            React.createElement("div", { className: "uix-feature-market-amount-calculation-card__calculation-row" },
                React.createElement("div", { className: "uix-feature-market-amount-calculation-card__calculation-label" }, props.amountLabel),
                React.createElement("div", { className: "uix-feature-market-amount-calculation-card__calculation-value" }, calculation.amount)),
            React.createElement("div", { className: "uix-feature-market-amount-calculation-card__calculation-row" },
                React.createElement("div", { className: "uix-feature-market-amount-calculation-card__calculation-label" }, props.sumLabel),
                React.createElement("div", { className: "uix-feature-market-amount-calculation-card__calculation-value" }, props.sumFormat === 'USD' || props.sumFormat === 'EUR'
                    ? new Intl.NumberFormat('en-EN', {
                        style: 'currency',
                        currency: props.sumFormat,
                        maximumFractionDigits: 0
                    }).format(calculation.sum)
                    : calculation.sum)))),
        React.createElement(Button, { className: classNameButton, disabled: !calculation || !calculation.amount, onClick: () => {
                if (props.onButtonClick && calculation) {
                    const result = props.onButtonClick(calculation.amount);
                    if (result instanceof Promise) {
                        result.then((result) => {
                            if (result === true) {
                                setAmountSelected('');
                            }
                        });
                    }
                    else if (result === true) {
                        setAmountSelected('');
                    }
                }
            } }, props.buttonText)));
};

export { AmountCalculationCard };
