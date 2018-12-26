import React from 'react';
import Tree from './tiles/Tree';
import Rock from './tiles/Rock';
import Food from './tiles/Food';
import Scrap from './tiles/Scrap';
import Enemy from './tiles/Enemy';
import Curative from './tiles/Curative';
import MedSupply from './tiles/MedSupply';
import TrapSupply from './tiles/TrapSupply';
import Incense from './tiles/Incense';
import EmptyGround from './tiles/EmptyGround';
import DirectionContainer from './tiles/DirectionContainer.js';

const MapRow = ({row}) => {
  return (
    <div className="map-row">
      {
        row.map(
          (t, index) => {
            let mapTags = [];
            
            let op= 1;
            if(typeof t.solidity !== 'undefined'){
              op = t.solidity/t.maxSolidity;
            }

            switch (t.tile){              
              case 'hero':
                mapTags.push(<DirectionContainer key={index}/>);
                break;
              case 'enemy':
                mapTags.push(<Enemy key={index}/>);
                break;
              case 'tree':
                mapTags.push(<Tree key={index} opacity={op}></Tree> );
                break;
              case 'rock':
                mapTags.push(<Rock key={index} opacity={op}></Rock> );
                break;
              case 'food':
                mapTags.push(<Food key={index} opacity={op}></Food> );
                break;
              case 'scrap':
                mapTags.push(<Scrap key={index} opacity={op}></Scrap> );
                break;
              case 'curative':
                mapTags.push(<Curative key={index} opacity={op}></Curative> );
                break;
              case 'medSupply':
                mapTags.push(<MedSupply key={index} opacity={op}></MedSupply> );
                break;
              case 'trapSupply':
                mapTags.push(<TrapSupply key={index} opacity={op}></TrapSupply> );
                break;
              case 'incense':
                mapTags.push(<Incense key={index} opacity={op}></Incense> );
                break;
              case 'empty-ground':
                mapTags.push(<EmptyGround key={index}/>);
                break;            
              default: 
                throw new Error("Missing tile type " + JSON.stringify(t))            
              }
            
            return mapTags;              
          }
        )
      }
    </div>
  )
}

export default MapRow;