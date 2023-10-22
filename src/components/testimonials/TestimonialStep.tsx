import React, { FC, SVGProps, createElement } from 'react';

import type { TLink, TUrl } from '../../types/nextjs/link';

import './TestimonialStep.css';

export type TTestimonialStepProps = {
  active?: boolean;
  activeOnHover?: boolean;
  className?: string;
  description?: string;
  descriptionActive?: string;
  element?: 'a' | TLink | 'div';
  hideDescription?: boolean;
  hideTitle?: boolean;
  href?: TUrl;
  icon?: FC<SVGProps<SVGSVGElement>>;
  iconActive?: FC<SVGProps<SVGSVGElement>>;
  title?: string;
  titleActive?: string;
};

export const TestimonialStep: FC<TTestimonialStepProps> = (props) => {
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

  return createElement(
    props.element || 'div',
    { className, href: props.href || '' },
    <>
      <span className="uix-component-testimonial-testimonial-step__icon">
        {Icon && <Icon className="uix-component-testimonial-testimonial-step__icon-default" />}

        {IconActive && (
          <IconActive className="uix-component-testimonial-testimonial-step__icon-active" />
        )}
      </span>

      <span className="uix-component-testimonial-testimonial-step__content">
        {!props.hideTitle && (Boolean(props.title) || Boolean(props.titleActive)) && (
          <>
            <span className="uix-component-testimonial-testimonial-step__title">
              {props.title || props.titleActive}
            </span>

            <span className="uix-component-testimonial-testimonial-step__title-active">
              {props.titleActive || props.title}
            </span>
          </>
        )}

        {!props.hideDescription &&
          (Boolean(props.description) || Boolean(props.descriptionActive)) && (
            <>
              <span className="uix-component-testimonial-testimonial-step__description">
                {props.description || props.descriptionActive}
              </span>

              <span className="uix-component-testimonial-testimonial-step__description-active">
                {props.descriptionActive || props.description}
              </span>
            </>
          )}
      </span>
    </>
  );
};
