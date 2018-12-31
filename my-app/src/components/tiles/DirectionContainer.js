import React from 'react';
import { connect } from 'react-redux';
import Hero from './Hero';

const DirectionContainer = (props) => {
  return (
    <Hero direction={props.direction} bounceCount={props.bounceCount}></Hero>
  )
}

const mapStateToProps = state => {
  return {
    direction : state.game.hero.direction,
    bounceCount : state.game.hero.bounceCount
  }
}

export default connect(mapStateToProps)(DirectionContainer);