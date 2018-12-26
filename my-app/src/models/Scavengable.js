import React from 'react';
import Food from '../components/tiles/Food';
import Scrap from '../components/tiles/Scrap';
import Curative from '../components/tiles/Curative';

class Scavengable {
  constructor(id, name, spawnChance, maxSpawnPerQuadrant,  solidity, maxSolidity){
    this.id = id;
    this.name = name;
    this.spawnChance = spawnChance;
    this.maxSpawnPerQuadrant = maxSpawnPerQuadrant;
    this.solidity = solidity;
    this.maxSolidity = maxSolidity;
  }

  getMapTile(){
    return {tile:this.name, 
            component:this.component, 
            solidity:this.solidity,
            maxSolidity:this.maxSolidity}
  }

  static instantiateScavengables(){
    let scavengables = new Set();

    scavengables.add(new Scavengable(30000, "food",      .01,5,  3,3));
    scavengables.add(new Scavengable(30100, "scrap",     .005,2,  5,5));
    scavengables.add(new Scavengable(30200, "curative",  .008,3,  2,2));
    scavengables.add(new Scavengable(30300, "medSupply", .009,3, 5,5));
    scavengables.add(new Scavengable(30400, "trapSupply",.02,5,  2,2));
    scavengables.add(new Scavengable(30500, "incense",    0,5,  3,3));
    
    return scavengables;
  }
}

export default Scavengable;

