import React from 'react';
import EmptyGround from "./components/tiles/EmptyGround";
import Tree from "./components/tiles/Tree";

const Util = {
  isTileNavigable(tile){
    return tile.solidity <= 0;
  },

  translateTile : (tile) => {
    switch(tile){
      case 0:
        return {tile:"empty-ground", solidity:0, maxSolidity:0};
      case 1: 
        return {tile:"tree", solidity:10, maxSolidity:10};
      default:
        throw new Error(`missing tile type ${tile}`);
    }
  },

  DIRECTION : {
    UP : 1,
    DOWN : 2,
    LEFT : 3,
    RIGHT : 4  
  },

  withinNSquares: (self, target, N) => {
    let distance = Math.sqrt(
      Math.pow(self.row - target.row, 2) + 
      Math.pow(self.column - target.column, 2)
    )
    return distance >= N;
  }


}

const getNavigableCoordinates = (rowIndex, columnIndex, lastRowIndex, lastColumnIndex, gameMap, mapWidth, mapHeight) => {
  let surroundingRowIndexes = [rowIndex];
  let navigableCoordinates = []; 

  if(rowIndex !== 0){
    surroundingRowIndexes.push(rowIndex - 1);
  }
  if(mapHeight !== rowIndex - 1){
    surroundingRowIndexes.push(rowIndex + 1)
  }

  let surroundingColumnIndexes = [columnIndex];
  if(columnIndex !== 0){
    surroundingColumnIndexes.push(columnIndex - 1);
  }
  if(mapWidth!== columnIndex - 1){
    surroundingColumnIndexes.push(columnIndex + 1)
  }

  // eslint-disable-next-line
  surroundingRowIndexes.map( (rIndex) => {
    // eslint-disable-next-line
    surroundingColumnIndexes.map( (cIndex) => {
      if( (rIndex === rowIndex && cIndex === columnIndex) ||
          (rIndex === lastRowIndex && cIndex === lastColumnIndex)){
            // eslint-disable-next-line
            return;
          }

      if(Util.isTileNavigable(gameMap[rIndex][cIndex])){
        navigableCoordinates.push({
          row:rIndex,
          column:cIndex
        });
      }
    })
  });

  return navigableCoordinates;
}


//doesn't work because it doesn't keep track of touched tiles
// eslint-disable-next-line
const touchAllNavigableTiles = (startRowIndex, startColumnIndex, quadrantMap, tileExecutor) => {

  const helper = (rowIndex, columnIndex, lastRowIndex, lastColumnIndex) => {
    debugger;
    tileExecutor(rowIndex, columnIndex, quadrantMap);

    let navigableCoordinates = getNavigableCoordinates(rowIndex, columnIndex, lastRowIndex,
                                                      lastColumnIndex,quadrantMap,quadrantMap.length,
                                                      quadrantMap[0].length);
    // eslint-disable-next-line
    navigableCoordinates.map(coordinate => {
      helper(coordinate.row, coordinate.column, rowIndex, columnIndex);
    })
  }
  debugger;
  helper(startRowIndex, startColumnIndex, null, null);
}

//touchAllNavigableTiles(1,0,m,(r,c,m)=>console.log(`touched ${r}, ${c}`) );

export default Util;