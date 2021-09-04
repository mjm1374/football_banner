/* eslint-disable react/button-has-type */
import React, { FunctionComponent, useState } from 'react';
import classnames from 'classnames';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import BoxScore from '../boxScore/BoxScore';
import TeamLogo from '../teamLogo/TeamLogo';
import { useMergeState } from '../../hooks';

import data from '../../data/league-table.js';

import './banner.scss';

type BannerProps = {
  className?: string;
};

const Banner: FunctionComponent<BannerProps> = ({ className, children }) => {
  const league = data.league.standings[0];
  console.log('here', league);

  const initialState = {
    visibleRank: 1,
    rankLogo: league[0].team.logo,
    team: league[0].team.name,
    boxScore: league[0].all,
  };

  const [state, setState] = useMergeState(initialState);
  const { standings, visibleRank, rankLogo, team } = state;

  const initialValues = {};

  const wrapRank = (rank: number, direction: number): number => {
    let tempRank = rank;
    tempRank += direction;
    if (tempRank === 20) tempRank = 0;
    if (tempRank === -1) tempRank = 19;
    return tempRank;
  };

  const upClickHandler = (): any => {
    setState({
      visibleRank: wrapRank(state.visibleRank, 1),
      rankLogo: league[visibleRank].team.logo,
      team: league[visibleRank].team.name,
      boxScore: league[visibleRank].all,
    });
  };

  const downClickHandler = (): any => {
    setState({
      visibleRank: wrapRank(state.visibleRank, -1),
      rankLogo: league[visibleRank].team.logo,
      team: league[visibleRank].team.name,
      boxScore: league[visibleRank].all,
      goalDiff: league[visibleRank].goalsDiff,
      points: league[visibleRank].points,
      form: league[visibleRank].form,
    });
  };

  return (
    <div className={classnames('container-fluid', className)}>
      <div className="row">
        <div className="col-sm">
          <Card>
            <div className="card-body">
              <div className="arrow_container">
                <div className="arrows">
                  <Button onClick={upClickHandler}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-up"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
                      />
                    </svg>
                  </Button>
                  <Button onClick={downClickHandler}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
              <TeamLogo logo={state.rankLogo} team={team} size="lrg" />
              <BoxScore
                team={state.team}
                boxScore={state.boxScore}
                goalDiff={state.goalDiff}
                points={state.points}
                rank={state.visibleRank}
                form={state.form}
              />
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
