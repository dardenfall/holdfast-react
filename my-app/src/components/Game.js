import React from 'react';
import { keyPressed } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import GameMap from './GameMap.js'
import Util from "../Util.js";

const QUADRANT_COLUMNS = 8;
const QUADRANT_ROWS = 4;

const getQuadrant = (row, column) => {
  return {
    quadColumn : parseInt(column / QUADRANT_COLUMNS, 10),
    quadRow : parseInt(row / QUADRANT_ROWS, 10)
  }
}

const getQuadrantMap = (heroRow, heroColumn, globalMap) => {
  let quadrant = getQuadrant(heroRow, heroColumn);

  let startCol = quadrant.quadColumn * QUADRANT_COLUMNS;
  let startRow = quadrant.quadRow * QUADRANT_ROWS;

  let retMap = [];
  for(let r = startRow; r < (quadrant.quadRow + 1) * QUADRANT_ROWS; r++){
    let mapRow = [];
    for(let c = startCol; c < (quadrant.quadColumn + 1) * QUADRANT_COLUMNS; c++){
      if(heroRow === r && heroColumn === c){
        mapRow.push(9);
      }
      // TODO put enemy in here - figure out where and how to keep npcs and enemies
      // if(heroRow === r && heroColumn === c){
      //   mapRow.push(9);
      // }
      else{
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
    let digitMap = getQuadrantMap(game.hero.location.row, game.hero.location.column, game.map);
  
    let translatedMap = [];
    digitMap.forEach( () => translatedMap.push([]));
    
    digitMap.forEach((row, rowIndex) => 
      row.forEach( (column, columnIndex) => 
        translatedMap[rowIndex][columnIndex] = Util.translateTile(column)
    ));
    return translatedMap;
  }
  
  return (
    <div 
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
  return bindActionCreators(
    {
      keyPressed: keyPressed
    },
    dispatch
  ); 
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);