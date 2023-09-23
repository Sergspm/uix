import { FC, MouseEvent, ReactNode } from 'react';
import type { TLink, Url } from '../../types/nextjs/link';
import './Button.css';
type TCommonProps = {
    children?: ReactNode;
    className?: string;
    active?: boolean;
    disabled?: boolean;
    onClick?: (e: MouseEvent) => void;
};
type TNextLinkProps = TCommonProps & {
    element: TLink;
    href: Url;
};
type TAnchorElementProps = TCommonProps & {
    element: 'a';
    href?: string;
    target?: '_blank';
};
type TButtonElementProps = TCommonProps & {
    element: 'button';
    type?: 'submit' | 'reset' | 'button';
};
type TUnknownProps = TCommonProps & {
    type?: 'submit' | 'reset' | 'button';
};
export type TButtonProps = TUnknownProps | TNextLinkProps | TAnchorElementProps | TButtonElementProps;
export declare const Button: FC<TButtonProps>;
export {};
