//TODO - convert Util to a class so I can use member functions :/
function _isVillageIndex(row, column){
  if(column < 10 && row < 10){
    return true;
  }
  else{
    return false;
  }
};
 
const Util = {
  isTileNavigable(tile){
    return tile.solidity <= 0;
  },

  translateTile : (tile) => {
    switch(tile){
      case 0:
        return {tile:"empty-ground", solidity:0, maxSolidity:0};
      case 1: 
        return {tile:"tree", solidity:50, maxSolidity:50};
      case 2: 
        return {tile:"hut", solidity:Number.MAX_SAFE_INTEGER, maxSolidity:Number.MAX_SAFE_INTEGER};
      case 9: 
        return {tile:"rock", solidity:Number.MAX_SAFE_INTEGER , maxSolidity:Number.MAX_SAFE_INTEGER};
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
  },

  isVillageIndex: _isVillageIndex,

  isEnteringVillage: function(currentRow, currentColumn, targetRow, targetColumn){
    if(!_isVillageIndex(currentRow, currentColumn) && _isVillageIndex(targetRow,targetColumn)){
      return true;
    }
    else{
      return false;
    }
  },

  isExitingVillage: function(currentRow, currentColumn, targetRow, targetColumn){
    if(_isVillageIndex(currentRow, currentColumn) && !_isVillageIndex(targetRow,targetColumn)){
      return true;
    }
    else{
      return false;
    }
  },

  getHeroRowIndex: function(state){
    return state.game.hero.location.row;
  },

  getHeroColumnIndex: function(state){
    return state.game.hero.location.column;
  },

  getHeroTile: function(state){
    return state.game.hero.tile;
  },

  setHeroRowIndex: function(rowIndex, state){
    state.game.hero.location.row = rowIndex;
    return state;
  },

  setHeroColumnIndex: function(columnIndex, state){
    state.game.hero.location.column = columnIndex;
    return state;
  }, 
  
  updateVisibility: function(maap, heroRowIndex, heroColumnIndex, heroDirection){
    // cribbed from roguelikedev on reddit
    const drawline = (x0,y0,x1,y1,callback) => {
      var tmp;
      var steep = Math.abs(y1-y0) > Math.abs(x1-x0);
      if(steep){
        //swap x0,y0
        tmp=x0; x0=y0; y0=tmp;
        //swap x1,y1
        tmp=x1; x1=y1; y1=tmp;
      }
      
      var sign = 1;
      if(x0>x1){
        sign = -1;
        x0 *= -1;
        x1 *= -1;
      }
      var dx = x1-x0;
      var dy = Math.abs(y1-y0);
      var err = ((dx/2));
      var ystep = y0 < y1 ? 1:-1;
      var y = y0;
      
      for(var x=x0;x<=x1;x++){
        if(!(steep ? callback(y,sign*x) : callback(sign*x,y))) return false;
        err = (err - dy);
        if(err < 0){
          y+=ystep;
          err+=dx;
        }
      }
      return true;
    }


    // mark squares as visible or invisible
    maap.forEach( (row, rowIndex) => {
      return row.forEach( (cell, columnIndex) => {
        let lineOfSight = false;
        //draws a line and returns 
        if(drawline(heroRowIndex,heroColumnIndex,rowIndex, columnIndex, 
            (x,y) => maap[x][y].solidity === 0 ? true : false)){
          lineOfSight = true;
        }
        cell.lineOfSight = lineOfSight;
      })
    });

    maap.forEach( (row, rowIndex) => {
      return row.forEach( (cell, columnIndex) => {
        const directions = [[0,-1],[1,-1], //left
                            [1,0], [1,1], //above
                            [0,1], [-1,-1],//right
                            [-1,0], [-1,1] ] //below
        for(let direction of directions){
          let neighboringCellCoordinates = []
          neighboringCellCoordinates[0] = direction[0] + rowIndex;
          neighboringCellCoordinates[1] = direction[1] + columnIndex;
          //if cell is invalid, continue;
          if(typeof maap[neighboringCellCoordinates[0]] === 'undefined' || 
             neighboringCellCoordinates[0] < 0 ||
             typeof maap[neighboringCellCoordinates[0]][neighboringCellCoordinates[1]] === 'undefined' ||
             neighboringCellCoordinates[1] < 0 ||
             maap[neighboringCellCoordinates[0]][neighboringCellCoordinates[1]].lineOfSight === false){
            continue;
          }
          cell.visible = true;
          break;
        }
    
      })
    });

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
    tileExecutor(rowIndex, columnIndex, quadrantMap);

    let navigableCoordinates = getNavigableCoordinates(rowIndex, columnIndex, lastRowIndex,
                                                      lastColumnIndex,quadrantMap,quadrantMap.length,
                                                      quadrantMap[0].length);
    // eslint-disable-next-line
    navigableCoordinates.map(coordinate => {
      helper(coordinate.row, coordinate.column, rowIndex, columnIndex);
    })
  }

  helper(startRowIndex, startColumnIndex, null, null);
}

//touchAllNavigableTiles(1,0,m,(r,c,m)=>console.log(`touched ${r}, ${c}`) );

export default Util;