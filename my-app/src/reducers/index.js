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
        console.log("Processing", rnd, scavengable);

        if(mapWithPlacedScavenables[rowIndex][columnIndex].navigable){
          return;
        }

        if( placementCounts[scavengable.id] !== scavengable.maxSpawnPerQuadrant &&   
            rnd <= scavengable.spawnChance ){
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
    [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
     [1,0,1,1,1,1,1,1,1,1,0,0,0,0,0,1],
     [1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1],
     [1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
     [1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
     [1,1,1,0,1,1,1,1,1,1,0,0,0,0,0,1],
     [1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
     [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

let translatedMap = translateMap(integerMap);

const scavengables = Array.from(Scavengable.instantiateScavengables());

translatedMap = placeScavengables(translatedMap, scavengables)

const initialState = { 
    game: {
      map: translatedMap,
      hero: {
        direction: Util.DIRECTION.RIGHT,
        location: {
          row:1,
          column:1
        },
        tile: {tile:"hero", navigable:false, component: <Hero/>}
      },
      enemy: {
        direction: Util.DIRECTION.RIGHT,
        location: {
          row:6,
          column:10
        },
        tile: {tile:"enemy", navigable:false, component: <Enemy/>}
      }
    }
  };

const rootReducer = (state = initialState, action) => {
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

const updateHeroPosition = (state, direction, rowDelta, columnDelta) => {
  let {row,column} = state.game.hero.location;
  let tile = state.game.map[row+rowDelta][column+columnDelta];

  let l = {
    row: state.game.hero.location.row, 
    column: state.game.hero.location.column
  };
  
  if(tile.navigable) {
    l = { 
      row: state.game.hero.location.row + rowDelta, 
      column: state.game.hero.location.column + columnDelta
    };
  }
  
  return { 
      game: {
        map: translatedMap,
        hero: {
            direction: direction,
            location: l,
            tile: {tile:"hero", navigable:false, component: <Hero/>}
        },
        enemy: {
          direction: Util.DIRECTION.RIGHT,
          location: {
            row:6,
            column:10
          },
          tile: {tile:"enemy", navigable:false, component: <Enemy/>}
        }
      }
    } 
}

export default rootReducer;