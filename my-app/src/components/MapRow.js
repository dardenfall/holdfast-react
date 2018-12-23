import React from 'react';
import Tree from './tiles/Tree';
import Food from './tiles/Food';
import Scrap from './tiles/Scrap';
import Curative from './tiles/Curative';
import DirectionContainer from './tiles/DirectionContainer.js';

const MapRow = ({row}) => {
  return (
    <div className="map-row">
      {
        row.map(
          (t) => {
            let mapTags = [];
            
            let op= 1;
            if(typeof t.solidity !== 'undefined'){
              op = t.solidity/t.maxSolidity;
            }

            switch (t.tile){              
              case 'hero':
                mapTags.push(<DirectionContainer/>);
                break;
              case 'tree':
                mapTags.push(<Tree opacity={op}></Tree> )
                break;
              case 'food':
                mapTags.push(<Food opacity={op}></Food> )
                break;
              case 'scrap':
                mapTags.push(<Scrap opacity={op}></Scrap> )
                break;
              case 'curative':
                mapTags.push(<Curative opacity={op}></Curative> )
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