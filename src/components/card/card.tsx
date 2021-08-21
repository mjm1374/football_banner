import React, { FunctionComponent } from 'react';
import classnames from 'classnames';

import './card.scss';

type CardProps = {
  className?: string;
};

const Card: FunctionComponent<CardProps> = ({ className, children }) => (
  <div className={classnames('nd-card', className)}>{children}</div>
);

export default Card;
