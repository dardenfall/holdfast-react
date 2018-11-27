import React from 'react';
import MapRow from './MapRow.js';
import Util from "../Util.js";

const GameMap = ({g}) => {

  const getMap = (g) => {
    let digitMap = g.map;
    digitMap[g.hero.location.y][g.hero.location.x] = 9

    let translatedMap = [];
    digitMap.forEach( () => translatedMap.push([]));
    
    digitMap.forEach((row, rowIndex) => 
      row.forEach( (cell, cellIndex) => 
        translatedMap[rowIndex][cellIndex] = Util.translateTile(cell)
    ));
    return translatedMap;
  }

  return (
    <div className="map">
      {
        getMap(g).map(
          (row) => <MapRow row={row}></MapRow> 
        )
      }
    </div>
  )

}

export default GameMap;