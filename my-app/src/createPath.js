const ROWS = 30;
const COLUMNS = 30;
const PICK_CLOSEST_CHANCE=5;
const PICK_SECOND_CHANCE=11; // set to 7 for more open map
const PICK_THIRD_CHANCE=9;
const getCartesianDistance = (x1, x2, y1, y2) => {
  return Math.round( 
    Math.sqrt( 
      Math.pow(x1 - x2,2) + Math.pow(y1 - y2, 2)
    )
  )
}

function makeMap(entranceRowIndex, entranceColumnIndex, exitRowIndex, exitColumnIndex, maap){
  if(entranceRowIndex >= ROWS || exitRowIndex >= ROWS || 
     entranceColumnIndex >= COLUMNS || exitColumnIndex >= COLUMNS){
      throw Error("invalid parameters passed to make map - entrance or exit outside of map");
  }

  //if no default map is supplied, create an empty one
  if(!maap){
    maap = [];
    for(let i  = 0; i < ROWS ;i++){
      let row = [];
      for(let j = 0; j < COLUMNS; j++){
        row.push(1);
      }
      maap.push(row);
    }
  }

  maap = maap.map( (row, rowIndex) => {
    return row.map( (cell, columnIndex) => {
      return {
        rowIndex: rowIndex,
        columnIndex: columnIndex,
        distToExit: getCartesianDistance(rowIndex, exitRowIndex, columnIndex, exitColumnIndex),
        isPath: cell === 0 ? true : false
      }
    })
  });

  let currentCellRowIndex = entranceRowIndex;
  let currentCellColumnIndex = entranceColumnIndex;
  
  while(currentCellRowIndex !== exitRowIndex || currentCellColumnIndex !== exitColumnIndex){
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
      // if(cell.isPath){
      //   continue;
      // }
      potentialCells.push(cell);
    }

    ///pick next cell
    //sort cells with closest first
    let rnd = Math.random();
    potentialCells.sort((a,b) => a.distToExit - b.distToExit);
    let nextCell = null;
    if(rnd * 10 < PICK_CLOSEST_CHANCE){
      nextCell = potentialCells[0];
    }
    else if(rnd * 10 < PICK_SECOND_CHANCE || potentialCells.length <= 2){
      nextCell = potentialCells[1];
    }
    else if(rnd * 10 < PICK_THIRD_CHANCE || potentialCells.length <= 3){
      nextCell = potentialCells[2];
    }
    else{
      nextCell = potentialCells[3];
    }
    
    currentCellRowIndex = nextCell.rowIndex;
    currentCellColumnIndex = nextCell.columnIndex;
  }
  maap[currentCellRowIndex][currentCellColumnIndex].isPath = true;

  //convert cells back to 1 or 0
  let convertedMap = maap.map( (row, rowIndex) => {
    return row.map( (cell, columnIndex) => {
      return cell.isPath ? 0 : 1
      })
    });

    return convertedMap;
}
let startEndCoordinates = [[2,0,23,29],
                           [3,25,27,3]];
let maap = null;
for(let coordinates of startEndCoordinates){
  maap = makeMap(coordinates[0],coordinates[1],coordinates[2],coordinates[3], maap)
  console.log("--------------");
  console.log(maap);
}
                    