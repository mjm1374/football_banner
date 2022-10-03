import React, { FunctionComponent } from 'react';
import classnames from 'classnames';

import './TeamLogo.scss';

type LogoProps = {
  logo: string;
  team: string;
  size: string;
  showName: boolean;
} & typeof defaultProps;

const defaultProps = {
  logo: '',
  team: '',
  size: '',
  showName: true,
};

const TeamLogo: FunctionComponent<LogoProps> = ({ logo, team, size, showName }) => (
  <div className="football_logo">
    <img src={logo} alt={team} className={classnames('teamLogo', size)} />
    {showName && <div className={classnames('teamName', size)}>{team}</div>}
  </div>
);

export default TeamLogo;
