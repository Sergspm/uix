import React from 'react';

const TextFieldSimple = (props) => {
    let className = 'uix-inputs-text-field-simple';
    let classNameLabel = 'uix-inputs-text-field-simple-label';
    if (props.className) {
        className += ' ' + props.className;
    }
    return (React.createElement("div", { className: "uix-inputs-text-field-simple-wrapper" },
        !!props.label && React.createElement("label", { className: classNameLabel }, props.label),
        React.createElement("input", { placeholder: props.placeholder, className: `uix-inputs-text-field-simple ${className}`, onBlur: props.onBlur, onFocus: props.onFocus, onChange: (e) => {
                if (props.onChange) {
                    props.onChange(e.target.value || null, e);
                }
            }, onClick: props.onClick })));
};

export { TextFieldSimple };
