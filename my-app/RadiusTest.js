const maap = [[0,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0]];

const getCartesianDistance = (x1, x2, y1, y2) => {
  return Math.round( 
    Math.sqrt( 
      Math.pow(x1 - x2,2) + Math.pow(y1 - y2, 2)
    )
  )
}             

const drawRadius = (radius, maap, centerRowIndex, centerColumnIndex) => {

  let convertedMap = maap.map( (row, rowIndex) => {
    return row.map( (cell, columnIndex) => {
      return {
        rowIndex: rowIndex,
        columnIndex: columnIndex,
        distToCenter: getCartesianDistance(rowIndex, centerRowIndex, columnIndex, centerColumnIndex),
        origVal: cell
      }
    })
  });

  convertedMap = convertedMap.map( (row, rowIndex) => {
    return row.map( (cell, columnIndex) => {
      if (cell.distToCenter <= radius){
        return 1;
      }
      else {
        return 0;
      }
    })
  });

  return convertedMap;
}

console.log(
  drawRadius(3, maap, 4, 6)
)