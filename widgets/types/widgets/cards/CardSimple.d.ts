import { FC, ReactNode } from 'react';
import './CardSimple.css';
export type TCardSimpleProps = {
    children?: ReactNode;
    header?: ReactNode;
    className?: string;
};
export declare const CardSimple: FC<TCardSimpleProps>;
