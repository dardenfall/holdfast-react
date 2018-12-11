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
        location: {
          row:1,
          column:1
        }
      }
    }
  };

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'KEY_PRESSED':
      return processKeyPress(action.key, state);
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
        throw new Error("no move selected");
    }      
}

const moveDown = (state) => {
  return updateHeroPosition(state,1,0)
}
const moveUp = (state) => {
  return updateHeroPosition(state,-1,0)
}
const moveLeft = (state) => {
  return updateHeroPosition(state,0,-1)
}
const moveRight = (state) => {
  return updateHeroPosition(state,0,1)
}

const updateHeroPosition = (state, rowDelta, columnDelta) => {
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
            location: l
        }
      }
    } 
}

export default rootReducer;