import React from 'react';

const TextFieldSimple = (props) => {
    let className = 'uix-inputs-text-field-simple';
    if (props.error) {
        className += ' uix-inputs-text-field-simple-error';
    }
    if (props.className) {
        className += ' ' + props.className;
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("label", null, props.label),
        React.createElement("br", null),
        React.createElement("input", { placeholder: props.placeholder, className: className, onClick: props.onClick })));
};

export { TextFieldSimple };
//# sourceMappingURL=TextFieldSimple.js.map
