const ROWS = 10;
const COLUMNS = 10;

//function makeMap(entranceRowIndex, entranceColumnIndex, exitRowIndex, exitColumnIndex){
  let maap = []
  for(let i  = 0; i < ROWS ;i++){
    let row = [];
    for(let j = 0; j < COLUMNS; j++){
      row.push({});
    }
    maap.push(row);
  }

  maap = maap.map( (row, rowIndex) => {
    row.map( (cell, columnIndex) => {
      return {
        rowIndex: rowIndex,
        columnIndex: columnIndex,
        distToExit: -1,
        isPath: false
      }
    })
  });

  console.log(maap);
  let currentCellRowIndex = entranceRowIndex;
  let currentCellColumnIndex = entranceColumnIndex;
  
  while(currentCellRowIndex !== exitRowIndex || currentCellColumnIndex !== exitColumnIndex){

  }


}