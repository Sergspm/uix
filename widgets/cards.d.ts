import { ReactNode, FC } from 'react';

type TCardEmptyStateProps = {
    label?: ReactNode;
    description?: ReactNode;
    className?: string;
};
declare const CardEmptyState: FC<TCardEmptyStateProps>;

type TCardSimpleProps = {
    children?: ReactNode;
    header?: ReactNode;
    className?: string;
};
declare const CardSimple: FC<TCardSimpleProps>;

export { CardEmptyState, CardSimple, type TCardEmptyStateProps, type TCardSimpleProps };
