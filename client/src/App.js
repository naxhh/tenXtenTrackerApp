import React, { Component } from 'react';
import './App.css';
import BggUsernameInput from './components/BggUsernameInput'
import GamesCollection from './components/GamesCollection'
import Tracker from './components/Tracker'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div id="header">
            <h1>10x10 Challenge Tracker!</h1>
        </div>
        <BggUsernameInput searchCollection={console.log} />
        <GamesCollection onGameClick={id => console.log(`Addng game with id ${id} to tracker`)} />
        <Tracker onRemoveClick={id => console.log(`Removing game with id ${id}`)} />
      </div>
    )
  }
}

export default App;
