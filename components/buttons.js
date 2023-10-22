import { createElement } from 'react';

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
        // @ts-ignore
        disabled: props.disabled || preset.disabled,
        target: props.target || preset.target,
        onClick: props.onClick || preset.onClick
    }, props.children || preset.children);
};

export { Button, presetsButton };
