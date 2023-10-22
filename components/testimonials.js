import React, { createElement } from 'react';

const presetsTestimonialStep = {};
const TestimonialStep = (props) => {
    const preset = (props.preset ? presetsTestimonialStep[props.preset] : null) || {};
    let className = 'uix-component-testimonial-testimonial-step';
    if (props.active || preset.active) {
        className += ' uix-component-testimonial-testimonial-step--active';
    }
    if (props.activeOnHover || preset.activeOnHover) {
        className += ' uix-component-testimonial-testimonial-step--active-on-hover';
    }
    if (preset.className) {
        className += ' ' + preset.className;
    }
    if (props.className) {
        className += ' ' + props.className;
    }
    const Icon = props.icon || preset.icon;
    const IconActive = props.iconActive || preset.iconActive;
    const hideTitle = props.hideTitle || preset.hideTitle;
    const hideDescription = props.hideDescription || preset.hideDescription;
    const title = props.title || preset.title;
    const titleActive = props.titleActive || preset.titleActive;
    const description = props.description || preset.description;
    const descriptionActive = props.descriptionActive || preset.descriptionActive;
    return createElement(props.element || preset.element || 'div', { className, href: props.href || preset.href || '' }, React.createElement(React.Fragment, null,
        React.createElement("span", { className: "uix-component-testimonial-testimonial-step__icon" },
            Icon && React.createElement(Icon, { className: "uix-component-testimonial-testimonial-step__icon-default" }),
            IconActive && (React.createElement(IconActive, { className: "uix-component-testimonial-testimonial-step__icon-active" }))),
        React.createElement("span", { className: "uix-component-testimonial-testimonial-step__content" },
            !hideTitle && (Boolean(title) || Boolean(titleActive)) && (React.createElement(React.Fragment, null,
                React.createElement("span", { className: "uix-component-testimonial-testimonial-step__title" }, title || titleActive),
                React.createElement("span", { className: "uix-component-testimonial-testimonial-step__title-active" }, titleActive || title))),
            !hideDescription && (Boolean(description) || Boolean(descriptionActive)) && (React.createElement(React.Fragment, null,
                React.createElement("span", { className: "uix-component-testimonial-testimonial-step__description" }, description || descriptionActive),
                React.createElement("span", { className: "uix-component-testimonial-testimonial-step__description-active" }, descriptionActive || description))))));
};

export { TestimonialStep, presetsTestimonialStep };
