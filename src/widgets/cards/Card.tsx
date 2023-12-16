import { FC, ReactNode } from 'react';

export type TCardProps = {
  children?: ReactNode;
  className?: string;
  header?: ReactNode;
};

export const Card: FC<TCardProps> = (props) => {
  let className = 'uix-widget-card-card';

  if (props.className) {
    className += ' ' + props.className;
  }

  return (
    <section className={className}>
      {props.header && <div className="uix-widget-card-card__header">{props.header}</div>}

      {props.children}
    </section>
  );
};
