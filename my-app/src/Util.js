export default {
  translateTile : (tile) => {
    switch(tile){
      case 0:
        return {tile:"none", navigable:true, transition:null};
      case 1: 
        return {tile:"tree", navigable:false};
      case 810:
        return {tile:"none", navigable:true, transition:"entrance"}
      case 820:
        return {tile:"none", navigable:true, transition:"exit"}
      case 9: 
        return {tile:"hero", navigable:false};
      default:
        throw `missing tile type ${tile}`;
    }
  }
}