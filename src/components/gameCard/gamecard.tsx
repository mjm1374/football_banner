import React, { FunctionComponent, useEffect } from 'react';
import axios from '../../hooks/axios';
import { useMergeState } from '../../hooks';
import TeamLogo from '../teamLogo/TeamLogo';
import Spinner from '../spinner/spinner';

import './gameCard.scss';

type GameCardProps = {
  className?: string;
  direction?: boolean;
  season: number;
  premeireLeague: number;
  team: number;
};

const GameCard: FunctionComponent<GameCardProps> = ({
  direction,
  season,
  premeireLeague,
  team,
}) => {
  const apiDirection = direction ? 'last' : 'next';

  const initialState = {
    gameDate: '',
    teams: { away: { name: '', id: '', logo: '' }, home: { name: '', id: '', logo: '' } },
    goals: { away: '0', home: '0' },
    venue: '',
    seasonOver: false,
    dataLoaded: false,
    gameStatus: null,
  };

  const [state, setState] = useMergeState(initialState);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async function fetchGames() {
      const request = await axios.get('/fixtures', {
        params: {
          season,
          league: premeireLeague,
          team,
          [`${apiDirection}`]: '1',
        },
      });

      if (request.data.results > 0) {
        const teamData = { ...request.data.response[0] };
        console.log(teamData);
        const gameDate = new Date(teamData.fixture.date);
        setState({
          teams: teamData.teams,
          goals: teamData.goals,
          venue: teamData.fixture.venue.name,
          gameDate: gameDate.toDateString(),
          seasonOver: false,
          dataLoaded: true,
          gameStatus: teamData.fixture.status.long,
        });
      } else {
        setState({
          seasonOver: true,
          dataLoaded: true,
        });
      }
      return request;
    }

    fetchGames();
  }, [apiDirection, premeireLeague, season, setState, team]);

  const isPostponed = (status: string): string => {
    if (status === 'Match Postponed') {
      return status;
    }
    return '';
  };

  return (
    <div className="card-body">
      <div className="card-gameCard">
        {!state.dataLoaded ? (
          <Spinner msg={direction ? 'Loading Last Game ' : 'Loading Next Game'} />
        ) : (
          <>
            {state.seasonOver ? (
              <>
                <h4>
                  {direction ? 'Last ' : 'Next '}
                  {team === state.teams.home.id
                    ? state.teams.home.name
                    : state.teams.away.name}{' '}
                  Game
                </h4>
                <div className="card-nextSeason">
                  <h4>{direction ? 'Last ' : 'Next '} Season</h4>
                </div>
              </>
            ) : (
              <>
                <h4>
                  {direction ? 'Last ' : 'Next '}
                  {team === state.teams.home.id
                    ? state.teams.home.name
                    : state.teams.away.name}{' '}
                  Game
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
                    <div className="postponed">{isPostponed(state.gameStatus)}</div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default GameCard;
