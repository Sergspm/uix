import React from 'react';
import type { TLink, Url } from '../../types/nextjs/link';

type TCommonStep = {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
};

type TNextLinkProps = TCommonStep & {
  element: TLink;
  href: Url;
};

type TAnchorElementProps = TCommonStep & {
  element?: 'a';
  href?: string;
  target?: '_blank';
};

export type TStep = TNextLinkProps | TAnchorElementProps;

export const Step: React.FC<TStep> = (props) => {
  let className = 'uix-steps-step-wrapper';
  const element = props.element ?? 'div';

  return React.createElement(
    element,
    {
      className,
      // @ts-ignore
      href: props.href,
      // @ts-ignore
      target: props.target,
      onClick: props.onClick
    },
    props.children
  );
};
