import React from 'react';
import type { TLink, Url } from '../../types/nextjs/link';
type TCommonTestimonials = {
    nonActiveIcon?: React.ReactNode;
    activeIcon?: React.ReactNode;
    className?: string;
    theme?: 'Делать' | 'Завершенный';
    themeActive?: string;
    description?: 'Подпишите контракт';
    descriptionActive?: string;
    active?: boolean;
    onClick?: (e: React.MouseEvent) => void;
};
type TNextLinkProps = TCommonTestimonials & {
    element?: TLink;
    href?: Url;
};
type TAnchorElementProps = TCommonTestimonials & {
    element?: 'a';
    href?: string;
    target?: '_blank';
};
export type TTestimonials = TNextLinkProps | TAnchorElementProps;
export declare const TestimonialStep: React.FC<TTestimonials>;
export {};
