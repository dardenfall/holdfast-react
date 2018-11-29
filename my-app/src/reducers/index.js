import Util from "../Util.js"

const initialState = { 
    game: {
      map:[

        [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
         [1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1  ],
         [1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,820],
         [1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1  ]],

        [[1  ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
         [1  ,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1],
         [810,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
         [1  ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]
      
      ],
      hero: {
        location: {
          level:0,
          row:3,
          column:2
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
        throw "no move selected"
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
  let {level,row,column} = state.game.hero.location;
  let tileNum = state.game.map[level][row+rowDelta][column+columnDelta];
  let translatedTile = Util.translateTile(tileNum);

  let l = { 
    level: state.game.hero.location.level,
    row: state.game.hero.location.row, 
    column: state.game.hero.location.column};
    let levelDelta = 0;

  if(translatedTile.navigable) {

    if(translatedTile.transition === "exit"){
      levelDelta = 1;
    }
    if(translatedTile.transition === "entrance"){
      levelDelta = -1;
    }
    l = { 
      level: state.game.hero.location.level + levelDelta,  
      row: state.game.hero.location.row + rowDelta, 
      column: state.game.hero.location.column + columnDelta
    };
  }

  return { 
      game: {
      map:[

        [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1  ],
         [1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1  ],
         [1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,820],
         [1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1  ]],

        [[1  ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
         [1  ,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1],
         [810,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
         [1  ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]
      
      ],
      hero: {
          location: l
      }
    }
  }
}

export default rootReducer;