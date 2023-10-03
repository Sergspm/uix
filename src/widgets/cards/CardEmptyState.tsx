import React, { FC, ReactNode } from 'react';

import './CardEmptyState.css';

export type TCardEmptyStateProps = {
  label?: ReactNode;
  description?: ReactNode;
  className?: string;
};

export const CardEmptyState: FC<TCardEmptyStateProps> = (props) => {
  let className = 'uix-widget-card-empty-state';

  if (props.className) {
    className += ' ' + props.className;
  }

  return (
    <section className={className}>
      {props.label && <div className="uix-widget-card-empty-state__label">{props.label}</div>}

      {props.description && (
        <div className="uix-widget-card-empty-state__description">{props.description}</div>
      )}
    </section>
  );
};
