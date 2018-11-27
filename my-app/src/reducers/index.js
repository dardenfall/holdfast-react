import GameMap from "../components/GameMap.js"
import Util from "../Util.js"

const initialState = { 
    game: {
      map: [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ],
      hero: {
        location: {
          x:0,
          y:2
        }
      }
    }
  }

export const rootReducer = (state = initialState, action) => {
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
        throw "no move selected"
    }      
}

const moveDown = (state) => {
  return updateHeroPosition(state,0,1)
}
const moveUp = (state) => {
  return updateHeroPosition(state,0,-1)
}
const moveLeft = (state) => {
  return updateHeroPosition(state,-1,0)
}
const moveRight = (state) => {
  return updateHeroPosition(state,1,0)
}

const canMove = (game, xdelta,ydelta) => {
  let {x,y} = game.hero.location;
  let tile = game.map[y+ydelta][x+xdelta];

  return Util.translateTile(tile).navigable === "true";
} 

const updateHeroPosition = (state, xdelta, ydelta) => {
  let l = { 
    x: state.game.hero.location.x, 
    y: state.game.hero.location.y};

  if(canMove(state.game, xdelta, ydelta)) {
    l = { 
      x: state.game.hero.location.x + xdelta, 
      y: state.game.hero.location.y + ydelta};
  }


  return{ 
      game: {
      map: [
          [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
          [1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1],
          [0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
          [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
          ],
      hero: {
          location: l
      }
    }
  };
}

export default rootReducer;