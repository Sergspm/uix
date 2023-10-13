import { ReactNode, FC } from 'react';

type TAmountCalculationCardProps = {
    amountLabel?: string;
    amountMax?: number;
    amountMin?: number;
    buttonText?: string;
    className?: string;
    classNameButton?: string;
    classNameInput?: string;
    header?: ReactNode;
    inputLabel?: string;
    inputPlaceholder?: string;
    onButtonClick?: (value: number) => Promise<boolean | void> | boolean | void;
    preset?: string;
    price?: number;
    sumFormat?: 'USD' | 'EUR';
    sumLabel?: string;
};
declare const AmountCalculationCard: FC<TAmountCalculationCardProps>;

export { AmountCalculationCard, type TAmountCalculationCardProps };
