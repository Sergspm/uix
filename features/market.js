import React, { useState, createElement } from 'react';

const Button = (props) => {
    var _a;
    useState();
    let className = 'uix-buttons-button';
    // @ts-ignore
    const element = (_a = props.element) !== null && _a !== void 0 ? _a : 'button';
    if (props.active) {
        className += ' uix-buttons-button--active';
    }
    if (props.disabled) {
        className += ' uix-buttons-button--disabled';
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

const TextFieldSimple = (props) => {
    let className = 'uix-inputs-text-field-simple';
    let inputType = props.type || 'text';
    if (props.disabled) {
        className += ' uix-inputs-text-field-simple--disabled';
    }
    if (props.hideNumberArrows) {
        className += ' uix-inputs-text-field-simple--without-arrows';
        inputType = 'number';
    }
    if (props.className) {
        className += ' ' + props.className;
    }
    return (React.createElement("div", { className: className },
        Boolean(props.label) && (React.createElement("label", { className: "uix-inputs-text-field-simple__label" }, props.label)),
        React.createElement("input", { className: "uix-inputs-text-field-simple__input", disabled: props.disabled, onBlur: props.onBlur, onClick: props.onClick, onFocus: props.onFocus, placeholder: props.placeholder, type: inputType, value: props.value, onChange: (e) => {
                if (props.onChange) {
                    props.onChange(e.target.value, e);
                }
            } })));
};

const CardSimple = (props) => {
    let className = 'uix-widget-card-simple';
    if (props.className) {
        className += ' ' + props.className;
    }
    return (React.createElement("section", { className: className },
        props.header && React.createElement("div", { className: "uix-widget-card-simple__header" }, props.header),
        props.children));
};

const calculate = (amountSelected, amountAvailable, price) => {
    if (amountSelected !== '' && amountAvailable && amountAvailable > 0 && price && price > 0) {
        const amountRaw = parseInt(amountSelected);
        const amount = Math.min(isNaN(amountRaw) || amountRaw < 0 ? 0 : amountRaw, amountAvailable && amountAvailable >= 0 ? amountAvailable : 0);
        const resultPrice = price && price >= 0 ? price : 0;
        return {
            amount,
            sum: amount * resultPrice
        };
    }
    return null;
};
const amountSelected = '';
const setAmountSelected = () => { };
const AmountCalculationCard = (props) => {
    // const [amountSelected, setAmountSelected] = useState('');
    // const props = p.preset && p.preset in presets ? { ...presets[p.preset], ...p } : p;
    const calculation = calculate(amountSelected, props.amountAvailable, props.price);
    let className = 'uix-fm-amount-calculation-card';
    let classNameInput = 'uix-fm-amount-calculation-card__input';
    let classNameButton = 'uix-fm-amount-calculation-card__button';
    if (props.className) {
        className += ' ' + props.className;
    }
    if (props.classNameInput) {
        classNameInput += ' ' + props.classNameInput;
    }
    if (props.classNameButton) {
        classNameButton += ' ' + props.classNameButton;
    }
    return (React.createElement(CardSimple, { className: className, header: props.header },
        React.createElement(TextFieldSimple, { className: classNameInput, hideNumberArrows: true, label: props.inputLabel, onChange: setAmountSelected, placeholder: props.inputPlaceholder, value: amountSelected }),
        calculation && (React.createElement("div", { className: "uix-fm-amount-calculation-card__calculation" },
            React.createElement("div", { className: "uix-fm-amount-calculation-card__calculation-row" },
                React.createElement("div", { className: "uix-fm-amount-calculation-card__calculation-label" }, props.amountLabel),
                React.createElement("div", { className: "uix-fm-amount-calculation-card__calculation-value" }, calculation.amount)),
            React.createElement("div", { className: "uix-fm-amount-calculation-card__calculation-row" },
                React.createElement("div", { className: "uix-fm-amount-calculation-card__calculation-label" }, props.sumLabel),
                React.createElement("div", { className: "uix-fm-amount-calculation-card__calculation-value" },
                    "$",
                    calculation.sum)))),
        React.createElement(Button, { className: classNameButton, disabled: !calculation || !calculation.amount, onClick: props.onButtonClick }, props.buttonText)));
};

export { AmountCalculationCard };
