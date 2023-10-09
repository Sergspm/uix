import React from 'react';

const TextFieldSimple = (props) => {
    let className = 'uix-inputs-text-field-simple';
    let inputType = props.type || 'text';
    if (props.disabled) {
        className += ' uix-inputs-text-field-simple--disabled';
    }
    if (props.hideNumberArrows) {
        className += ' uix-inputs-text-field-simple--without-arrows';
        inputType = 'number';
    }
    if (props.className) {
        className += ' ' + props.className;
    }
    return (React.createElement("div", { className: className },
        Boolean(props.label) && (React.createElement("label", { className: "uix-inputs-text-field-simple__label" }, props.label)),
        React.createElement("input", { className: "uix-inputs-text-field-simple__input", disabled: props.disabled, onBlur: props.onBlur, onClick: props.onClick, onFocus: props.onFocus, placeholder: props.placeholder, type: inputType, value: props.value, onChange: (e) => {
                if (props.onChange) {
                    props.onChange(e.target.value, e);
                }
            } })));
};

export { TextFieldSimple };
