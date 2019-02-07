import processKeyPress from './mapInputReducer';
import GameState from '../models/GameState'

let initialState = GameState.getInitialState();

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
      let stateCopy = JSON.parse(JSON.stringify(state));
      stateCopy.game.focus.exitingVillageDialog = false;
      stateCopy.game.focus.gameMap = true;
      
      if(action.proceed){

        //we need to move the player right one space.  Not sure if this is the 
        //best way to do this but....
        stateCopy.game.hero.location.column++; 
        return stateCopy;
      }

      return state;
    default:
      return state;
  }
};



export default rootReducer;