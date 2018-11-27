import React from 'react';
import { keyPressed } from '../actions';
import { connect } from 'react-redux'
import GameMap from './GameMap.js'

const Game = ({dispatch}) => {

  return (
    <div onKeyDown={e => {
      e.preventDefault();
      
      dispatch(keyPressed(e.which));
    }}> 
      here is Game 
      <GameMap g={!!!!!}></GameMap>
    </div>
  );
}



export default connect()(Game)