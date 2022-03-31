import React, { FunctionComponent } from 'react';

type SpinnerProps = {
  msg?: string;
};

const Spinner: FunctionComponent<SpinnerProps> = ({ msg }) => (
  <>
    <div className="ui active inverted dimmer">
      <div className="ui text loader">{msg === '' || msg === undefined ? 'Loading' : msg}</div>
    </div>
  </>
);

export default Spinner;
