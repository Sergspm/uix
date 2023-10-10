import React, { FC, ReactNode, useState } from 'react';

import { Button } from '../../components/buttons';
import { TextField } from '../../components/inputs';
import { Card } from '../../widgets/cards';

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

const presetsAmountCalculationCard: Record<string, Partial<TAmountCalculationCardProps>> = {};

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

export const AmountCalculationCard: FC<TAmountCalculationCardProps> = (p) => {
  const props =
    p.preset && p.preset in presetsAmountCalculationCard
      ? { ...presetsAmountCalculationCard[p.preset], ...p }
      : p;

  const [amountSelected, setAmountSelected] = useState('');

  const calculation = calculate(amountSelected, props.amountAvailable, props.price);

  let className = 'uix-feature-market-amount-calculation-card';
  let classNameInput = 'uix-feature-market-amount-calculation-card__input';
  let classNameButton = 'uix-feature-market-amount-calculation-card__button';

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
    <Card className={className} header={props.header}>
      <TextField
        className={classNameInput}
        label={props.inputLabel}
        onChange={(v) => {
          console.log('>>>>>>V', v);
          setAmountSelected(v);
        }}
        placeholder={props.inputPlaceholder}
        value={amountSelected}
      />

      {calculation && (
        <div className="uix-feature-market-amount-calculation-card__calculation">
          <div className="uix-feature-market-amount-calculation-card__calculation-row">
            <div className="uix-feature-market-amount-calculation-card__calculation-label">
              {props.amountLabel}
            </div>

            <div className="uix-feature-market-amount-calculation-card__calculation-value">
              {calculation.amount}
            </div>
          </div>

          <div className="uix-feature-market-amount-calculation-card__calculation-row">
            <div className="uix-feature-market-amount-calculation-card__calculation-label">
              {props.sumLabel}
            </div>

            <div className="uix-feature-market-amount-calculation-card__calculation-value">
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
    </Card>
  );
};
