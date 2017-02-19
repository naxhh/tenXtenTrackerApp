import React, { Component } from 'react';
import './App.css';
import BggUsernameInputContainer from './components/BggUsernameInputContainer'
import GamesCollectionContainer from './components/GamesCollectionContainer'
import TrackerContainer from './components/TrackerContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div id="header">
            <h1>10x10 Challenge Tracker!</h1>
        </div>
        <BggUsernameInputContainer />
        <GamesCollectionContainer />
        <TrackerContainer />
      </div>
    )
  }
}

export default App;
