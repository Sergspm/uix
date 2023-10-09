import { createElement } from 'react';

const Button = (props) => {
    var _a;
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

export { Button };
