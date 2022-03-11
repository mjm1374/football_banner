import React, { FunctionComponent } from 'react';

import './BoxScore.scss';

type BoxScoreProps = {
  team: string;
  boxScore: any;
  rank: number;
  goalDiff: number;
  points: number;
  form: string;
};

const BoxScore: FunctionComponent<BoxScoreProps> = ({
  team,
  boxScore,
  rank,
  goalDiff,
  points,
  form,
}) => {
  return (
    <div className="football_boxscore">
      <div className="football_title">{team}</div>
      <table className="football__table">
        <tbody>
          <tr className="football__table_tr">
            <th className="football__table__header">
              <div aria-label="Rank">Rank</div>
            </th>
            <th className="football__table__header">
              <div aria-label="Matches played">MP</div>
            </th>
            <th className="football__table__header">
              <div aria-label="Wins">W</div>
            </th>
            <th className="football__table__header">
              <div aria-label=" Draws">D</div>
            </th>
            <th className="football__table__header">
              <div aria-label=" Losses">L</div>
            </th>
            <th className="football__table__header">
              <div aria-label=" Goals scored">GF</div>
            </th>
            <th className="football__table__header">
              <div aria-label=" Goals against">GA</div>
            </th>
            <th className="football__table__header">
              <div aria-label="Goal difference">GD</div>
            </th>
            <th className="football__table__header">
              <div aria-label="Points">Pts</div>
            </th>
          </tr>
          <tr>
            <td className="football__table__td__div">{rank + 1}</td>
            <td className="football__table__td__div">{boxScore.played}</td>
            <td className="football__table__td__div">{boxScore.win}</td>
            <td className="football__table__td__div">{boxScore.draw}</td>
            <td className="football__table__td__div">{boxScore.lose}</td>
            <td className="football__table__td__div">{boxScore.goals.for}</td>
            <td className="football__table__td__div">{boxScore.goals.against}</td>
            <td className="football__table__td__div">{goalDiff}</td>
            <td className="football__table__td__div">{points}</td>
          </tr>
        </tbody>
      </table>
      <div className="football_rank">
        <span className="bold">Form:</span> {form}
      </div>
    </div>
  );
};

export default BoxScore;
