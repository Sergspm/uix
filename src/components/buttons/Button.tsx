import { FC, MouseEvent, ReactHTML, ReactNode, createElement } from 'react';

import './Button.css';

export interface IButtonProps {
  element?: keyof ReactHTML | FC<any>;
  children?: ReactNode;
  className?: string;
  elementProps?: Record<PropertyKey, any>;
  active?: boolean;
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
}

export const Button: FC<IButtonProps> = (props) => {
  return createElement(
    props.element ?? 'button',
    {
      ...props.elementProps,
      className: `uix-buttons-button ${props.active ? 'uix-buttons-button--active' : ''} ${
        props.disabled ? 'uix-buttons-button--disabled' : ''
      } ${props.className || ''}`,
      disabled: Boolean(props.disabled),
      onClick: props.onClick
    },
    props.children
  );
};
