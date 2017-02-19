import React, { Component } from 'react';
import './App.css';
import BggUsername from './components/BggUsername'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div id="header">
            <h1>10x10 Challenge Tracker!</h1>
        </div>
        <BggUsername />
      </div>
    )
  }
}

export default App;
