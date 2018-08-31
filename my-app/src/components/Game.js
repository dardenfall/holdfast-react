import React, { Component } from 'react';
import Map from './Map.js'

class Game extends Component {
  constructor(props){
    super(props);
    this.state = { 
      game: {
        map: [
          [{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"}],
          [{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"none"},{tile:"none"},{tile:"none"},{tile:"none"},{tile:"none"},{tile:"none"}],
          [{tile:"none"},{tile:"none"},{tile:"none"},{tile:"none"},{tile:"none"},{tile:"none"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"}],
          [{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"}]
        ],
        hero: {
          location: {
            x:0,
            y:2
          }
        }
      }
    }
  }

  render() {
    return (
      <div> here is Game 
        <Map game={this.state.game}></Map>
      </div>
    );
  }
}

export default Game;