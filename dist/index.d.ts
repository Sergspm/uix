import { FC } from 'react';

interface IButtonCircleProps {
    label: string;
}
declare const ButtonCircle: FC<IButtonCircleProps>;

interface IButtonRectangleProps {
    label: string;
}
declare const ButtonRectangle: FC<IButtonRectangleProps>;

export { ButtonCircle, ButtonRectangle, type IButtonCircleProps, type IButtonRectangleProps };
