import React, { createElement, useState, useEffect } from 'react';

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
        React.createElement("input", { className: "uix-component-input-text-field__input", disabled: props.disabled, max: props.valueMax, min: props.valueMin, placeholder: props.placeholder, type: inputType, value: props.value, onChange: (e) => {
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
    const priceConverted = typeof price === 'string' ? parseFloat(price) : null;
    if (amountSelected !== '' &&
        amountMax &&
        amountMax > 0 &&
        typeof priceConverted === 'number' &&
        !isNaN(priceConverted) &&
        priceConverted >= 0) {
        const amountRaw = parseInt(amountSelected);
        const amount = Math.min(isNaN(amountRaw) || amountRaw < 0 ? 0 : amountRaw, amountMax && amountMax >= 0 ? amountMax : 0);
        const resultPrice = priceConverted && priceConverted >= 0 ? priceConverted : 0;
        return {
            amount,
            sum: amount * resultPrice,
            price: resultPrice
        };
    }
    return null;
};
const formatCurrency = (sum, currency) => currency
    ? new Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency,
        maximumFractionDigits: 0
    }).format(sum)
    : `${sum}`;
const AmountCalculationCard = (p) => {
    var _a;
    const props = p.preset && p.preset in presetsAmountCalculationCard
        ? Object.assign(Object.assign({}, presetsAmountCalculationCard[p.preset]), p) : p;
    const [amountSelected, setAmountSelected] = useState('');
    const [priceSelected, setPriceSelected] = useState(() => { var _a; return `${(_a = props.price) !== null && _a !== void 0 ? _a : ''}`; });
    const calculation = calculate(amountSelected, props.amountMax, priceSelected);
    useEffect(() => {
        var _a;
        setPriceSelected(`${(_a = props.price) !== null && _a !== void 0 ? _a : ''}`);
    }, [props.price]);
    return (React.createElement(Card, { className: 'uix-amount-calculation-card' + (props.className ? ' ' + props.className : ''), header: props.header },
        React.createElement(TextField, { hideNumberArrows: true, label: props.inputAmountLabel, onChange: setAmountSelected, placeholder: props.inputAmountPlaceholder, value: amountSelected, valueMax: props.amountMax, valueMin: (_a = props.amountMin) !== null && _a !== void 0 ? _a : 0, className: 'uix-amount-calculation-card__input' +
                (props.classNameInput ? ' ' + props.classNameInput : '') }),
        props.withPriceInput && (React.createElement(TextField, { hideNumberArrows: true, label: props.inputPriceLabel, onChange: setPriceSelected, placeholder: props.inputPricePlaceholder, value: priceSelected, className: 'uix-amount-calculation-card__input' +
                (props.classNameInput ? ' ' + props.classNameInput : '') })),
        calculation && (React.createElement("div", { className: "uix-amount-calculation-card__calculation" },
            React.createElement(CalculationRow, { label: props.amountLabel, value: calculation.amount }),
            props.withPriceInput && (React.createElement(CalculationRow, { label: props.priceLabel, value: formatCurrency(calculation.price, props.sumFormat) })),
            React.createElement(CalculationRow, { label: props.sumLabel, value: formatCurrency(calculation.sum, props.sumFormat) }))),
        React.createElement(Button, { disabled: !calculation || !calculation.amount, className: 'uix-amount-calculation-card__button' +
                (props.classNameButton ? ' ' + props.classNameButton : ''), onClick: () => {
                if (props.onButtonClick && calculation) {
                    const result = props.onButtonClick(calculation);
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
const CalculationRow = (props) => (React.createElement("div", { className: "uix-amount-calculation-card__calculation-row" },
    React.createElement("div", { className: "uix-amount-calculation-card__calculation-label" }, props.label),
    React.createElement("div", { className: "uix-amount-calculation-card__calculation-value" }, props.value)));

export { AmountCalculationCard };
