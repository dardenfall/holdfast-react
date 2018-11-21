import React, { Component } from 'react';
import Tree from './tiles/Tree.js'
import Hero from './tiles/Hero.js'
import MapRow from './MapRow.js'

class GameMap extends Component {

  static translateTile(tile){
    switch(tile){
      case 0:
        return {tile:"none", navigable:"true"}
      case 1: 
        return {tile:"tree", navigable:"false"}
      case 9: 
        return {tile:"hero", navigable:"false"}
    }
  }

  getMap() {
    let g = this.props.game;
    let digitMap = g.map;
    digitMap[g.hero.location.y][g.hero.location.x] = 9

    let translatedMap = new Array();
    digitMap.forEach( () => translatedMap.push(new Array()));
    

    digitMap.forEach((row, rowIndex) => 
      row.forEach( (cell, cellIndex) => 
        translatedMap[rowIndex][cellIndex] = GameMap.translateTile(cell)
    ));
    return translatedMap;
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

export default GameMap;