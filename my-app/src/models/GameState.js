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

class GameState{

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
          bounceCount: 0,
          id:0, // this will be which ever hero they select
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

  constructor(state){
    //make copy to start with
    this._state = JSON.parse(JSON.stringify(state));
  }
 
  isExitingVillage(rowDelta, columnDelta){
    let targetRowIndex = this.rowIndex() + rowDelta;
    let targetColumnIndex= this.columnIndex() + columnDelta;
  
    return Util.isExitingVillage(this.rowIndex(), this.columnIndex(), targetRowIndex, targetColumnIndex);
  }

  isTileNavigable(rowDelta,columnDelta) {
    let rowIndex = this.rowIndex();
    let columnIndex = this.columnIndex();
    let targetTile = this._state.game.map[rowIndex+rowDelta][columnIndex+columnDelta];

    return Util.isTileNavigable(targetTile);
  }

  exitingVillage(val){
    if(!val){
      return this._state.focus.exitingVillageDialog;
    }
    else{
      this._state.game.focus.exitingVillageDialog = val;
    }
  }
  
  updateLocation(rowDelta,columnDelta) {
    let targetRowIndex = this.rowIndex() + rowDelta;
    let targetColumnIndex= this.columnIndex() + columnDelta;

    const l = { 
      row: targetRowIndex,
      column: targetColumnIndex
    };  

    this._state.game.hero.location = l;
    this._state.game.hero.bounceCount = 0;
  }

  reduceSolidity(rowDelta,columnDelta) {
    let targetRowIndex = this.rowIndex() + rowDelta;
    let targetColumnIndex = this.columnIndex()  + columnDelta;

    return this._state.game.map[targetRowIndex][targetColumnIndex].solidity--;
  }  

  increaseBounce(){
    this._state.game.hero.bounceCount++;
  }

  processInventory(rowDelta,columnDelta){
    let rowIndex = this.rowIndex();
    let columnIndex = this.columnIndex();
    let targetTile = this._state.game.map[rowIndex+rowDelta][columnIndex+columnDelta];

    this._state.game.hero.inventory.map((inventoryItem)=>{ 
      if(inventoryItem.name === targetTile.tile){
        inventoryItem.magnitude++;
        return inventoryItem;
      }
      else{
        return inventoryItem;
      }
    });
  }

  rowIndex(rowIndex){
    if(!rowIndex){
      return this._state.game.hero.location.row;
    }
    else{
      this._state.game.hero.location.row = rowIndex
    }
  }

  columnIndex(columnIndex){
    if(!columnIndex){
      return this._state.game.hero.location.column;
    }
    else{
      this._state.game.hero.location.row = columnIndex
    }
  }

  direction(dir){
    if(!dir){
      return this._state.game.hero.direction;
    }
    else{
      this._state.game.hero.direction = dir;
    }
  }

  map(maap){
    if(!maap){
      return this._state.game.map;
    }
    else{
      this._state.game.map = maap;
    }
  }

  getState(){
    return this._state;
  }
}

export default GameState;






