import React from 'react';
import Tree from './tiles/Tree.js'
import Hero from './tiles/Hero.js'

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
                mapTags.push(<Hero></Hero>);
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