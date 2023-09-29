import { ReactNode, FC } from 'react';

type TCardSimpleProps = {
    children?: ReactNode;
    header?: ReactNode;
    className?: string;
};
declare const CardSimple: FC<TCardSimpleProps>;

export { CardSimple, type TCardSimpleProps };
