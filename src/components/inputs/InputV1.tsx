import { FC, SyntheticEvent, createElement } from 'react';

import './InputV1.css';

type TCommonProps = {
  className?: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: (event: SyntheticEvent<HTMLInputElement>) => void;
};

type TInputElementProps = TCommonProps & {
  element: 'input';
};

export type TInputProps = TInputElementProps;

export const InputV1: FC<TInputProps> = (props) => {
  let className = 'uix-inputs-input-v1';

  const element = props.element;

  if (props.active) {
    className += ' uix-inputs-input-v1--active';
  }

  if (props.disabled) {
    className += ' uix-inputs-input-v1--disabled';
  }

  if (props.className) {
    className += ' ' + props.className;
  }

  return createElement(element, {
    className,
    // @ts-ignore
    href: props.href,
    disabled: props.disabled,
    // @ts-ignore
    onClick: props.onClick
  });
};
