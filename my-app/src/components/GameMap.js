import React from 'react';
import MapRow from './MapRow.js'

const GameMap = ({g}) => {
  const translateTile = (tile) => {
    switch(tile){
      case 0:
        return {tile:"none", navigable:"true"};
      case 1: 
        return {tile:"tree", navigable:"false"};
      case 9: 
        return {tile:"hero", navigable:"false"};
      default:
        throw "missing tile type";
    }
  }

  const getMap = (g) => {
    let digitMap = g.map;
    digitMap[g.hero.location.y][g.hero.location.x] = 9

    let translatedMap = [];
    digitMap.forEach( () => translatedMap.push([]));
    
    digitMap.forEach((row, rowIndex) => 
      row.forEach( (cell, cellIndex) => 
        translatedMap[rowIndex][cellIndex] = translateTile(cell)
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