import { createElement } from 'react';

const Button = (props) => {
    var _a;
    return createElement((_a = props.element) !== null && _a !== void 0 ? _a : 'button', Object.assign(Object.assign({}, props.elementProps), { className: `uix-buttons-button ${props.active ? 'uix-buttons-button--active' : ''} ${props.disabled ? 'uix-buttons-button--disabled' : ''} ${props.className || ''}`, disabled: Boolean(props.disabled), onClick: props.onClick }), props.children);
};

export { Button };
//# sourceMappingURL=index.js.map
