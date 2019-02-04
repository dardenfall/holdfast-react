class GameMap {
  constructor(){
    this.rows = 30;
    this.columns = 30;
    this.pickClosestChance=5;
    this.pickSecondChance=11; // set to 7 for more open map
    this.pickThirdChance=9;
  }
  
  static getHeroStartingLocation(){
    return {
      rowIndex: 4,
      columnIndex: 10
    };
  }
  getCartesianDistance(x1, x2, y1, y2) {
    return Math.round( 
      Math.sqrt( 
        Math.pow(x1 - x2,2) + Math.pow(y1 - y2, 2)
      )
    )
  }
  
  drawline(x0,y0,x1,y1,callback) {
    var tmp;
    var steep = Math.abs(y1-y0) > Math.abs(x1-x0);
    if(steep){
      //swap x0,y0
      tmp=x0; x0=y0; y0=tmp;
      //swap x1,y1
      tmp=x1; x1=y1; y1=tmp;
    }
    
    var sign = 1;
    if(x0>x1){
      sign = -1;
      x0 *= -1;
      x1 *= -1;
    }
    var dx = x1-x0;
    var dy = Math.abs(y1-y0);
    var err = ((dx/2));
    var ystep = y0 < y1 ? 1:-1;
    var y = y0;
    
    for(var x=x0;x<=x1;x++){
      if(!(steep ? callback(y,sign*x) : callback(sign*x,y))) return false;
      err = (err - dy);
      if(err < 0){
        y+=ystep;
        err+=dx;
      }
    }
    return true;
  }
  
  makeMap(template = [], borderVal){
    let maap = [];
    for(let i  = 0; i < this.rows ;i++){
      let row = [];
      for(let j = 0; j < this.columns; j++){
        let cellVal = 1;
        if(template[i] && typeof template[i][j] !== 'undefined'){
          cellVal = template[i][j];
        } else if(borderVal && (i === 0 || j === 0 || i === this.rows -1 || j === this.columns -1)){
          cellVal = borderVal
        }
        row.push(cellVal);
      }
      maap.push(row);
    }
  
    return maap;
  }
  
  makeMapPaths(entranceRowIndex, entranceColumnIndex, exitRowIndex, exitColumnIndex, maap, nonNavigableVal){
    if(entranceRowIndex >= this.rows || exitRowIndex >= this.rows || 
       entranceColumnIndex >= this.columns || exitColumnIndex >= this.columns){
        throw Error("invalid parameters passed to make map - entrance or exit outside of map");
    }
  
    maap = maap.map( (row, rowIndex) => {
      return row.map( (cell, columnIndex) => {
        return {
          rowIndex: rowIndex,
          columnIndex: columnIndex,
          distToExit: this.getCartesianDistance(rowIndex, exitRowIndex, columnIndex, exitColumnIndex),
          isPath: cell === 0 ? true : false,
          origVal: cell
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
        if(neighboringCellCoordinates[0] < 0 || neighboringCellCoordinates[0] >= this.columns ||
           neighboringCellCoordinates[1] < 0 || neighboringCellCoordinates[1] >= this.rows ||
           maap[neighboringCellCoordinates[0]][neighboringCellCoordinates[1]].origVal === nonNavigableVal){
            continue;
        }
        let cell = maap[neighboringCellCoordinates[0]][neighboringCellCoordinates[1]];
        potentialCells.push(cell);
      }
  
      ///pick next cell
      //sort cells with closest first
      let rnd = Math.random();
      potentialCells.sort((a,b) => a.distToExit - b.distToExit);
      let nextCell = null;
      if(rnd * 10 < this.pickClosestChance){
        nextCell = potentialCells[0];
      }
      else if(rnd * 10 < this.pickSecondChance || potentialCells.length <= 2){
        nextCell = potentialCells[1];
      }
      else if(rnd * 10 < this.pickThirdChance || potentialCells.length <= 3){
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
        return cell.isPath ? 0 : cell.origVal
      })
    });
  
    return convertedMap;
  }
  
  makeGameMap(){
    let template = [
      [9,9,9,9,9,9,9,9,9,9],
      [9,2,2,9,9,9,9,9,9,9],
      [9,2,2,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,0],
      [9,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,9],
      [9,0,0,0,0,0,0,0,0,9],
      [9,9,9,9,9,9,9,9,9,9]]
    let startEndCoordinates = [[GameMap.getHeroStartingLocation().rowIndex,
                                GameMap.getHeroStartingLocation().columnIndex,23,28],
                               [3,25,27,3],
                               [10,2,20,19],
                               [28,4,7,28]];
    let maap = this.makeMap(template, 9);
    for(let coordinates of startEndCoordinates){
      maap = this.makeMapPaths(coordinates[0],coordinates[1],coordinates[2],coordinates[3], maap,9);
    }
    return maap;
  }
    
  
  
}
export default GameMap;