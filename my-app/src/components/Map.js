import React, { Component } from 'react';
import Tree from './tiles/Tree.js'
import Hero from './tiles/Hero.js'
import MapRow from './MapRow.js'

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      checking:false,
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

  getMap() {
    let g = this.state.game;
    let map = g.map;
    map[g.hero.location.y][g.hero.location.x] = {tile:"hero"}
    console.log("MAP",map)
    return map;
  }

  render() {
    return (
      <div className="map"> here is Map

        {
          this.getMap().map(
            (row) => <MapRow row={row} game={this.state.game}></MapRow> 
          )
        }
      </div>
    );
  }
}

export default Map;