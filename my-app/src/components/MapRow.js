import React from 'react';
import Tree from './tiles/Tree.js';
import Enemy from './tiles/Enemy.js';
import DirectionContainer from './tiles/DirectionContainer.js';

const MapRow = ({row}) => {
  return (
    <div className="map-row">
      {
        row.map(
          (t) => {
            let mapTags = [];
            
            switch (t.tile){
              case 'tree':
                mapTags.push(<Tree/>);
                break;
              case 'hero':
                mapTags.push(<DirectionContainer/>);
                break;
              case 'enemy':
                mapTags.push(<Enemy/>);
                break;
              case 'food':
              case 'scrap':
              case 'curative':
              case 'medSupply':
              case 'trapSupply':
              case 'incense':
                mapTags.push(t.component);
                break;
              default: 
                mapTags.push(<div className="empty-ground"></div>);
            }
            
            return mapTags;              
          }
        )
      }
    </div>
  )
}

export default MapRow;