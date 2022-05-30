import React, { FunctionComponent, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useMergeState } from '../../hooks';
import axios from '../../hooks/axios';
import BoxScore from '../boxScore/BoxScore';
import TeamLogo from '../teamLogo/TeamLogo';
import Spinner from '../spinner/spinner';

type TableProps = {
  className?: string;
  season: number;
  currentLeague: number;
  initialTeam: number;
};

const Table: FunctionComponent<TableProps> = ({ season, currentLeague, initialTeam }) => {
  const initialState = {
    visibleRank: 0,
    teamLogo: '',
    team: initialTeam,
    boxScore: { goals: { for: '', against: '' } },
    goalDiff: 0,
    points: 0,
    form: '',
    dataLoaded: false,
    leagueName: '',
    leagueSize: 0,
  };

  const [state, setState] = useMergeState(initialState);
  const [league, setLeague] = useMergeState([]);
  const { team } = state;

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const fetchLeague = async () => {
      const request = await axios.get(`/standings`, {
        params: {
          season,
          league: currentLeague,
        },
      });

      // preload images
      request.data.response[0].league.standings[0].forEach(
        (thisTeam: { team: { logo: string } }) => {
          const img = new Image();
          img.src = thisTeam.team.logo;
        },
      );

      const tempLeague = { ...request.data.response[0].league.standings[0] };
      setLeague({ ...tempLeague });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const getInitialTeam = request.data.response[0].league.standings[0].find((row: any) => {
        return row.team.id === initialTeam;
      });
      let { rank: initialPosition = 1 } = getInitialTeam;
      // eslint-disable-next-line no-plusplus
      initialPosition--;

      setState({
        visibleRank: initialPosition,
        teamLogo: tempLeague[initialPosition].team.logo,
        team: tempLeague[initialPosition].team.name,
        boxScore: tempLeague[initialPosition].all,
        goalDiff: tempLeague[initialPosition].goalsDiff,
        points: tempLeague[initialPosition].points,
        form: tempLeague[initialPosition].form,
        dataLoaded: true,
        leagueName: request.data.response[0].league.name,
        leagueSize: request.data.response[0].league.standings[0].length,
      });

      return request;
    };
    fetchLeague();
  }, [initialTeam, currentLeague, season, setLeague, setState]);

  const wrapRank = (rank: number, direction: number): number => {
    let tempRank = rank;
    tempRank += direction;
    if (tempRank === state.leagueSize) tempRank = 0;
    if (tempRank === -1) tempRank = state.leagueSize - 1;
    return tempRank;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tableClickHandler = (direction: number): any => {
    const newRank = wrapRank(state.visibleRank, direction);
    setState({
      visibleRank: newRank,
      teamLogo: league[newRank].team.logo,
      team: league[newRank].team.name,
      boxScore: league[newRank].all,
      goalDiff: league[newRank].goalsDiff,
      points: league[newRank].points,
      form: league[newRank].form,
    });
  };

  return (
    <>
      {!state.dataLoaded ? (
        <Spinner msg="Loading Table" />
      ) : (
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
          <TeamLogo logo={state.teamLogo} team={team} size="lrg" />
          <BoxScore
            team={state.team}
            boxScore={state.boxScore}
            goalDiff={state.goalDiff}
            points={state.points}
            rank={state.visibleRank}
            form={state.form}
            leagueName={state.leagueName}
          />
        </div>
      )}
    </>
  );
};

export default Table;
