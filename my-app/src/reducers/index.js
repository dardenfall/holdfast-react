import Util from "../Util.js"

const globalMap =         
    [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
     [1,0,1,1,1,1,1,1,1,1,0,0,0,0,0,1],
     [1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1],
     [1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
     [1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
     [1,1,1,0,1,1,1,1,1,1,0,0,0,0,0,1],
     [1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
     [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

const initialState = { 
    game: {
      map: globalMap,
      hero: {
        direction: Util.DIRECTION.RIGHT,
        location: {
          row:1,
          column:1
        }
      },
      enemy: {
        direction: Util.DIRECTION.RIGHT,
        location: {
          row:6,
          column:10
        }
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
  let tileNum = state.game.map[row+rowDelta][column+columnDelta];
  let translatedTile = Util.translateTile(tileNum);

  let l = {
    row: state.game.hero.location.row, 
    column: state.game.hero.location.column
  };
  
  if(translatedTile.navigable) {
    l = { 
      row: state.game.hero.location.row + rowDelta, 
      column: state.game.hero.location.column + columnDelta
    };
  }
  
  return { 
      game: {
        map:globalMap,
        hero: {
            direction: direction,
            location: l
        },
        enemy: {
          direction: Util.DIRECTION.RIGHT,
          location: {
            row:6,
            column:10
          }
        }
      }
    } 
}

export default rootReducer;