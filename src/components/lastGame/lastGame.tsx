import React, { FunctionComponent, useEffect } from 'react';
import axios from '../../hooks/axios';
import { useMergeState } from '../../hooks';

import './lastGame.scss';

type LastGameProps = {
  className?: string;
  apiKey: string;
};

const LastGame: FunctionComponent<LastGameProps> = ({ apiKey, className, children }) => {
  const season = '2021';
  const premeireLeague = 39;
  const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?season=${season}&league=${premeireLeague}&team=50&last=1`;

  const initialState = {
    gameDate: '',
    teams: { away: { name: '' }, home: { name: '' } },
    goals: { away: '0', home: '0' },
    venue: { name: '' },
    //     // boxScore: { goals: { for: '', against: '' } },
    //     // points: '',
  };

  const [state, setState] = useMergeState(initialState);

  useEffect(() => {
    async function fetchGames() {
      const request = await axios.get(`${url}`, {
        headers: {
          'content-type': 'application/octet-stream',
          'X-RapidAPI-Key': `${apiKey}`,
          RapidAPI: 'api-football-v1.p.rapidapi.com',
        },
      });
      console.log(request);
      const gameDate = new Date(request.data.response[0].fixture.date);

      setState({
        teams: request.data.response[0].teams,
        goals: request.data.response[0].goals,
        venue: request.data.response[0].fixture.venue.name,
        // boxScore: { goals: { for: '', against: '' } },
        gameDate: gameDate.toDateString(),
        // points: '',
      });
      console.log('request', request);
      return request;
    }

    fetchGames();
  }, []);

  console.log('state', state);

  return (
    <div className="card-body">
      <div className="card-lastGame">
        <h4>Last Man City Game</h4>
        <div className="score">
          <div className="score__block">{state.teams.home.name}</div>
          <div className="score__block">
            {state.gameDate}
            <br />
            {state.goals.home} - {state.goals.away}
            <br />
            {state.venue}
          </div>
          <div className="score__block">{state.teams.away.name}</div>
        </div>
      </div>
    </div>
  );
};

export default LastGame;
