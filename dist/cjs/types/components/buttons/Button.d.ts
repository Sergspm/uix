import { FC, MouseEvent, ReactHTML, ReactNode } from 'react';
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
export declare const Button: FC<IButtonProps>;
