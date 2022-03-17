import React, { FunctionComponent } from 'react';
import { Markup } from 'interweave';

import './teamForm.scss';

type TeamFormProps = {
  form: string[];
};

const TeamForm: FunctionComponent<TeamFormProps> = ({ form }) => {
  const chars = [...form];
  let newForm = '';
  let formClass = '';

  chars.forEach((char) => {
    switch (char) {
      case 'W': {
        formClass = '--win';
        break;
      }
      case 'L': {
        formClass = '--lose';
        break;
      }
      case 'D': {
        formClass = '--draw';
        break;
      }
      default: {
        formClass = '';
        break;
      }
    }
    newForm += `<span class='teamForm teamForm${formClass}'>${char}</span>`;
  });

  return <Markup content={newForm} />;
};

export default TeamForm;
