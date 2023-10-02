import React from 'react';
import type { TLink, Url } from '../../types/nextjs/link';
type TCommonStep = {
    children?: React.ReactNode;
    onClick?: (e: React.MouseEvent) => void;
};
type TNextLinkProps = TCommonStep & {
    element: TLink;
    href: Url;
};
type TAnchorElementProps = TCommonStep & {
    element?: 'a';
    href?: string;
    target?: '_blank';
};
export type TStep = TNextLinkProps | TAnchorElementProps;
export declare const Step: React.FC<TStep>;
export {};
