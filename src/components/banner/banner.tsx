/* eslint-disable react/button-has-type */
import React, { FunctionComponent, useState, useEffect, Component } from 'react';
import classnames from 'classnames';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import BoxScore from '../boxScore/BoxScore';
import TeamLogo from '../teamLogo/TeamLogo';
import { useMergeState } from '../../hooks';

import data2 from '../../data/league-table.js';
import { useFetch } from '../../hooks/getTable';

import './banner.scss';

type BannerProps = {
  className?: string;
  apiKey: string;
};

const Banner: FunctionComponent<BannerProps> = ({ apiKey, className, children }) => {
  // const league = data2.league.standings[0];
  const season = '2021';
  const premeireLeague = 39;
  console.log(`apikey =  ${apiKey}`);
  const url = `https://api-football-v1.p.rapidapi.com/v3/standings?season=${season}&league=${premeireLeague}`;
  let league: { form: any }[] | null = null;

  const { data } = useFetch({
    url,
    onSuccess: () => {
      console.log('success', data);
      // eslint-disable-next-line prefer-destructuring
      // league = data.response.league.standings[0];
    },
  });
  console.log('successX', data.response[0].league.standings[0]);
  // eslint-disable-next-line prefer-destructuring
  league = data.response[0].league.standings[0];

  const initialState = {
    visibleRank: 0,
    rankLogo: '',
    team: '',
    boxScore: { for: '', against: '' },
    goalDiff: '',
    points: '',
    form: '',
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

  const tableClickHandler = (direction: number): any => {
    const newRank = wrapRank(state.visibleRank, direction);
    console.log('click', league);
    setState({
      visibleRank: newRank,
      rankLogo: league[newRank].team.logo,
      team: league[newRank].team.name,
      boxScore: league[newRank].all,
      goalDiff: league[newRank].goalsDiff,
      points: league[newRank].points,
      form: league[newRank].form,
    });
  };

  // const getData = () => {
  //   const retrievedObject = localStorage.getItem('storedLeague');
  //   if (retrievedObject != null && retrievedObject) {
  //     // league = JSON.parse(retrievedObject);
  //     // league = { ...retrievedObject.data.response[0].league.standings[0] };
  //   }

  //   if (state.team === null || state.team === '') {
  //   axios
  //     .get(
  //       `https://api-football-v1.p.rapidapi.com/v3/standings?season=${season}&league=${premeireLeague}`,
  //       // 'https://jsonplaceholder.typicode.com/todos/1',
  //       {
  //         headers: {
  //           'content-type': 'application/octet-stream',
  //           'X-RapidAPI-Key': apiKey,
  //           RapidAPI: 'api-football-v1.p.rapidapi.com',
  //         },
  //       },
  //     )
  //     .then(function (response) {
  //       console.log(response);
  //       league = { ...response.data.response[0].league.standings[0] };
  //       localStorage.setItem('storedLeague', JSON.stringify(league));
  //     });
  //   // }
  //   console.log('xxx', league);
  //   tableClickHandler(0);
  // };

  // if (league !== null) {
  //   getData();
  // }

  return (
    <div className={classnames('container-fluid', className)}>
      <div className="row">
        <div className="col-sm">
          <Card>
            <div className="card-body">
              <div className="arrow_container">
                <div className="arrows">
                  <Button onClick={() => tableClickHandler(-1)}>
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
                  <Button onClick={() => tableClickHandler(1)}>
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
