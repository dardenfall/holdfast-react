import GameMap from "../components/GameMap.js"

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
        moveLeft(state);
        break;
      case 65:
        moveLeft(state);
        break;
      case 38:
        moveUp(state);
        break;
      case 87:
        moveUp(state);
        break;
      case 39:
        moveRight(state);
        break;
      case 68:
        moveRight(state);
        break;
      case 40:
        moveDown(state);
        break;
      case 83:
        moveDown(state);
        break;
      default:
        throw "no move selected"
    }      
}

const moveDown = (state) => {
  updateHeroPosition(state,0,1)
}
const moveUp = (state) => {
  updateHeroPosition(state,0,-1)
}
const moveLeft = (state) => {
  updateHeroPosition(state,-1,0)
}
const moveRight = (state) => {
  updateHeroPosition(state,1,0)
}

const canMove = (game, xdelta,ydelta) => {
  let {x,y} = game.hero.location;
  let tile = game.map[y+ydelta][x+xdelta];

  return GameMap.translateTile(tile).navigable === "true";
} 

const updateHeroPosition = (state, xdelta, ydelta) => {
  let result = canMove(state.game, xdelta, ydelta);

  if(!result) {
      console.log("here");
      return;
  }

  let l = { 
      x: state.game.hero.location.x + xdelta, 
      y: state.game.hero.location.y + ydelta}
  this.setState({ 
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
      }});
}

export default rootReducer;