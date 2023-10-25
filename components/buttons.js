import { createElement } from 'react';

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

export { Button, presetsButton };
