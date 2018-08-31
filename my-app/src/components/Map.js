import React, { Component } from 'react';
import Tree from './tiles/Tree.js'
import Hero from './tiles/Hero.js'
import MapRow from './MapRow.js'

class Map extends Component {

  getMap() {
    let g = this.props.game;
    let map = g.map;
    map[g.hero.location.y][g.hero.location.x] = {tile:"hero"}
    console.log("MAP",map)
    return map;
  }

  render() {
    return (
      <div className="map">
        {
          this.getMap().map(
            (row) => <MapRow row={row}></MapRow> 
          )
        }
      </div>
    );
  }
}

export default Map;