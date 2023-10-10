import React, { FC, ReactNode, useState } from 'react';

import { Button } from '../../components/buttons';
import { TextField } from '../../components/inputs';
import { Card } from '../../widgets/cards';

import './AmountCalculationCard.css';

export type TAmountCalculationCardProps = {
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
  onButtonClick?: (value: number) => boolean | void;
  preset?: string;
  price?: number;
  sumFormat?: 'USD' | 'EUR';
  sumLabel?: string;
};

const presetsAmountCalculationCard: Record<string, Partial<TAmountCalculationCardProps>> = {};

const calculate = (amountSelected: string, amountMax?: number, price?: number) => {
  if (amountSelected !== '' && amountMax && amountMax > 0 && price && price > 0) {
    const amountRaw = parseInt(amountSelected);
    const amount = Math.min(
      isNaN(amountRaw) || amountRaw < 0 ? 0 : amountRaw,
      amountMax && amountMax >= 0 ? amountMax : 0
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

  const calculation = calculate(amountSelected, props.amountMax, props.price);

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
        hideNumberArrows
        label={props.inputLabel}
        onChange={setAmountSelected}
        placeholder={props.inputPlaceholder}
        value={amountSelected}
        valueMax={props.amountMax}
        valueMin={props.amountMin ?? 0}
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
              {props.sumFormat === 'USD' || props.sumFormat === 'EUR'
                ? new Intl.NumberFormat('en-EN', {
                    style: 'currency',
                    currency: props.sumFormat,
                    maximumFractionDigits: 0
                  }).format(calculation.sum)
                : calculation.sum}
            </div>
          </div>
        </div>
      )}

      <Button
        className={classNameButton}
        disabled={!calculation || !calculation.amount}
        onClick={() => {
          if (props.onButtonClick && calculation) {
            const result = props.onButtonClick(calculation.amount);

            if (result === true) {
              setAmountSelected('');
            }
          }
        }}
      >
        {props.buttonText}
      </Button>
    </Card>
  );
};
