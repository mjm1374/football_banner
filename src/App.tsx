import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const API_KEY = `${process.env.REACT_APP_API_KEY_YT}`;
  console.log('api: ', process.env.REACT_APP_FOOTBAL_API);
  return (
    <div className="App">
      <header className="App-header">API: {process.env.REACT_APP_FOOTBAL_API}</header>
    </div>
  );
}

export default App;
