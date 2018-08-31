import React, { Component } from 'react';
import Tree from './tiles/Tree.js'
import Hero from './tiles/Hero.js'
import MapRow from './MapRow.js'

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { 
       checking:false
    };
    this.echo = this.echo.bind(this);
  }

  getMap() {
    console.log("in getmap")
    return [
        [{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"}],
        [{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"none"},{tile:"none"},{tile:"none"},{tile:"none"},{tile:"none"},{tile:"none"}],
        [{tile:"none"},{tile:"none"},{tile:"none"},{tile:"none"},{tile:"none"},{tile:"none"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"}],
        [{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"},{tile:"tree"}]
        ]
  }

  echo (){
    console.log("HERE!!!!!")
  }

  render() {
    return (
      <div className="map"> here is Map
        <Hero></Hero>
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