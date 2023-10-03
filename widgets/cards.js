import React from 'react';

const CardEmptyState = (props) => {
    let className = 'uix-widget-card-empty-state';
    if (props.className) {
        className += ' ' + props.className;
    }
    return (React.createElement("section", { className: className },
        props.label && React.createElement("div", { className: "uix-widget-card-empty-state__label" }, props.label),
        props.description && (React.createElement("div", { className: "uix-widget-card-empty-state__description" }, props.description))));
};

const CardSimple = (props) => {
    let className = 'uix-widget-card-simple';
    if (props.className) {
        className += ' ' + props.className;
    }
    return (React.createElement("section", { className: className },
        props.header && React.createElement("div", { className: "uix-widget-card-simple__header" }, props.header),
        props.children));
};

export { CardEmptyState, CardSimple };
