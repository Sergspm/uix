import { ReactNode, FC } from 'react';

type TAmountCalculationCardProps = {
    amountMax?: number;
    amountMin?: number;
    amountLabel?: string;
    buttonText?: string;
    className?: string;
    classNameButton?: string;
    classNameInput?: string;
    header?: ReactNode;
    inputLabel?: string;
    inputPlaceholder?: string;
    onButtonClick?: (value: number) => boolean | void;
    preset?: string;
    price?: number;
    sumLabel?: string;
};
declare const AmountCalculationCard: FC<TAmountCalculationCardProps>;

export { AmountCalculationCard, type TAmountCalculationCardProps };
