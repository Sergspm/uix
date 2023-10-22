import React, { createElement } from 'react';

const TestimonialStep = (props) => {
    let className = 'uix-component-testimonial-testimonial-step';
    if (props.active) {
        className += ' uix-component-testimonial-testimonial-step--active';
    }
    if (props.activeOnHover) {
        className += ' uix-component-testimonial-testimonial-step--active-on-hover';
    }
    if (props.className) {
        className += ' ' + props.className;
    }
    const Icon = props.icon;
    const IconActive = props.iconActive;
    return createElement(props.element || 'div', { className, href: props.href || '' }, React.createElement(React.Fragment, null,
        React.createElement("span", { className: "uix-component-testimonial-testimonial-step__icon" },
            Icon && React.createElement(Icon, { className: "uix-component-testimonial-testimonial-step__icon-default" }),
            IconActive && (React.createElement(IconActive, { className: "uix-component-testimonial-testimonial-step__icon-active" }))),
        React.createElement("span", { className: "uix-component-testimonial-testimonial-step__content" },
            !props.hideTitle && (Boolean(props.title) || Boolean(props.titleActive)) && (React.createElement(React.Fragment, null,
                Boolean(props.title) && (React.createElement("span", { className: "uix-component-testimonial-testimonial-step__title" }, props.title)),
                Boolean(props.titleActive) && (React.createElement("span", { className: "uix-component-testimonial-testimonial-step__title-active" }, props.titleActive)))),
            !props.hideDescription &&
                (Boolean(props.description) || Boolean(props.descriptionActive)) && (React.createElement(React.Fragment, null,
                Boolean(props.description) && (React.createElement("span", { className: "uix-component-testimonial-testimonial-step__description" }, props.description)),
                Boolean(props.descriptionActive) && (React.createElement("span", { className: "uix-component-testimonial-testimonial-step__description-active" }, props.descriptionActive)))))));
};

export { TestimonialStep };
