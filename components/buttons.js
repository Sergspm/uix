import { createElement } from 'react';

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

export { Button, presetsButton };
