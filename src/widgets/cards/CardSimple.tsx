import React, { FC, ReactNode } from 'react';

import './CardSimple.css';

export type TCardSimpleProps = {
  children?: ReactNode;
  header?: ReactNode;
  className?: string;
};

export const CardSimple: FC<TCardSimpleProps> = (props) => {
  let className = 'uix-widget-card-simple';

  if (props.className) {
    className += ' ' + props.className;
  }

  return (
    <section className={className}>
      {props.header && <div className="uix-widget-card-simple__header">{props.header}</div>}

      {props.children}
    </section>
  );
};
