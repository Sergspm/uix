import React, { createElement } from 'react';

const presetsTestimonialStep = {};
const TestimonialStep = (props) => {
    const preset = (props.preset ? presetsTestimonialStep[props.preset] : null) || {};
    const Icon = props.active
        ? props.iconActive || preset.iconActive || props.icon || preset.icon
        : props.icon || preset.icon;
    const title = props.active
        ? props.titleActive || preset.titleActive || props.title || preset.title
        : props.title || preset.title;
    const description = props.active
        ? props.descriptionActive || preset.descriptionActive || props.description || preset.description
        : props.description || preset.description;
    return createElement(props.element || preset.element || 'div', {
        className: 'uix-component-testimonial-testimonial-step' +
            (props.active || preset.active ? ' uix--active' : '') +
            (preset.className ? ' ' + preset.className : '') +
            (props.className ? ' ' + props.className : ''),
        href: props.href || preset.href || ''
    }, React.createElement(React.Fragment, null,
        React.createElement("span", { className: "uix-component-testimonial-testimonial-step__icon" }, Icon && React.createElement(Icon, null)),
        React.createElement("span", { className: "uix-component-testimonial-testimonial-step__content" },
            Boolean(title) && (React.createElement("span", { className: "uix-component-testimonial-testimonial-step__title" }, title)),
            Boolean(description) && (React.createElement("span", { className: "uix-component-testimonial-testimonial-step__description" }, description)))));
};

export { TestimonialStep, presetsTestimonialStep };
