'use strict';

var react = require('react');

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
    return react.createElement(element, {
        className,
        // @ts-ignore
        href: props.href,
        disabled: props.disabled,
        onClick: props.onClick
    }, props.children);
};

exports.Button = Button;
//# sourceMappingURL=index.cjs.map
