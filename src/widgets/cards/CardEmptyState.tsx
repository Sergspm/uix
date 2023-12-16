import { FC, ReactNode } from 'react';

export type TCardEmptyStateProps = {
  className?: string;
  description?: ReactNode;
  label?: ReactNode;
};

export const CardEmptyState: FC<TCardEmptyStateProps> = (props) => {
  let className = 'uix-widget-card-card-empty-state';

  if (props.className) {
    className += ' ' + props.className;
  }

  return (
    <section className={className}>
      {props.label && <div className="uix-widget-card-card-empty-state__label">{props.label}</div>}

      {props.description && (
        <div className="uix-widget-card-card-empty-state__description">{props.description}</div>
      )}
    </section>
  );
};
