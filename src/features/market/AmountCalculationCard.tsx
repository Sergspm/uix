import React, { FC, ReactNode, useEffect, useState } from 'react';

import { Button } from '../../components/buttons';
import { TextField } from '../../components/inputs';
import { Card } from '../../widgets/cards';

import './AmountCalculationCard.css';

type TSumFormat = 'USD' | 'EUR';

export type TAmountCalculationCardProps = {
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

const presetsAmountCalculationCard: Record<string, Partial<TAmountCalculationCardProps>> = {};

export type TCalculation = {
  amount: number;
  price: number;
  sum: number;
};

const calculate = (
  amountSelected: string,
  amountMax?: number,
  price?: string
): TCalculation | null => {
  const priceConverted = typeof price === 'string' ? parseFloat(price) : null;

  if (
    amountSelected !== '' &&
    amountMax &&
    amountMax > 0 &&
    typeof priceConverted === 'number' &&
    !isNaN(priceConverted) &&
    priceConverted >= 0
  ) {
    const amountRaw = parseInt(amountSelected);
    const amount = Math.min(
      isNaN(amountRaw) || amountRaw < 0 ? 0 : amountRaw,
      amountMax && amountMax >= 0 ? amountMax : 0
    );
    const resultPrice = priceConverted && priceConverted >= 0 ? priceConverted : 0;

    return {
      amount,
      sum: amount * resultPrice,
      price: resultPrice
    };
  }

  return null;
};

const formatCurrency = (sum: number, currency?: TSumFormat) =>
  currency
    ? new Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency,
        maximumFractionDigits: 0
      }).format(sum)
    : `${sum}`;

export const AmountCalculationCard: FC<TAmountCalculationCardProps> = (p) => {
  const props =
    p.preset && p.preset in presetsAmountCalculationCard
      ? { ...presetsAmountCalculationCard[p.preset], ...p }
      : p;

  const [amountSelected, setAmountSelected] = useState('');
  const [priceSelected, setPriceSelected] = useState(() => `${props.price ?? ''}`);

  const calculation = calculate(amountSelected, props.amountMax, priceSelected);

  useEffect(() => {
    setPriceSelected(`${props.price ?? ''}`);
  }, [props.price]);

  return (
    <Card
      className={'uix-amount-calculation-card' + (props.className ? ' ' + props.className : '')}
      header={props.header}
    >
      <TextField
        hideNumberArrows
        label={props.inputAmountLabel}
        onChange={setAmountSelected}
        placeholder={props.inputAmountPlaceholder}
        value={amountSelected}
        valueMax={props.amountMax}
        valueMin={props.amountMin ?? 0}
        className={
          'uix-amount-calculation-card__input' +
          (props.classNameInput ? ' ' + props.classNameInput : '')
        }
      />

      {props.withPriceInput && (
        <TextField
          hideNumberArrows
          label={props.inputPriceLabel}
          onChange={setPriceSelected}
          placeholder={props.inputPricePlaceholder}
          value={priceSelected}
          className={
            'uix-amount-calculation-card__input' +
            (props.classNameInput ? ' ' + props.classNameInput : '')
          }
        />
      )}

      {calculation && (
        <div className="uix-amount-calculation-card__calculation">
          <CalculationRow label={props.amountLabel} value={calculation.amount} />

          {props.withPriceInput && (
            <CalculationRow
              label={props.priceLabel}
              value={formatCurrency(calculation.price, props.sumFormat)}
            />
          )}

          <CalculationRow
            label={props.sumLabel}
            value={formatCurrency(calculation.sum, props.sumFormat)}
          />
        </div>
      )}

      <Button
        disabled={!calculation || !calculation.amount}
        className={
          'uix-amount-calculation-card__button' +
          (props.classNameButton ? ' ' + props.classNameButton : '')
        }
        onClick={() => {
          if (props.onButtonClick && calculation) {
            const result = props.onButtonClick(calculation);

            if (result instanceof Promise) {
              result.then((result) => {
                if (result === true) {
                  setAmountSelected('');
                }
              });
            } else if (result === true) {
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

type TCalculationRowProps = {
  label: ReactNode;
  value: ReactNode;
};

const CalculationRow: FC<TCalculationRowProps> = (props) => (
  <div className="uix-amount-calculation-card__calculation-row">
    <div className="uix-amount-calculation-card__calculation-label">{props.label}</div>

    <div className="uix-amount-calculation-card__calculation-value">{props.value}</div>
  </div>
);
