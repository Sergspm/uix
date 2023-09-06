import React, { FC } from 'react';

import './ButtonRectangle.css';

export interface IButtonRectangleProps {
  label: string;
}

export const ButtonRectangle: FC<IButtonRectangleProps> = (props) => {
  return (
    <button className="uix-buttons-button-rectangle">{props.label}</button>
  );
};
