import React, { FC, SVGProps, createElement } from 'react';

import type { TLink, TUrl } from '../../types/nextjs';

import './TestimonialStep.css';

export type TTestimonialStepProps = {
  active?: boolean;
  className?: string;
  description?: string;
  descriptionActive?: string;
  element?: 'a' | TLink | 'div';
  href?: TUrl;
  icon?: FC<SVGProps<SVGSVGElement>>;
  iconActive?: FC<SVGProps<SVGSVGElement>>;
  preset?: string;
  title?: string;
  titleActive?: string;
};

export const presetsTestimonialStep: Record<string, Partial<TTestimonialStepProps>> = {};

export const TestimonialStep: FC<TTestimonialStepProps> = (props) => {
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

  return createElement(
    props.element || preset.element || 'div',
    {
      className:
        'uix-component-testimonial-testimonial-step' +
        (props.active || preset.active ? ' uix--active' : '') +
        (preset.className ? ' ' + preset.className : '') +
        (props.className ? ' ' + props.className : ''),
      href: props.href || preset.href || ''
    },
    <>
      <span className="uix-component-testimonial-testimonial-step__icon">{Icon && <Icon />}</span>

      <span className="uix-component-testimonial-testimonial-step__content">
        {Boolean(title) && (
          <span className="uix-component-testimonial-testimonial-step__title">{title}</span>
        )}

        {Boolean(description) && (
          <span className="uix-component-testimonial-testimonial-step__description">
            {description}
          </span>
        )}
      </span>
    </>
  );
};
