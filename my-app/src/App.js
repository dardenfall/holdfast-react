import React, { Component } from 'react';
import './App.css';
import Game from './components/Game.js'
import InventoryContainer from './components/InventoryContainer.js'
import LeavingVillageContainer from './components/dialogs/leavingVillageContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <InventoryContainer className="inventory"></InventoryContainer>
        <Game></Game>
        <LeavingVillageContainer></LeavingVillageContainer> 
      </div>
    );
  }
}

export default App;
