export default {
  translateTile : (tile) => {
    switch(tile){
      case 0:
        return {tile:"none", navigable:true};
      case 1: 
        return {tile:"tree", navigable:false};
      case 9: 
        return {tile:"hero", navigable:false};
      case 999: 
        return {tile:"enemy", navigable:false};
      default:
        throw new Error(`missing tile type ${tile}`);
    }
  },

  DIRECTION : {
    UP : 1,
    DOWN : 2,
    LEFT : 3,
    RIGHT : 4  
  },

  withinNSquares: (self, target, N) => {
    return ( Math.abs(self.row - target.row) >= N && 
             Math.abs(self.column - target.column) >= N )
  }
}