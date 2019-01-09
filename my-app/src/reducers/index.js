import Util from "../Util.js"
import Scavengable from "../models/Scavengable";
import React from 'react';
import Hero from '../components/tiles/Hero';
import Enemy from '../components/tiles/Enemy';
import processKeyPress from './mapInputReducer';

const translateMap = (origMap) => {

  let translatedMap = [];
  origMap.forEach( () => translatedMap.push([]));

  origMap.forEach((row, rowIndex) => 
    row.forEach( (column, columnIndex) => 
      translatedMap[rowIndex][columnIndex] = Util.translateTile(column)
  ));
  return translatedMap;
}

const placeScavengables = (origMap, scavengables) => {
  let mapWithPlacedScavenables = origMap;
  
  let placementCounts = {} 
  scavengables.forEach( scavengable => {
    placementCounts[scavengable.id] = 0;
  });

  origMap.forEach( (row, rowIndex) => {
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
            rowIndex !== origMap.length - 1 &&
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

const integerMap =         
    [
     [9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9],
     [9,2,2,9,9,9,9,9,9,9, 9,0,1,1,1,1,1,1,1,1, 1,0,0,0,0,1,1,0,1,1, 1,1,1,1,1,1,0,1,1,9],
     [9,2,2,0,0,0,0,0,0,9, 9,0,0,0,0,0,0,0,0,0, 0,0,1,1,0,1,1,0,0,0, 0,0,0,0,0,0,0,0,1,9],
     [9,0,0,0,0,0,0,0,0,9, 9,1,1,0,1,1,1,0,1,1, 1,0,1,1,0,1,1,1,1,1, 1,1,1,0,1,1,1,0,1,9],     
     [9,0,0,0,0,0,0,0,0,0, 0,0,0,0,1,1,1,0,0,0, 0,1,0,0,0,0,0,0,0,0, 0,0,1,0,1,1,1,0,1,9],
     [9,0,0,0,0,0,0,0,0,9, 9,1,1,0,1,1,1,1,1,1, 1,1,0,1,1,1,1,1,1,1, 1,1,1,0,1,1,1,0,1,9],
    
     [9,0,0,0,0,0,0,0,0,9, 9,1,1,0,1,1,1,1,1,1, 1,1,0,1,1,1,1,1,1,1, 1,1,1,0,1,1,1,1,1,9],
     [9,0,0,0,0,0,0,0,0,9, 9,1,1,0,1,1,1,0,0,0, 0,0,0,1,1,0,1,1,1,1, 1,1,1,0,1,1,1,1,1,9],     
     [9,0,0,0,0,0,0,0,0,9, 9,1,1,1,1,1,1,0,1,1, 1,1,1,1,0,0,0,0,0,1, 1,1,1,0,1,1,1,1,1,9],
     [9,9,9,9,9,9,9,9,9,9, 9,1,1,1,1,1,0,0,0,1, 1,1,1,1,0,1,1,1,0,1, 1,1,1,1,1,0,0,0,0,9],
     [9,9,9,9,9,9,9,9,9,9, 9,1,1,0,0,0,0,1,0,0, 0,0,0,0,0,0,1,1,0,0, 0,0,0,0,0,1,1,1,1,9],
     [9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9]
    ];

let translatedMap = translateMap(integerMap);

const scavengables = Array.from(Scavengable.instantiateScavengables());

translatedMap = placeScavengables(translatedMap, scavengables)

const initialState = { 
    game: {
      map: translatedMap,
      focus: {
        exitingVillageDialog: false,
        gameMap: true
      },
      hero: {
        direction: Util.DIRECTION.RIGHT,
        location: {
          row:2,
          column:12
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

let lastKeyPress = 0;
const rootReducer = (state = initialState, action) => {

  //control how quickly key presses are tracked
  let d = new Date();
  let keyPressTime = d.getTime();
  if(keyPressTime - lastKeyPress < 100){
    return state;
  }
  else{
    lastKeyPress = keyPressTime;
  }

  switch (action.type) {
    case 'KEY_PRESSED':
      let returnState = processKeyPress(action.key, state);
      return returnState;
    case 'LEAVING_VILLAGE_SELECTED':
      if(action.proceed){
        //39 is move right, which is the only way to exit the village at this point
        // :/
        return processKeyPress({which:39}, state);
      }
      else{
        return state;
      }
    default:
      return state;
  }
};



export default rootReducer;