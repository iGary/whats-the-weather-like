import React from 'react';
import Weather from './components/home/weather';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>What's the weather like where you are?</p>
      </header>
      <Weather />
    </div>
  );
}

export default App;
