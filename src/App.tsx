import React from 'react';
import Banner from './components/banner/banner';
import './App.css';

function App() {
  const API_KEY = `${process.env.REACT_APP_FOOTBAL_API}`;
  return (
    <div className="App">
      <header className="App-header">
        <Banner className="football" apiKey={API_KEY} />
      </header>
    </div>
  );
}

export default App;
