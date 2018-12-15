class Scavengable {
  constructor(id, name, spawnChance, maxSpawnPerQuadrant){
    this.id = id;
    this.name = name;
    this.spawnChance = spawnChance;
    this.maxSpawnPerQuadrant = maxSpawnPerQuadrant;
  }

  static instantiateScavengables(){
    let scavengables = new Set();

    scavengables.add(new Scavengable(30000, "food",       .1,5));
    scavengables.add(new Scavengable(30100, "scrap",     .01,2));
    scavengables.add(new Scavengable(30200, "curative",  .07,3));
    scavengables.add(new Scavengable(30300, "medSupply", .03,3));
    scavengables.add(new Scavengable(30400, "trapSupply",.1 ,5));
    scavengables.add(new Scavengable(30500, "incense",    0 ,5));
  }
}

