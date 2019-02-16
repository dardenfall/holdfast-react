import Util from '../Util.js'
import GameState from '../models/GameState'

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

const updateHeroPosition = (state, direction, rowDelta, columnDelta) => {
  let stateCopy = new GameState(state);
  stateCopy.direction(direction);

  if(stateCopy.isExitingVillage(rowDelta,columnDelta)){
    stateCopy.exitingVillage(true);
  }
  else if(stateCopy.isTileNavigable(rowDelta,columnDelta)) {

    stateCopy.updateLocation(rowDelta,columnDelta);

    Util.updateVisibility(stateCopy.map(),
      stateCopy.rowIndex(), 
      stateCopy.columnIndex(),  
      stateCopy.direction());
  }
  else{
    let solidity = stateCopy.reduceSolidity(rowDelta,columnDelta)

    if (solidity === 0){
      stateCopy.processInventory(rowDelta,columnDelta);
    }

    stateCopy.increaseBounce(); 
  }

  return stateCopy.getState();
}

export default processKeyPress;