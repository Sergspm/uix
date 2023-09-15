import { ReactHTML, FC, ReactNode, MouseEvent } from 'react';

interface IButtonProps {
    element?: keyof ReactHTML | FC<any>;
    children?: ReactNode;
    className?: string;
    elementProps?: Record<PropertyKey, any>;
    active?: boolean;
    disabled?: boolean;
    onClick?: (e: MouseEvent) => void;
}
declare const Button: FC<IButtonProps>;

export { Button, type IButtonProps };
