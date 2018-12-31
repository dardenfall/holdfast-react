import Util from "../Util.js"
import Scavengable from "../models/Scavengable";
import React from 'react';
import Hero from '../components/tiles/Hero';
import Enemy from '../components/tiles/Enemy';

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
      if( Util.withinNSquares(returnState.game.hero.location, returnState.game.enemy.location, 2)){
        console.log('enemy is within 2 spaces');
      }
      return returnState;
    default:
      return state;
  }
};

const processKeyPress = (e, state) => {
    switch (e.which) {
      case 37:
        return moveLeft(state);
      case 65:
        return moveLeft(state);
      case 38:
        return moveUp(state);
      case 87:
        return moveUp(state);
      case 39:
        return moveRight(state);
      case 68:
        return moveRight(state);
      case 40:
        return moveDown(state);
      case 83:
        return moveDown(state);
      default:
        console.log("no move selected");
        return state;
    }      
}

const moveDown = (state) => {
  return updateHeroPosition(state,Util.DIRECTION.DOWN,1,0);
}
const moveUp = (state) => {
  return updateHeroPosition(state,Util.DIRECTION.UP,-1,0);
}
const moveLeft = (state) => {
  return updateHeroPosition(state,Util.DIRECTION.LEFT,0,-1);
}
const moveRight = (state) => {
  return updateHeroPosition(state,Util.DIRECTION.RIGHT,0,1);
}

const processInventory = (t, stateCopy) => {
  return stateCopy.game.hero.inventory.map((inventoryItem)=>{ 
    if(inventoryItem.name === t.tile){
      inventoryItem.magnitude++;
      return inventoryItem;
    }
    else{
      return inventoryItem;
    }
  });
}

const updateHeroPosition = (state, direction, rowDelta, columnDelta) => {
  let stateCopy =  JSON.parse(JSON.stringify(state));
  stateCopy.game.hero.direction = direction;

  let {row,column} = state.game.hero.location;
  let tile = state.game.map[row+rowDelta][column+columnDelta];

  let l = {
    row: state.game.hero.location.row, 
    column: state.game.hero.location.column
  };

  let targetRow = state.game.hero.location.row + rowDelta;
  let targetColumn= state.game.hero.location.column + columnDelta;

  if(Util.isTileNavigable(tile)) {
    l = { 
      row: targetRow,
      column: targetColumn
    };
    stateCopy.game.hero.location = l;
    stateCopy.game.hero.bounceCount = 0;
  }
  else{
    let tile = stateCopy.game.map[targetRow][targetColumn];
    stateCopy.game.map[targetRow][targetColumn].solidity--;

    if (stateCopy.game.map[targetRow][targetColumn].solidity === 0){
      processInventory(tile, stateCopy);
    }

    stateCopy.game.hero.bounceCount++;
  }
  
  return stateCopy;
}


export default rootReducer;