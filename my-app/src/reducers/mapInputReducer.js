import Util from '../Util.js'

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

if(Util.isExitingVillage(state.game.hero.location.row, state.game.hero.location.column, targetRow, targetColumn)){
  debugger;
  stateCopy.game.focus.exitingVillageDialog = true;
}
else if(Util.isTileNavigable(tile)) {
  l = { 
    row: targetRow,
    column: targetColumn
  };
  stateCopy.game.hero.location = l;
  stateCopy.game.hero.bounceCount = 0;
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