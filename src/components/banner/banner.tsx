/* eslint-disable react/button-has-type */
import React, { FunctionComponent } from 'react';
import classnames from 'classnames';
import Card from 'react-bootstrap/Card';
import Table from '../table/table';
import GameCard from '../gameCard/gamecard';

import './banner.scss';

type BannerProps = {
  className?: string;
};

const Banner: FunctionComponent<BannerProps> = ({ className, children }) => {
  const season = 2021;
  const premeireLeague = 39;
  const team = 50;

  return (
    <div className={classnames('container-fluid', className)}>
      <div className="row">
        <div className="col-sm">
          <Card>
            <Table
              season={season}
              premeireLeague={premeireLeague}
              initialTeam={team}
              className="gameCard"
            />
          </Card>
        </div>
        <div className="col-sm">
          <Card className="mobileHide">
            <GameCard
              season={season}
              premeireLeague={premeireLeague}
              className="gameCard"
              team={team}
              direction
            />
          </Card>
        </div>
        <div className="col-sm">
          <Card className="mobileHide">
            <GameCard
              season={season}
              premeireLeague={premeireLeague}
              className="gameCard"
              team={team}
            />
          </Card>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Banner;
