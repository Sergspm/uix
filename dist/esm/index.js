import React from 'react';

const ButtonCircle = (props) => {
    return React.createElement("button", { className: "uix-buttons-button-circle" }, props.label);
};

const ButtonRectangle = (props) => {
    return (React.createElement("button", { className: "uix-buttons-button-rectangle" }, props.label));
};

export { ButtonCircle, ButtonRectangle };
//# sourceMappingURL=index.js.map
