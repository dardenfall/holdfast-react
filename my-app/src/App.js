import React, { Component } from 'react';
import './App.css';
import Game from './components/Game.js'
import InventoryController from './components/InventoryController.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game></Game>
        <InventoryController></InventoryController>
      </div>
    );
  }
}

export default App;
