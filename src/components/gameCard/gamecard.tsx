import React, { FunctionComponent, useEffect } from 'react';
import axios from '../../hooks/axios';
import { useMergeState } from '../../hooks';
import TeamLogo from '../teamLogo/TeamLogo';

import './gameCard.scss';

type GameCardProps = {
  className?: string;
  direction?: boolean;
  apiKey: string;
  season: number;
  premeireLeague: number;
  team: number;
};

const GameCard: FunctionComponent<GameCardProps> = ({
  apiKey,
  direction,
  season,
  premeireLeague,
  team,
}) => {
  const apiDirection = direction ? 'last' : 'next';
  const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?season=${season}&league=${premeireLeague}&team=${team}&${apiDirection}=1`;

  const initialState = {
    gameDate: '',
    teams: { away: { name: '', id: '', logo: '' }, home: { name: '', id: '', logo: '' } },
    goals: { away: '0', home: '0' },
    venue: '',
    seasonOver: false,
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

      if (request.data.results > 0) {
        const gameDate = new Date(request.data.response[0].fixture.date);
        setState({
          teams: request.data.response[0].teams,
          goals: request.data.response[0].goals,
          venue: request.data.response[0].fixture.venue.name,
          gameDate: gameDate.toDateString(),
          seasonOver: false,
        });
      } else {
        setState({
          seasonOver: true,
        });
      }
      return request;
    }

    fetchGames();
  }, []);

  return (
    <div className="card-body">
      <div className="card-gameCard">
        {state.seasonOver ? (
          <>
            <h4>
              {direction ? 'Last ' : 'Next '}
              {team === state.teams.home.id ? state.teams.home.name : state.teams.away.name} Game
            </h4>
            <div className="card-nextSeason">
              <h4>{direction ? 'Last ' : 'Next '} Season</h4>
            </div>
          </>
        ) : (
          <>
            <h4>
              {direction ? 'Last ' : 'Next '}
              {team === state.teams.home.id ? state.teams.home.name : state.teams.away.name} Game
            </h4>
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
          </>
        )}
      </div>
    </div>
  );
};

export default GameCard;
