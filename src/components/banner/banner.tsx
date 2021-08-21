import React, { FunctionComponent } from 'react';
import classnames from 'classnames';

import './banner.scss';

type BannerProps = {
  className?: string;
};

const Banner: FunctionComponent<BannerProps> = ({ className, children }) => (
  <div className={classnames('nd-card', className)}>{children}</div>
);

export default Banner;
