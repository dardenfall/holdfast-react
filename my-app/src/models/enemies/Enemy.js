import Entity from '../Entity'

class Enemy extends Entity{
  constructor(){
  }

  getMapTile(){
    return {tile:this.name, 
            component:this.component, 
            solidity:this.solidity,
            maxSolidity:this.maxSolidity}
  }

  move(){

  }
}