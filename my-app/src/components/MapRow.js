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
                mapTags.push(<Tree></Tree>);
                break;
              case 'hero':
                mapTags.push(<DirectionContainer></DirectionContainer>);
                break;
              case 'enemy':
                mapTags.push(<Enemy></Enemy>);
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