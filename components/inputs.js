import React from 'react';

const TextFieldSimple = (props) => {
    let className = 'uix-inputs-text-field-simple';
    if (props.className) {
        className += ' ' + props.className;
    }
    return (React.createElement("div", { className: className },
        Boolean(props.label) && (React.createElement("label", { className: "uix-inputs-text-field-simple__label" }, props.label)),
        React.createElement("input", { placeholder: props.placeholder, className: "uix-inputs-text-field-simple__input", value: props.value, onBlur: props.onBlur, onFocus: props.onFocus, onChange: (e) => {
                if (props.onChange) {
                    props.onChange(e.target.value, e);
                }
            }, onClick: props.onClick })));
};

export { TextFieldSimple };
