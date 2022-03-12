import React, { FunctionComponent, useEffect } from 'react';
import axios from '../../hooks/axios';
import { useMergeState } from '../../hooks';
import TeamLogo from '../teamLogo/TeamLogo';

import '../lastGame/lastGame.scss';

type LastGameProps = {
  className?: string;
  apiKey: string;
};

const NexttGame: FunctionComponent<LastGameProps> = ({ apiKey, className, children }) => {
  const season = '2021';
  const premeireLeague = 39;
  const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?season=${season}&league=${premeireLeague}&team=50&next=1`;

  const initialState = {
    gameDate: '',
    teams: { away: { name: '', id: '', logo: '' }, home: { name: '', id: '', logo: '' } },
    goals: { away: '0', home: '0' },
    venue: { name: '' },
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
        gameDate: gameDate.toDateString(),
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
          <div className="score__block">
            <TeamLogo logo={state.teams.home.logo} team={state.teams.home.name} size="med" />
            <div className="score__teamName">{state.teams.home.name}</div>
          </div>
          <div className="score__block">
            {state.gameDate}
            <div>{state.venue}</div>
          </div>
          <div className="score__block">
            <TeamLogo logo={state.teams.away.logo} team={state.teams.away.name} size="med" />
            <div className="score__teamName">{state.teams.away.name}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NexttGame;
