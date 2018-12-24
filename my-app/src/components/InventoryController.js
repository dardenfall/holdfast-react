import React from 'react';
import { connect } from 'react-redux';
import Inventory from './Inventory';

const InventoryContainer = (props) => {
  return (
    <Inventory inventory={props.inventory}></Inventory>
  )
}

const mapStateToProps = state => {
  return {
    inventory : state.game.hero.inventory
  }
}

export default connect(mapStateToProps)(InventoryContainer);