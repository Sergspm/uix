import { createElement } from 'react';

const InputV1 = (props) => {
    let className = 'uix-inputs-input-v1';
    const element = props.element;
    if (props.active) {
        className += ' uix-inputs-input-v1--active';
    }
    if (props.disabled) {
        className += ' uix-inputs-input-v1--disabled';
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
        onClick: props.onClick
    });
};

export { InputV1 };
//# sourceMappingURL=inputs.js.map
