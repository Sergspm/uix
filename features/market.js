import React, { createElement, useState } from 'react';

const presetsButton = {};
const Button = (p) => {
    var _a;
    const props = p.preset && p.preset in presetsButton ? Object.assign(Object.assign({}, presetsButton[p.preset]), p) : p;
    let className = 'uix-component-button-button';
    // @ts-ignore
    const element = (_a = props.element) !== null && _a !== void 0 ? _a : 'button';
    if (props.active) {
        className += ' uix-component-button-button--active';
    }
    if (props.disabled) {
        className += ' uix-component-button-button--disabled';
    }
    if (props.className) {
        className += ' ' + props.className;
    }
    return createElement(element, {
        className,
        // @ts-ignore
        href: props.href,
        disabled: props.disabled,
        // @ts-ignore
        target: props.target,
        onClick: props.onClick
    }, props.children);
};

const presetsTextField = {};
const TextField = (p) => {
    const props = p.preset && p.preset in presetsTextField ? Object.assign(Object.assign({}, presetsTextField[p.preset]), p) : p;
    let className = 'uix-component-input-text-field';
    let inputType = props.type || 'text';
    if (props.disabled) {
        className += ' uix-component-input-text-field--disabled';
    }
    if (props.hideNumberArrows) {
        className += ' uix-component-input-text-field--without-arrows';
        inputType = 'number';
    }
    if (props.className) {
        className += ' ' + props.className;
    }
    return (React.createElement("div", { className: className },
        Boolean(props.label) && (React.createElement("label", { className: "uix-component-input-text-field__label" }, props.label)),
        React.createElement("input", { className: "uix-component-input-text-field__input", disabled: props.disabled, min: props.valueMin, max: props.valueMax, onBlur: props.onBlur, onClick: props.onClick, onFocus: props.onFocus, placeholder: props.placeholder, type: inputType, value: props.value, onChange: (e) => {
                if (props.onChange) {
                    props.onChange(e.target.value, e);
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
    if (amountSelected !== '' && amountMax && amountMax > 0 && price && price > 0) {
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
        React.createElement(TextField, { className: classNameInput, hideNumberArrows: true, label: props.inputLabel, onChange: setAmountSelected, placeholder: props.inputPlaceholder, value: amountSelected, valueMin: (_a = props.amountMin) !== null && _a !== void 0 ? _a : 0, valueMax: props.amountMax }),
        calculation && (React.createElement("div", { className: "uix-feature-market-amount-calculation-card__calculation" },
            React.createElement("div", { className: "uix-feature-market-amount-calculation-card__calculation-row" },
                React.createElement("div", { className: "uix-feature-market-amount-calculation-card__calculation-label" }, props.amountLabel),
                React.createElement("div", { className: "uix-feature-market-amount-calculation-card__calculation-value" }, calculation.amount)),
            React.createElement("div", { className: "uix-feature-market-amount-calculation-card__calculation-row" },
                React.createElement("div", { className: "uix-feature-market-amount-calculation-card__calculation-label" }, props.sumLabel),
                React.createElement("div", { className: "uix-feature-market-amount-calculation-card__calculation-value" },
                    "$",
                    calculation.sum)))),
        React.createElement(Button, { className: classNameButton, disabled: !calculation || !calculation.amount, onClick: () => {
                if (props.onButtonClick && calculation) {
                    const result = props.onButtonClick(calculation.amount);
                    if (result === true) {
                        setAmountSelected('');
                    }
                }
            } }, props.buttonText)));
};

export { AmountCalculationCard };
