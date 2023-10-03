import React from 'react';
import type { TLink, Url } from '../../types/nextjs/link';

type TCommonTestimonials = {
  // children?: React.ReactNode;
  nonActiveIcon?: React.ReactNode;
  activeIcon?: React.ReactNode;
  className?: string;
  theme?: 'Делать' | 'Завершенный';
  themeActive?: string;
  description?: 'Подпишите контракт';
  descriptionActive?: string;
  active?: boolean;
  onClick?: (e: React.MouseEvent) => void;
};

type TNextLinkProps = TCommonTestimonials & {
  element?: TLink;
  href?: Url;
};

type TAnchorElementProps = TCommonTestimonials & {
  element?: 'a';
  href?: string;
  target?: '_blank';
};

export type TTestimonials = TNextLinkProps | TAnchorElementProps;

export const TestimonialStep: React.FC<TTestimonials> = (props) => {
  let className = 'uix-testimonial-step-wrapper';
  // @ts-ignore
  const Element = props.element ?? 'div';
  const href = props.href;

  if (props.active) {
    className += ' uix-testimonial-step-wrapper--active';
  }

  return (
    // @ts-ignore
    <Element href={href || '#'} className={className} onClick={props.onClick}>
      {props.activeIcon && props.activeIcon}

      {props.nonActiveIcon && props.nonActiveIcon}

      <div>
        {props.theme && <p className="uix-testimonial-step-theme">{props.theme}</p>}

        {props.themeActive && (
          <p className="uix-testimonial-step-theme--active">{props.themeActive}</p>
        )}

        {props.description && (
          <h6 className="uix-testimonial-step-description">{props.description}</h6>
        )}

        {props.descriptionActive && (
          <h6 className="uix-testimonial-step-description--active">{props.descriptionActive}</h6>
        )}
      </div>
      {/* {props.children} */}
    </Element>
  );
};
