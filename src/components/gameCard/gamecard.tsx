import React, { FunctionComponent, useEffect } from 'react';
import axios from '../../hooks/axios';
import { useMergeState } from '../../hooks';
import TeamLogo from '../teamLogo/TeamLogo';
import Spinner from '../spinner/spinner';

import './gameCard.scss';

type GameCardProps = {
  direction?: boolean;
  currentLeague: number;
  season: number;
  team: number;
};

const GameCard: FunctionComponent<GameCardProps> = ({
  direction,
  currentLeague,
  season,
  team,
}): JSX.Element => {
  const apiDirection = direction ? 'last' : 'next';

  const initialState = {
    gameDate: '',
    gameTime: '',
    teams: { away: { name: '', id: '', logo: '' }, home: { name: '', id: '', logo: '' } },
    goals: { away: '0', home: '0' },
    venue: '',
    seasonOver: false,
    dataLoaded: false,
    gameStatus: null,
  };

  const [state, setState] = useMergeState(initialState);

  function formatTime(gameDate: Date): string {
    const hours: number =
      // eslint-disable-next-line no-nested-ternary
      gameDate.getHours() === 0
        ? 12
        : gameDate.getHours() > 12
        ? gameDate.getHours() - 12
        : gameDate.getHours();
    const minuntes: string = gameDate.getMinutes().toString().padStart(2, '0');
    const amPm = gameDate.getHours() < 12 ? 'AM' : 'PM';
    return `${hours.toString()}:${minuntes} ${amPm}`;
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const fetchGames = async () => {
      const request = await axios.get('/fixtures', {
        params: {
          season,
          league: currentLeague,
          team,
          [`${apiDirection}`]: '1',
        },
      });

      if (request.data.results > 0) {
        const teamData = { ...request.data.response[0] };
        // console.log(teamData);
        const gameDate = new Date(teamData.fixture.date);
        setState({
          teams: teamData.teams,
          goals: teamData.goals,
          venue: teamData.fixture.venue.name,
          gameDate: gameDate.toDateString(),
          gameTime: formatTime(gameDate),
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
    };

    fetchGames();
  }, [apiDirection, currentLeague, season, setState, team]);

  function isPostponed({ status }: { status: string }): string {
    if (status === 'Match Postponed') {
      return status;
    }
    return '';
  }

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
                    {state.gameDate} - {state.gameTime}
                    <br />
                    <div className="postponed">{isPostponed({ status: state.gameStatus })}</div>
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
