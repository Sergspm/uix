import React, { createElement } from 'react';

const presetsTestimonialStep = {};
const TestimonialStep = (p) => {
    const preset = p.preset && p.preset in presetsTestimonialStep ? presetsTestimonialStep[p.preset] : null;
    const props = preset ? Object.assign(Object.assign({}, preset), p) : p;
    let className = 'uix-component-testimonial-testimonial-step';
    if (props.active) {
        className += ' uix-component-testimonial-testimonial-step--active';
    }
    if (props.activeOnHover) {
        className += ' uix-component-testimonial-testimonial-step--active-on-hover';
    }
    if (preset && p.className && preset.className) {
        className = ' ' + preset.className;
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
                React.createElement("span", { className: "uix-component-testimonial-testimonial-step__title" }, props.title || props.titleActive),
                React.createElement("span", { className: "uix-component-testimonial-testimonial-step__title-active" }, props.titleActive || props.title))),
            !props.hideDescription &&
                (Boolean(props.description) || Boolean(props.descriptionActive)) && (React.createElement(React.Fragment, null,
                React.createElement("span", { className: "uix-component-testimonial-testimonial-step__description" }, props.description || props.descriptionActive),
                React.createElement("span", { className: "uix-component-testimonial-testimonial-step__description-active" }, props.descriptionActive || props.description))))));
};

export { TestimonialStep, presetsTestimonialStep };
