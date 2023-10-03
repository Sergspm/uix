import React from 'react';

const CardSimple = (props) => {
    let className = 'uix-widget-card-simple';
    if (props.className) {
        className += ' ' + props.className;
    }
    return (React.createElement("section", { className: className },
        props.header && React.createElement("div", { className: "uix-widget-card-simple__header" }, props.header),
        props.children));
};

export { CardSimple };
