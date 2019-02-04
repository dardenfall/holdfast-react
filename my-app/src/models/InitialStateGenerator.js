import Util from '../Util';
import Scavengable from "./Scavengable";
import GameMap from '../components/GameMap';
import React from 'react';
import Hero from '../components/tiles/Hero';
import Enemy from '../components/tiles/Enemy';

let _createTranslatedMap = function(origMap){
  let translatedMap = [];
  origMap.forEach( () => translatedMap.push([]));

  origMap.forEach((row, rowIndex) => 
    row.forEach( (column, columnIndex) => 
      translatedMap[rowIndex][columnIndex] = Util.translateTile(column)
  ));
  return translatedMap;  
}

let _placeScavengables = function(translatedMap, scavengables){
  let mapWithPlacedScavenables = translatedMap;

  let placementCounts = {} 
  scavengables.forEach( scavengable => {
    placementCounts[scavengable.id] = 0;
  });

  translatedMap.forEach( (row, rowIndex) => {
    row.forEach ( (column, columnIndex) =>{
      scavengables.forEach( (scavengable) => {
        let rnd = Math.random();

        if(Util.isTileNavigable(mapWithPlacedScavenables[rowIndex][columnIndex])){
          return;
        }
        //if we're not over the max for this item, and the spawn rnd is true and we're
        // not on one of the edges of the map, and we're not in the village
        if( placementCounts[scavengable.id] !== scavengable.maxSpawnPerQuadrant &&   
            rnd <= scavengable.spawnChance  &&
            rowIndex !== 0 &&
            rowIndex !== translatedMap.length - 1 &&
            columnIndex !== 0 &&
            columnIndex !== row.length - 1 &&
            !Util.isVillageIndex(rowIndex,columnIndex)){
          mapWithPlacedScavenables[rowIndex][columnIndex] = scavengable.getMapTile();
          console.log("Placing", rowIndex, columnIndex, scavengable);

          placementCounts[scavengable.id]++;
          return;
        }

      })
    })  
  })

  return mapWithPlacedScavenables;
}

let _getInitialMap = function(){
  let maap = new GameMap();
  const integerMap = maap.makeGameMap();
  let translatedMap = _createTranslatedMap(integerMap);

  const scavengables = Array.from(Scavengable.instantiateScavengables());

  translatedMap = _placeScavengables(translatedMap, scavengables)

  return translatedMap;
}

class InitialStateGenerator{
 

  static getInitialState(){
    let maap =  _getInitialMap();

    Util.updateVisibility(maap, 4, 9, 0)
  
    const initialState = { 
      game: {
        map: maap,
        focus: {
          exitingVillageDialog: false,
          gameMap: true
        },
        hero: {
          direction: Util.DIRECTION.RIGHT,
          location: {
            row:GameMap.getHeroStartingLocation().rowIndex,
            column:GameMap.getHeroStartingLocation().columnIndex,
          },
          tile: {tile:"hero", solidity:Infinity, maxSolidity:Infinity, component: <Hero/>},
          inventory: [
            {name: "curative", magnitude: 0},
            {name: "food", magnitude: 0},
            {name: "incense", magnitude: 0},
            {name: "medSupply", magnitude: 0},
            {name: "scrap", magnitude: 0},
            {name: "trapSupply", magnitude: 0}
          ],
          bounceCount: 0
        },
        enemy: {
          direction: Util.DIRECTION.RIGHT,
          location: {
            row:6,
            column:10
          },
          tile: {tile:"enemy", solidity:Infinity, maxSolidity:Infinity, component: <Enemy/>}
        }
      }
    };
    
    return initialState;
  }
}

export default InitialStateGenerator;






