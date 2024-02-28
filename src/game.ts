import Grid from "./engine/grid";

import Mouse from "./utils/mouse";
import Camera from "./utils/camera";

export default class Game extends Phaser.Scene {
  grid = new Grid(this);

  // ------------------------------------------------
  // MOUSE & CAMERA
  // optional, but recommended.
  // ------------------------------------------------
  mouse = new Mouse(this);
  camera = new Camera(this);

  constructor() {
    super("Game");
  }

  preload() {
    this.input.mouse?.disableContextMenu();

    // ------------------------------------------------
    // LOAD TILES & OBJECTS
    // ------------------------------------------------
    for (let i = 1; i <= 3; i++)
    this.grid.loadTile(`/tiles/${i}.png`);
    this.grid.loadTile(`/tiles/4.png`, 16, 18);
  
    this.grid.loadObject(`/objects/1.png`, 5);
    this.grid.loadObject(`/objects/2.png`, 6);
    this.grid.loadObject(`/objects/3.png`, 12, 16, 16);
    // ------------------------------------------------
  }

  create() {
    this.grid.create();
    this.camera.create();

    // ------------------------------------------------
    // CREATE TILES & OBJECTS ANIMATIONS
    // ------------------------------------------------
    this.grid.createTileAnim(4, 6);
    this.grid.createObjectAnim(3, 6);
    // ------------------------------------------------

    this.grid.setGrid([
      [{ id: 3, z: 2, object: 2 }, { id: 3, z: 1, object: 2 }, { id: 3, object: 1 }, 1, 1, 2],
      [{ id: 3, z: 1, object: 1 }, { id: 3, object: 2 }, { id: 3, object: 2 }, 1, 2, 1], 
      [{ id: 3, object: 2 }, { id: 3, object: 1 }, { id: 3, object: 3 }, 1, 2, 1],
      [4, 4, 2, 1, 2, 1],
      [4, 4, 1, 1, 2, 1],
      [4, 1, 2, 1, 1, 1],
    ]);
  }

  update() {
    // ------------------------------------------------
    // DELETE-ME
    // Tile selection test!
    // ------------------------------------------------
    let tile = this.grid.getTileByIsoPos(this.input.mousePointer.worldX, this.input.mousePointer.worldY);

    if (tile) 
      tile.set();
    // ------------------------------------------------
  }
}
