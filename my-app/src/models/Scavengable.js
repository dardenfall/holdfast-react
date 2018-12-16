class Scavengable {
  constructor(id, name, spawnChance, maxSpawnPerQuadrant){
    this.id = id;
    this.name = name;
    this.spawnChance = spawnChance;
    this.maxSpawnPerQuadrant = maxSpawnPerQuadrant;
  }

  getMapTile(){
    return {tile:this.name, navigable:false}
  }

  static instantiateScavengables(){
    let scavengables = new Set();

    scavengables.add(new Scavengable(30000, "food",       .05,5));
    scavengables.add(new Scavengable(30100, "scrap",     .005,2));
    scavengables.add(new Scavengable(30200, "curative",  .03,3));
    scavengables.add(new Scavengable(30300, "medSupply", .009,3));
    scavengables.add(new Scavengable(30400, "trapSupply",.03 ,5));
    scavengables.add(new Scavengable(30500, "incense",    0 ,5));
    
    return scavengables;
  }
}

export default Scavengable;

