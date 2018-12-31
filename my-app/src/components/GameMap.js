import React from 'react';
import MapRow from './MapRow.js';

const GameMap = ({tileMap}) => {

  return (
    <div className="map">
      {
        tileMap.map(
          (row, index) => <MapRow key={index} row={row}></MapRow> 
        )
      }
    </div>
  )

}

export default GameMap;