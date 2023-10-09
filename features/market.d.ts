import { ReactNode, FC } from 'react';

type TAmountCalculationCardProps = {
    amountAvailable?: number;
    amountLabel?: string;
    buttonText?: string;
    className?: string;
    classNameButton?: string;
    classNameInput?: string;
    header?: ReactNode;
    inputLabel?: string;
    inputPlaceholder?: string;
    onButtonClick?: () => void;
    preset?: string;
    price?: number;
    sumLabel?: string;
};
declare const preset: (name: string, props: Partial<TAmountCalculationCardProps>) => void;
declare const AmountCalculationCard: FC<TAmountCalculationCardProps>;

export { AmountCalculationCard, type TAmountCalculationCardProps, preset };
