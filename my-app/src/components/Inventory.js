import React from 'react';

function inventoryRow(answer, index){
  return (
    <tr className="inventory-row" key={index}>
      <td className="inventory-name">{answer.name}: </td>
      <td className="inventory-amount">{answer.magnitude}</td>
    </tr>
  )
}

const Inventory = (props) => {
  return (
    <div class="Inventory">
      <table>
        {props.inventory.map(inventoryRow)}
      </table>
    </div>
  );
}

export default Inventory;