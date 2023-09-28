import React from 'react';

const AlertCircleIcon = (props) => (React.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: "1em", viewBox: "0 0 16 16", fill: "none" }, props),
    React.createElement("path", { d: "M8 5.33333V8M8 10.6667H8.00667M2 8C2 8.78793 2.15519 9.56815 2.45672 10.2961C2.75825 11.0241 3.20021 11.6855 3.75736 12.2426C4.31451 12.7998 4.97595 13.2417 5.7039 13.5433C6.43185 13.8448 7.21207 14 8 14C8.78793 14 9.56815 13.8448 10.2961 13.5433C11.0241 13.2417 11.6855 12.7998 12.2426 12.2426C12.7998 11.6855 13.2417 11.0241 13.5433 10.2961C13.8448 9.56815 14 8.78793 14 8C14 6.4087 13.3679 4.88258 12.2426 3.75736C11.1174 2.63214 9.5913 2 8 2C6.4087 2 4.88258 2.63214 3.75736 3.75736C2.63214 4.88258 2 6.4087 2 8Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })));

const CheckIcon = (props) => (React.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: "1em", viewBox: "0 0 17 16", fill: "none" }, props),
    React.createElement("path", { d: "M3.83203 8.00033L7.16536 11.3337L13.832 4.66699", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })));

const TextFieldSimple = (props) => {
    let className = 'uix-inputs-text-field-simple';
    let classNameIcon = 'uix-inputs-text-field-icon';
    let classNameValidationIcon = 'uix-inputs-text-field-icon-validation';
    if (props.error) {
        className += ' uix-inputs-text-field-simple-error';
    }
    if (props.className) {
        className += ' ' + props.className;
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("label", null, props.label),
        React.createElement("br", null),
        React.createElement("input", { placeholder: props.placeholder, className: `${className} ${props.error || ''}`, onBlur: props.onBlur, onFocus: props.onFocus, onChange: props.onChange, onClick: props.onClick }),
        !!props.error && React.createElement(AlertCircleIcon, { className: classNameIcon }),
        !!props.validationRight && React.createElement(CheckIcon, { className: classNameValidationIcon })));
};

export { TextFieldSimple };
//# sourceMappingURL=buttons.js.map
