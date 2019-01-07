import React from 'react';
import { keyPressed } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import GameMap from './GameMap.js';

const QUADRANT_COLUMNS = 10;
const QUADRANT_ROWS = 6;

const getQuadrant = (row, column) => {
  return {
    quadColumn : parseInt(column / QUADRANT_COLUMNS, 10),
    quadRow : parseInt(row / QUADRANT_ROWS, 10)
  }
}

const getQuadrantMap = (heroRow, heroColumn, charCoordMapping, globalMap) => {
  let quadrant = getQuadrant(heroRow, heroColumn);

  let startCol = quadrant.quadColumn * QUADRANT_COLUMNS;
  let startRow = quadrant.quadRow * QUADRANT_ROWS;

  let retMap = [];
  for(let r = startRow; r < (quadrant.quadRow + 1) * QUADRANT_ROWS; r++){
    let mapRow = [];
    for(let c = startCol; c < (quadrant.quadColumn + 1) * QUADRANT_COLUMNS; c++){
      
      let charFound = false;
      for(let char of charCoordMapping){
        if(char.row === r && char.column === c){
          mapRow.push(char.tile);
          charFound = true;
          break;
        }
      }

      if(!charFound){
        mapRow.push(globalMap[r][c]);
      }
    }
    retMap.push(mapRow);
  }
  return retMap;
}

const Game = (props) => {
  const {game, keyPressed} = props;
  
  const getMap = () => {
    let charCoordMapping = [{
      row: game.hero.location.row,
      column: game.hero.location.column,
      tile: game.hero.tile
    },{
      row: game.enemy.location.row,
      column: game.enemy.location.column,
      tile: game.enemy.tile
    }]
    let digitMap = getQuadrantMap(game.hero.location.row, 
      game.hero.location.column, 
      charCoordMapping, 
      game.map);

    return digitMap;
  }
  
  return (
    <div 
      id="game"
      tabIndex="0"
      onKeyDown={(e) => {
        e.preventDefault();
        keyPressed(e)
      } 
    }> 
      <GameMap tileMap={getMap()}></GameMap>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    game: state.game
  };
};

const mapDispatchToProps = dispatch => {
  return {
    keyPressed: (key) => {
      dispatch(keyPressed(key))
    }
  } 
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);