import React from 'react';

const TestimonialStep = (props) => {
    var _a;
    let className = 'uix-testimonial-step-wrapper';
    // @ts-ignore
    const Element = (_a = props.element) !== null && _a !== void 0 ? _a : 'div';
    const href = props.href;
    if (props.active) {
        className += ' uix-testimonial-step-wrapper--active';
    }
    return (
    // @ts-ignore
    React.createElement(Element, { href: href || '#', className: className, onClick: props.onClick },
        props.activeIcon && props.activeIcon,
        props.nonActiveIcon && props.nonActiveIcon,
        React.createElement("div", null,
            props.theme && React.createElement("p", { className: "uix-testimonial-step-theme" }, props.theme),
            props.themeActive && (React.createElement("p", { className: "uix-testimonial-step-theme--active" }, props.themeActive)),
            props.description && (React.createElement("h6", { className: "uix-testimonial-step-description" }, props.description)),
            props.descriptionActive && (React.createElement("h6", { className: "uix-testimonial-step-description--active" }, props.descriptionActive)))));
};

export { TestimonialStep };
//# sourceMappingURL=testimonialstep.js.map
