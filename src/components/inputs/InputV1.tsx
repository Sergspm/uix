import React, { FC, ReactNode, SyntheticEvent } from 'react';
import './InputV1.css';

type TCommonProps = {
  children?: ReactNode;
  className?: string;
  placeholder?: string;
  label?: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: (event: SyntheticEvent<HTMLInputElement>) => void;
};

export type TInputProps = TCommonProps;

export const InputV1: FC<TInputProps> = (props) => {
  let className = 'uix-inputs-input-v1';

  if (props.active) {
    className += ' uix-inputs-input-v1--active';
  }

  if (props.disabled) {
    className += ' uix-inputs-input-v1--disabled';
  }

  if (props.className) {
    className += ' ' + props.className;
  }

  return (
    <>
      {props.label || props.children ? (
        <div className="uix-inputs-input-v1-wrapper">
          <label>{props.label}</label>
          <input
            placeholder={props.placeholder}
            className={className}
            disabled={props.disabled}
            onClick={props.onClick}
          />
          <div className="uix-inputs-input-v1-children">{props.children}</div>
        </div>
      ) : (
        <input
          placeholder={props.placeholder}
          className={className}
          disabled={props.disabled}
          onClick={props.onClick}
        />
      )}
    </>
  );
};
