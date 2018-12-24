import React from 'react';

function inventoryRow(answer, index){
  return (
    <div className="inventory-row" key={index}>
      <span className="inventory-name">{answer.name}: </span>
      <span className="inventory-amount">{answer.magnitude}</span>
    </div>
  )
}

const Inventory = (props) => {
  return (
    <div>
      {props.inventory.map(inventoryRow)}
    </div>
  );
}

export default Inventory;