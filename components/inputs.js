import React from 'react';

const InputV1 = (props) => {
    let className = 'uix-inputs-input-v1';
    if (props.active) {
        className += ' uix-inputs-input-v1--active';
    }
    if (props.disabled) {
        className += ' uix-inputs-input-v1--disabled';
    }
    if (props.className) {
        className += ' ' + props.className;
    }
    return (React.createElement(React.Fragment, null, props.label || props.children ? (React.createElement("div", { className: "uix-inputs-input-v1-wrapper" },
        React.createElement("label", null, props.label),
        React.createElement("input", { placeholder: props.placeholder, className: className, disabled: props.disabled, onClick: props.onClick }),
        React.createElement("div", { className: "uix-inputs-input-v1-children" }, props.children))) : (React.createElement("input", { placeholder: props.placeholder, className: className, disabled: props.disabled, onClick: props.onClick }))));
};

export { InputV1 };
//# sourceMappingURL=inputs.js.map
