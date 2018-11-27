import React from 'react';
import { keyPressed } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import GameMap from './GameMap.js'
const Game = (props) => {
  const {game, keyPressed} = props;
  return (
    <div 
      tabIndex="0"
      onKeyDown={(e) => {
        e.preventDefault();
        keyPressed(e)
      } 
    }> 
      here is Game 
      <GameMap g={game}></GameMap>
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