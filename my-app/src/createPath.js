const ROWS = 4;
const COLUMNS = 4;
const PICK_CLOSEST_CHANCE=.7;
const getCartesianDistance = (x1, x2, y1, y2) => {
  return Math.round( 
    Math.sqrt( 
      Math.pow(x1 - x2,2) + Math.pow(y1 - y2, 2)
    )
  )
}

function makeMap(entranceRowIndex, entranceColumnIndex, exitRowIndex, exitColumnIndex){
  if(entranceRowIndex >= ROWS || exitRowIndex >= ROWS || 
     entranceColumnIndex >= COLUMNS || exitColumnIndex >= COLUMNS){
      throw Error("invalid parameters passed to make map - entrance or exit outside of map");
  }

  let maap = []
  for(let i  = 0; i < ROWS ;i++){
    let row = [];
    for(let j = 0; j < COLUMNS; j++){
      row.push({});
    }
    maap.push(row);
  }
  console.log(maap);

  maap = maap.map( (row, rowIndex) => {
    return row.map( (cell, columnIndex) => {
      return {
        rowIndex: rowIndex,
        columnIndex: columnIndex,
        distToExit: getCartesianDistance(rowIndex, exitRowIndex, columnIndex, exitColumnIndex),
        isPath: false
      }
    })
  });

  console.log(maap);
  let currentCellRowIndex = entranceRowIndex;
  let currentCellColumnIndex = entranceColumnIndex;
  
  while(currentCellRowIndex !== exitRowIndex || currentCellColumnIndex !== exitColumnIndex){
    debugger
    maap[currentCellRowIndex][currentCellColumnIndex].isPath = true;

    //pick find valid neighboring cells
    let potentialCells = [];
    const directions = [[0,-1], //left
                        [1,0], //above
                        [0,1], //right
                        [-1,0]] //below
    for(let direction of directions){
      let neighboringCellCoordinates = []
      neighboringCellCoordinates[0] = direction[0] + currentCellRowIndex;
      neighboringCellCoordinates[1] = direction[1] + currentCellColumnIndex;
      //if cell is invalid, continue;
      if(neighboringCellCoordinates[0] < 0 || neighboringCellCoordinates[0] >= COLUMNS ||
         neighboringCellCoordinates[1] < 0 || neighboringCellCoordinates[1] >= ROWS){
          continue;
      }
      let cell = maap[neighboringCellCoordinates[0]][neighboringCellCoordinates[1]];
      //if cell is already a path, continue
      if(cell.isPath){
        continue;
      }
      potentialCells.push(cell);
    }
    maap[currentCellRowIndex][currentCellColumnIndex].isPath = true;

    ///pick next cell
    //sort cells with closest first
    potentialCells.sort((a,b) => Math.abs(b.distToExit - a.distToExit));
    let nextCell = null;
    if(Math.random() * PICK_CLOSEST_CHANCE >= 1){
      nextCell = potentialCells[0];
    }
    else {
      nextCell = potentialCells[1];
    }
    
    currentCellRowIndex = nextCell.rowIndex;
    currentCellColumnIndex = nextCell.columnIndex;
  }

  //convert cells back to 1 or 0
  let convertedMap = maap.map( (row, rowIndex) => {
    return row.map( (cell, columnIndex) => {
      return cell.isPath ? 0 : 1
      })
    });
    console.log("--------------")
    console.log(maap)
    console.log("--------------")
    console.log(convertedMap)
}
  
makeMap(2,0,2,3)