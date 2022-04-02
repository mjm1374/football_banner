import React from 'react';
import Banner from './components/banner/banner';
import './App.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const App = (): any => {
  return (
    <div className="App">
      <header className="App-header">
        <Banner className="football" />
      </header>
    </div>
  );
};

export default App;
