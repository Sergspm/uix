import { FC, MouseEvent, ReactNode, createElement, useState } from 'react';

import type { TLink, Url } from '../../types/nextjs/link';

import './Button.css';

type TCommonProps = {
  active?: boolean;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
};

type TNextLinkProps = TCommonProps & {
  element: TLink;
  href: Url;
};

type TAnchorElementProps = TCommonProps & {
  element: 'a';
  href?: string;
  target?: '_blank';
};

type TButtonElementProps = TCommonProps & {
  element: 'button';
  type?: 'submit' | 'reset' | 'button';
};

type TUnknownProps = TCommonProps & {
  type?: 'submit' | 'reset' | 'button';
};

export type TButtonProps =
  | TUnknownProps
  | TNextLinkProps
  | TAnchorElementProps
  | TButtonElementProps;

export const Button: FC<TButtonProps> = (props) => {
  const [] = useState();
  let className = 'uix-buttons-button';
  // @ts-ignore
  const element = props.element ?? 'button';

  if (props.active) {
    className += ' uix-buttons-button--active';
  }

  if (props.disabled) {
    className += ' uix-buttons-button--disabled';
  }

  if (props.className) {
    className += ' ' + props.className;
  }

  return createElement(
    element,
    {
      className,
      // @ts-ignore
      href: props.href,
      disabled: props.disabled,
      // @ts-ignore
      target: props.target,
      onClick: props.onClick
    },
    props.children
  );
};
