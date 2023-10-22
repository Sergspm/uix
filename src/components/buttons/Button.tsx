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

export const Button: FC<TButtonProps> = (p) => {
  const preset = p.preset && p.preset in presetsButton ? presetsButton[p.preset] : null;
  const props = preset ? { ...preset, ...p } : p;

  let className = 'uix-component-button-button';

  if (props.active) {
    className += ' uix-component-button-button--active';
  }

  if (props.disabled) {
    className += ' uix-component-button-button--disabled';
  }

  if (preset && p.className && preset.className) {
    className = ' ' + preset.className;
  }

  if (props.className) {
    className += ' ' + props.className;
  }

  return createElement(
    props.element || 'button',
    {
      className,
      href: props.href || '',
      // @ts-ignore
      disabled: props.disabled,
      target: props.target,
      onClick: props.onClick
    },
    props.children
  );
};
