import { ReactNode, FC } from 'react';

type TCardProps = {
    children?: ReactNode;
    className?: string;
    header?: ReactNode;
};
declare const Card: FC<TCardProps>;

type TCardEmptyStateProps = {
    className?: string;
    description?: ReactNode;
    label?: ReactNode;
};
declare const CardEmptyState: FC<TCardEmptyStateProps>;

export { Card, CardEmptyState, type TCardEmptyStateProps, type TCardProps };
