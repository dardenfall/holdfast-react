import React from 'react';
import Food from '../components/tiles/Food';
import Scrap from '../components/tiles/Scrap';
import Curative from '../components/tiles/Curative';

class Scavengable {
  constructor(id, name, spawnChance, maxSpawnPerQuadrant, component, solidity, maxSolidity){
    this.id = id;
    this.name = name;
    this.spawnChance = spawnChance;
    this.maxSpawnPerQuadrant = maxSpawnPerQuadrant;
    this.component = component;
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

    scavengables.add(new Scavengable(30000, "food",       .05,5, <Food></Food>, 3,3));
    scavengables.add(new Scavengable(30100, "scrap",     .005,2, <Scrap></Scrap>, 5,5));
    scavengables.add(new Scavengable(30200, "curative",  .03,3, <Curative></Curative>, 2,2));
    scavengables.add(new Scavengable(30300, "medSupply", .009,3, <Food></Food>, 5,5));
    scavengables.add(new Scavengable(30400, "trapSupply",.03 ,5, <Food></Food>, 2,2));
    scavengables.add(new Scavengable(30500, "incense",    0 ,5, <Food></Food>, 3,3));
    
    return scavengables;
  }
}

export default Scavengable;

