import React, { FC, ReactNode } from 'react';

import { Button } from '../../components/buttons';
import { TextFieldSimple } from '../../components/inputs';
import { CardSimple } from '../../widgets/cards';

import './AmountCalculationCard.css';

export type TAmountCalculationCardProps = {
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

const presets: Record<string, Partial<TAmountCalculationCardProps>> = {};

const calculate = (amountSelected: string, amountAvailable?: number, price?: number) => {
  if (amountSelected !== '' && amountAvailable && amountAvailable > 0 && price && price > 0) {
    const amountRaw = parseInt(amountSelected);
    const amount = Math.min(
      isNaN(amountRaw) || amountRaw < 0 ? 0 : amountRaw,
      amountAvailable && amountAvailable >= 0 ? amountAvailable : 0
    );
    const resultPrice = price && price >= 0 ? price : 0;

    return {
      amount,
      sum: amount * resultPrice
    };
  }

  return null;
};

const preset = (name: string, props: Partial<TAmountCalculationCardProps>) => {
  presets[name] = props;
};

const amountSelected = '';
const setAmountSelected = () => {};

export const AmountCalculationCard: FC<TAmountCalculationCardProps> = (props) => {
  // const [amountSelected, setAmountSelected] = useState('');

  // const props = p.preset && p.preset in presets ? { ...presets[p.preset], ...p } : p;

  const calculation = calculate(amountSelected, props.amountAvailable, props.price);

  let className = 'uix-fm-amount-calculation-card';
  let classNameInput = 'uix-fm-amount-calculation-card__input';
  let classNameButton = 'uix-fm-amount-calculation-card__button';

  if (props.className) {
    className += ' ' + props.className;
  }

  if (props.classNameInput) {
    classNameInput += ' ' + props.classNameInput;
  }

  if (props.classNameButton) {
    classNameButton += ' ' + props.classNameButton;
  }

  return (
    <CardSimple className={className} header={props.header}>
      <TextFieldSimple
        className={classNameInput}
        hideNumberArrows
        label={props.inputLabel}
        onChange={setAmountSelected}
        placeholder={props.inputPlaceholder}
        value={amountSelected}
      />

      {calculation && (
        <div className="uix-fm-amount-calculation-card__calculation">
          <div className="uix-fm-amount-calculation-card__calculation-row">
            <div className="uix-fm-amount-calculation-card__calculation-label">
              {props.amountLabel}
            </div>

            <div className="uix-fm-amount-calculation-card__calculation-value">
              {calculation.amount}
            </div>
          </div>

          <div className="uix-fm-amount-calculation-card__calculation-row">
            <div className="uix-fm-amount-calculation-card__calculation-label">
              {props.sumLabel}
            </div>

            <div className="uix-fm-amount-calculation-card__calculation-value">
              ${calculation.sum}
            </div>
          </div>
        </div>
      )}

      <Button
        className={classNameButton}
        disabled={!calculation || !calculation.amount}
        onClick={props.onButtonClick}
      >
        {props.buttonText}
      </Button>
    </CardSimple>
  );
};
