import { FC, MouseEvent, ReactNode, createElement } from 'react';

import type { TLink, TUrl } from '../../types/nextjs/link';

import './Button.css';

export type TButtonProps = {
  active?: boolean;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  element?: 'a' | TLink | 'button';
  href?: TUrl;
  onClick?: (e: MouseEvent) => void;
  preset?: string;
  target?: '_blank';
  type?: 'submit' | 'reset' | 'button';
};

export const presetsButton: Record<string, Partial<TButtonProps>> = {};

export const Button: FC<TButtonProps> = (props) => {
  const preset = (props.preset ? presetsButton[props.preset] : null) || {};

  let className = 'uix-component-button-button';

  if (props.active || preset.active) {
    className += ' uix-component-button-button--active';
  }

  if (props.disabled || preset.disabled) {
    className += ' uix-component-button-button--disabled';
  }

  if (preset.className) {
    className += ' ' + preset.className;
  }

  if (props.className) {
    className += ' ' + props.className;
  }

  return createElement(
    props.element || preset.element || 'button',
    {
      className,
      href: props.href || preset.href || '',
      // @ts-ignore
      disabled: props.disabled || preset.disabled,
      target: props.target || preset.target,
      onClick: props.onClick || preset.onClick
    },
    props.children || preset.children
  );
};
