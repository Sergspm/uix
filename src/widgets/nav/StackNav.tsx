import React, { FC, createElement } from 'react';

import { TLink, TUrl } from '../../types/nextjs';

import './StackNav.css';

export type TStackNavItem = {
  description?: string;
  element?: 'a' | TLink;
  href: TUrl;
  key?: string;
  title: string;
};

export type TStackNavProps = {
  className?: string;
  items: TStackNavItem[];
  linkElement?: 'a' | TLink;
};

export const StackNav: FC<TStackNavProps> = (props) => {
  let className = 'uix-widget-nav-stack-nav';

  if (props.className) {
    className += ' ' + props.className;
  }

  return (
    <section className={className}>
      {props.items.map((item, index) =>
        createElement(
          item.element || props.linkElement || 'a',
          {
            className: 'uix-widget-nav-stack-nav__item',
            href: item.href,
            key: item.key || (typeof item.href === 'string' ? item.href : index)
          },
          <>
            <span className="uix-widget-nav-stack-nav__item-title">{item.title}</span>

            {Boolean(item.description) && (
              <span className="uix-widget-nav-stack-nav__item-description">{item.description}</span>
            )}
          </>
        )
      )}
    </section>
  );
};
