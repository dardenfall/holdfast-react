export default {
  translateTile : (tile) => {
    switch(tile){
      case 0:
        return {tile:"none", navigable:"true"};
      case 1: 
        return {tile:"tree", navigable:"false"};
      case 9: 
        return {tile:"hero", navigable:"false"};
      default:
        throw "missing tile type";
    }
  }
}