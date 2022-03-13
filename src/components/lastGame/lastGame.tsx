import React, { FunctionComponent, useEffect } from 'react';
import axios from '../../hooks/axios';
import { useMergeState } from '../../hooks';
import TeamLogo from '../teamLogo/TeamLogo';

import './lastGame.scss';

type LastGameProps = {
  className?: string;
  direction?: boolean;
  apiKey: string;
};

const LastGame: FunctionComponent<LastGameProps> = ({ apiKey, direction, className, children }) => {
  const season = '2021';
  const premeireLeague = 39;
  const apiDirection = direction ? 'last' : 'next';
  const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?season=${season}&league=${premeireLeague}&team=50&${apiDirection}=1`;

  const initialState = {
    gameDate: '',
    teams: { away: { name: '', id: '', logo: '' }, home: { name: '', id: '', logo: '' } },
    goals: { away: '0', home: '0' },
    venue: '',
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
      return request;
    }

    fetchGames();
  }, []);

  return (
    <div className="card-body">
      <div className="card-lastGame">
        <h4>{direction ? 'Last' : 'Next'} Man City Game</h4>
        <div className="score">
          <div className="score__block">
            <TeamLogo
              logo={state.teams.home.logo}
              team={state.teams.home.name}
              size="med"
              showName
            />
          </div>
          <div className="score__block">
            {state.gameDate}
            <br />
            {direction && (
              <div className="score__score">
                {state.goals.home} - {state.goals.away}
              </div>
            )}
            <div>{state.venue}</div>
          </div>
          <div className="score__block">
            <TeamLogo
              logo={state.teams.away.logo}
              team={state.teams.away.name}
              size="med"
              showName
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastGame;
