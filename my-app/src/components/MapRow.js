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
import Hut from './tiles/Hut';
import EmptyGround from './tiles/EmptyGround';
import DirectionContainer from './tiles/DirectionContainer.js';

const MapRow = ({row}) => {
  return (
    <div className="map-row">
      {
        row.map(
          (t, index) => {
            let mapTags = [];
            
            //calculate opacity (whether or not the thing has been scavenged or chopped down)
            let op= 1;
            if(typeof t.solidity !== 'undefined'){
              op = t.solidity/t.maxSolidity;
            }
            
            let d = "hidden";
            if(t.visible || t.grayscale){
              d = "visible"
            } 

            let classname = "visiblitier"
            if(t.grayscale){
              classname = classname + " gray";
            }
            let tileMarkup = null;
            switch (t.tile){              
              case 'hero':
                tileMarkup = <DirectionContainer key={index}/>;
                d = "visible"
                break;
              case 'enemy':
                tileMarkup = <Enemy key={index}/>;
                break;
              case 'tree':
                tileMarkup = <Tree key={index} opacity={op}></Tree>;
                break;
              case 'rock':
                tileMarkup = <Rock key={index} opacity={op}></Rock>;
                break;
              case 'food':
                tileMarkup = <Food key={index} opacity={op}></Food>;
                break;
              case 'scrap':
                tileMarkup = <Scrap key={index} opacity={op}></Scrap>;
                break;
              case 'curative':
                tileMarkup = <Curative key={index} opacity={op}></Curative>;
                break;
              case 'medSupply':
                tileMarkup = <MedSupply key={index} opacity={op}></MedSupply>;
                break;
              case 'trapSupply':
                tileMarkup = <TrapSupply key={index} opacity={op}></TrapSupply>;
                break;
              case 'incense':
                tileMarkup = <Incense key={index} opacity={op}></Incense>;
                break;
              case 'hut':
                tileMarkup = <Hut key={index}></Hut>;
                break;
              case 'empty-ground':
                tileMarkup = <EmptyGround key={index}/>;
                break;            
              default: 
                throw new Error("Missing tile type " + JSON.stringify(t))            
              }

              return <div className={classname} style={{visibility:d}}>{tileMarkup}</div>;              
          }
        )
      }
    </div>
  )
}

export default MapRow;