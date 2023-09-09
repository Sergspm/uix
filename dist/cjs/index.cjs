'use strict';

var React = require('react');

const ButtonCircle = (props) => {
    return React.createElement("button", { className: "uix-buttons-button-circle" }, props.label);
};

const ButtonRectangle = (props) => {
    return (React.createElement("button", { className: "uix-buttons-button-rectangle" }, props.label));
};

exports.ButtonCircle = ButtonCircle;
exports.ButtonRectangle = ButtonRectangle;
//# sourceMappingURL=index.cjs.map
