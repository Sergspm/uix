import { FC, MouseEvent, ReactNode, createElement } from 'react';

import type { TLink, Url } from '../../types/nextjs/link';

import './Button.css';

type TCommonProps = {
  active?: boolean;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
  preset?: string;
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

export const presetsButton: Record<string, Partial<TButtonProps>> = {};

export const Button: FC<TButtonProps> = (p) => {
  const preset = p.preset && p.preset in presetsButton ? presetsButton[p.preset] : null;
  const props = preset ? { ...preset, ...p } : p;

  if (preset) {
    if (p.className && preset.className) {
      props.className = preset.className + ' ' + p.className;
    }
  }

  let className = 'uix-component-button-button';
  const element = 'element' in props && props.element ? props.element : 'button';

  if (props.active) {
    className += ' uix-component-button-button--active';
  }

  if (props.disabled) {
    className += ' uix-component-button-button--disabled';
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
      // @ts-ignore
      disabled: props.disabled,
      target: 'target' in props ? props.target : undefined,
      onClick: props.onClick
    },
    props.children
  );
};
