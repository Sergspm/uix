import React, { FC } from 'react';

import './ButtonCircle.css';

export interface IButtonCircleProps {
  label: string;
}

export const ButtonCircle: FC<IButtonCircleProps> = (props) => {
  return <button className="uix-buttons-button-circle">{props.label}</button>;
};
