import React from 'react';

const Step = (props) => {
    var _a;
    let className = 'uix-steps-step-wrapper';
    const element = (_a = props.element) !== null && _a !== void 0 ? _a : 'div';
    return React.createElement(element, {
        className,
        // @ts-ignore
        href: props.href,
        // @ts-ignore
        target: props.target,
        onClick: props.onClick
    }, props.children);
};

export { Step };
//# sourceMappingURL=step.js.map
