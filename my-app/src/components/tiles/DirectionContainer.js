import React from 'react';
import { connect } from 'react-redux';
import Hero from './Hero';

const DirectionContainer = (props) => {
  return (
    <Hero direction={props.direction}></Hero>
  )
}

const mapStateToProps = state => {
  return {
    direction : state.game.hero.direction
  }
}

export default connect(mapStateToProps)(DirectionContainer);