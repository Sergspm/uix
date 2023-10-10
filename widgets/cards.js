import React from 'react';

const Card = (props) => {
    let className = 'uix-widget-card-card';
    if (props.className) {
        className += ' ' + props.className;
    }
    return (React.createElement("section", { className: className },
        props.header && React.createElement("div", { className: "uix-widget-card-card__header" }, props.header),
        props.children));
};

const CardEmptyState = (props) => {
    let className = 'uix-widget-card-card-empty-state';
    if (props.className) {
        className += ' ' + props.className;
    }
    return (React.createElement("section", { className: className },
        props.label && React.createElement("div", { className: "uix-widget-card-card-empty-state__label" }, props.label),
        props.description && (React.createElement("div", { className: "uix-widget-card-card-empty-state__description" }, props.description))));
};

export { Card, CardEmptyState };
