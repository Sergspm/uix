import React, { createElement } from 'react';

const StackNav = (props) => {
    let className = 'uix-widget-nav-stack-nav';
    if (props.className) {
        className += ' ' + props.className;
    }
    return (React.createElement("section", { className: className }, props.items.map((item, index) => createElement(item.element || props.linkElement || 'a', {
        className: 'uix-widget-nav-stack-nav__item',
        href: item.href,
        key: item.key || (typeof item.href === 'string' ? item.href : index)
    }, React.createElement(React.Fragment, null,
        React.createElement("span", { className: "uix-widget-nav-stack-nav__item-title" }, item.title),
        Boolean(item.description) && (React.createElement("span", { className: "uix-widget-nav-stack-nav__item-description" }, item.description)))))));
};

export { StackNav };
