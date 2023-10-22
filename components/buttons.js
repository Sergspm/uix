import { createElement } from 'react';

const presetsButton = {};
const Button = (p) => {
    const preset = p.preset && p.preset in presetsButton ? presetsButton[p.preset] : null;
    const props = preset ? Object.assign(Object.assign({}, preset), p) : p;
    if (preset) {
        if (p.className && preset.className) {
            props.className = preset.className + ' ' + p.className;
        }
    }
    let className = 'uix-component-button-button';
    if (props.active) {
        className += ' uix-component-button-button--active';
    }
    if (props.disabled) {
        className += ' uix-component-button-button--disabled';
    }
    if (props.className) {
        className += ' ' + props.className;
    }
    return createElement(props.element || 'button', {
        className,
        href: props.href || '',
        // @ts-ignore
        disabled: props.disabled,
        target: props.target,
        onClick: props.onClick
    }, props.children);
};

export { Button, presetsButton };
