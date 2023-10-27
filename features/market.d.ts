import { ReactNode, FC } from 'react';

type TSumFormat = 'USD' | 'EUR';
type TAmountCalculationCardProps = {
    amountLabel?: string;
    amountMax?: number;
    amountMin?: number;
    buttonText?: string;
    className?: string;
    classNameButton?: string;
    classNameInput?: string;
    header?: ReactNode;
    inputAmountLabel?: string;
    inputAmountPlaceholder?: string;
    inputPriceLabel?: string;
    inputPricePlaceholder?: string;
    onButtonClick?: (calculation: TCalculation) => Promise<boolean | void> | boolean | void;
    preset?: string;
    price?: number;
    priceLabel?: string;
    sumFormat?: TSumFormat;
    sumLabel?: string;
    withPriceInput?: boolean;
};
type TCalculation = {
    amount: number;
    price: number;
    sum: number;
};
declare const AmountCalculationCard: FC<TAmountCalculationCardProps>;

export { AmountCalculationCard, type TAmountCalculationCardProps, type TCalculation };
