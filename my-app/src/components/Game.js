import React from 'react';
import { keyPressed } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import GameMap from './GameMap.js'
import Util from "../Util.js";

const Game = (props) => {
  const {game, keyPressed} = props;
  
  const getMap = (g) => {
    let digitMap = g.map[g.hero.location.level];
    digitMap[g.hero.location.row][g.hero.location.column] = 9;
  
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
      <GameMap tileMap={getMap(game)}></GameMap>
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