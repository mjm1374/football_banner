import React, { FunctionComponent, useState } from 'react';
import classnames from 'classnames';
import Card from 'react-bootstrap/Card';
import TeamLogo from '../teamLogo/TeamLogo';
import { useMergeState } from '../../hooks';

import data from '../../data/league-table.js';

import './banner.scss';

type BannerProps = {
  className?: string;
};

const Banner: FunctionComponent<BannerProps> = ({ className, children }) => {
  console.log('here', data.league.standings[0][0].team.logo);
  // const standings = data.league.standings[0];

  // let state = useState({});
  // state = {
  //   standings,
  //   visibleRank: 1,
  //   rankLogo: standings[0].team.logo,
  // };

  const initialState = {
    standings: data.league.standings[0],
    visibleRank: 1,
    rankLogo: data.league.standings[0][0].team.logo,
  };

  const [state, setState] = useMergeState(initialState);
  const { standings, visibleRank, rankLogo } = state;

  const initialValues = {};

  console.log(state.rankLogo);

  return (
    <div className={classnames('container-fluid', className)}>
      <div className="row">
        <div className="col-sm">
          <Card>
            <div className="card-body">
              <TeamLogo logo={state.rankLogo} team="noone" size="large" />
            </div>
          </Card>
        </div>
        <div className="col-sm">
          <Card>
            <div className="card-body">Card 2</div>
          </Card>
        </div>
        <div className="col-sm">
          <Card>
            <div className="card-body">This is some text within a card body.</div>
          </Card>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Banner;
