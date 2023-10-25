import { FC, MouseEvent, ReactNode, createElement } from 'react';

import type { TLink, TUrl } from '../../types/nextjs';

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

  return createElement(
    props.element || preset.element || 'button',
    {
      className:
        'uix-component-button-button' +
        (props.active || preset.active ? ' uix--active' : '') +
        (props.disabled || preset.disabled ? ' uix--disabled' : '') +
        (preset.className ? ' ' + preset.className : '') +
        (props.className ? ' ' + props.className : ''),
      href: props.href || preset.href || '',
      // eslint-disable-next-line
      // @ts-ignore
      disabled: props.disabled || preset.disabled,
      target: props.target || preset.target,
      onClick: props.onClick || preset.onClick
    },
    props.children || preset.children
  );
};
