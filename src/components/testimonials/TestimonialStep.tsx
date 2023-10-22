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
  preset?: string;
  title?: string;
  titleActive?: string;
};

export const presetsTestimonialStep: Record<string, Partial<TTestimonialStepProps>> = {};

export const TestimonialStep: FC<TTestimonialStepProps> = (props) => {
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

  return createElement(
    props.element || preset.element || 'div',
    { className, href: props.href || preset.href || '' },
    <>
      <span className="uix-component-testimonial-testimonial-step__icon">
        {Icon && <Icon className="uix-component-testimonial-testimonial-step__icon-default" />}

        {IconActive && (
          <IconActive className="uix-component-testimonial-testimonial-step__icon-active" />
        )}
      </span>

      <span className="uix-component-testimonial-testimonial-step__content">
        {!hideTitle && (Boolean(title) || Boolean(titleActive)) && (
          <>
            <span className="uix-component-testimonial-testimonial-step__title">
              {title || titleActive}
            </span>

            <span className="uix-component-testimonial-testimonial-step__title-active">
              {titleActive || title}
            </span>
          </>
        )}

        {!hideDescription && (Boolean(description) || Boolean(descriptionActive)) && (
          <>
            <span className="uix-component-testimonial-testimonial-step__description">
              {description || descriptionActive}
            </span>

            <span className="uix-component-testimonial-testimonial-step__description-active">
              {descriptionActive || description}
            </span>
          </>
        )}
      </span>
    </>
  );
};
