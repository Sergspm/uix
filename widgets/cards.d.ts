import { ReactNode, FC } from 'react';

type TCardEmptyStateProps = {
    className?: string;
    description?: ReactNode;
    label?: ReactNode;
};
declare const CardEmptyState: FC<TCardEmptyStateProps>;

type TCardSimpleProps = {
    children?: ReactNode;
    className?: string;
    header?: ReactNode;
};
declare const CardSimple: FC<TCardSimpleProps>;

export { CardEmptyState, CardSimple, type TCardEmptyStateProps, type TCardSimpleProps };
