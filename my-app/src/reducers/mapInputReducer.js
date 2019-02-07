import Util from '../Util.js'

const processKeyPress = (e, state) => {
  switch (e.which) {
    case 37:
    case 65:
      return updateHeroPosition(state,Util.DIRECTION.LEFT,0,-1);
    case 38:
    case 87:
      return updateHeroPosition(state,Util.DIRECTION.UP,-1,0);
    case 39:
    case 68:
      return updateHeroPosition(state,Util.DIRECTION.RIGHT,0,1);
    case 40:
    case 83:
      return updateHeroPosition(state,Util.DIRECTION.DOWN,1,0);
    default:
      console.log("no move selected");
      return state;
  }      
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

  let rowIndex = state.game.hero.location.row;
  let columnIndex = state.game.hero.location.column;
  let targetTile = state.game.map[rowIndex+rowDelta][columnIndex+columnDelta];

  let l = {
    row: rowIndex, 
    column: columnIndex
  };

  let targetRow = rowIndex + rowDelta;
  let targetColumn= columnIndex + columnDelta;

  if(Util.isExitingVillage(rowIndex, columnIndex, targetRow, targetColumn)){
    stateCopy.game.focus.exitingVillageDialog = true;
  }
  else if(Util.isTileNavigable(targetTile)) {
    l = { 
      row: targetRow,
      column: targetColumn
    };  
    stateCopy.game.hero.location = l;
    stateCopy.game.hero.bounceCount = 0;

    Util.updateVisibility(stateCopy.game.map,
      state.game.hero.location.row, 
      state.game.hero.location.column, 
      direction);
  }
  // else if(Util.isEnteringVillage()){

  // }
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

export default processKeyPress;