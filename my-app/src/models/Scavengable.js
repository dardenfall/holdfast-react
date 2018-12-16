import React from 'react';
import Food from '../components/tiles/Food';

class Scavengable {
  constructor(id, name, spawnChance, maxSpawnPerQuadrant, component){
    this.id = id;
    this.name = name;
    this.spawnChance = spawnChance;
    this.maxSpawnPerQuadrant = maxSpawnPerQuadrant;
    this.component = component;
  }

  getMapTile(){
    return {tile:this.name, navigable:false, component:this.component}
  }

  static instantiateScavengables(){
    let scavengables = new Set();

    scavengables.add(new Scavengable(30000, "food",       .05,5, <Food></Food>));
    scavengables.add(new Scavengable(30100, "scrap",     .005,2, <Food></Food>));
    scavengables.add(new Scavengable(30200, "curative",  .03,3, <Food></Food>));
    scavengables.add(new Scavengable(30300, "medSupply", .009,3, <Food></Food>));
    scavengables.add(new Scavengable(30400, "trapSupply",.03 ,5, <Food></Food>));
    scavengables.add(new Scavengable(30500, "incense",    0 ,5, <Food></Food>));
    
    return scavengables;
  }
}

export default Scavengable;

