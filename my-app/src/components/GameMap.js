import React from 'react';
import MapRow from './MapRow.js';
import Util from "../Util.js";

const GameMap = ({g}) => {

  const getMap = (g) => {
    let digitMap = g.map;
    digitMap[g.hero.location.column][g.hero.location.row] = 9

    let translatedMap = [];
    digitMap.forEach( () => translatedMap.push([]));
    
    digitMap.forEach((row, rowIndex) => 
      row.forEach( (column, columnIndex) => 
        translatedMap[rowIndex][columnIndex] = Util.translateTile(column)
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