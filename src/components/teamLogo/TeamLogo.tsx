import React, { FunctionComponent } from 'react';
import classnames from 'classnames';

import './TeamLogo.scss';

type LogoProps = {
  logo?: string;
  team: string;
  size: string;
};
const TeamLogo: FunctionComponent<LogoProps> = ({ logo, team, size }) => (
  <div>
    <img src={logo} alt={team} className={classnames('teamLogo', size)} />
  </div>
);

export default TeamLogo;
