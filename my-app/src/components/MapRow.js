import React from 'react';
import Tree from './tiles/Tree';
import DirectionContainer from './tiles/DirectionContainer.js';

const MapRow = ({row}) => {
  return (
    <div className="map-row">
      {
        row.map(
          (t) => {
            let mapTags = [];
            
            switch (t.tile){
              case 'hero':
                mapTags.push(<DirectionContainer/>);
                break;
              case 'tree':
                let op= t.solidity/t.maxSolidity;
                mapTags.push(<Tree opacity={op}></Tree> )
                break;
              default: 
                mapTags.push(t.component);
                break;            
              }
            
            return mapTags;              
          }
        )
      }
    </div>
  )
}

export default MapRow;