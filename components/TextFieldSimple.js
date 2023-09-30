import React from 'react';

const TextFieldSimple = (props) => {
    let className = 'uix-inputs-text-field-simple';
    if (props.className) {
        className += ' ' + props.className;
    }
    return (React.createElement("div", { className: "uix-inputs-text-field-simple-wrapper" },
        React.createElement("label", null, props.label),
        React.createElement("input", { placeholder: props.placeholder, className: className, onBlur: props.onBlur, onFocus: props.onFocus, onChange: props.onChange, onClick: props.onClick })));
};

export { TextFieldSimple };
//# sourceMappingURL=TextFieldSimple.js.map
