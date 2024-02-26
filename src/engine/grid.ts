import Game from "../game";
import Tile from "./tile";

import { iso2cart } from "../utils/math";
import type { OptionalTileSetter } from "./types";

export default class Grid {
  static WIDTH = 16;
  static HEIGHT = 16;

  static COLUMN = 6;
  static ROW = 6;

  static OFFSET_X = 512;
  static OFFSET_Y = 288;
  static OFFSET_Z = 4;

  static MAX_Z = 2; 

  tile_id: number = 0;
  object_id: number = 0;
  
  anims: Set<string> = new Set();
  offsets: Map<string, number> = new Map();
  
  protected scene: Game;
  protected tiles: Tile[][] = Array.from({ length: Grid.ROW }, () => []);

  constructor(scene: Game) {
    this.scene = scene;
  }

  protected createAnim(key: string, framerate?: number, repeat?: number, repeat_delay?: number) {
    this.scene.anims.create({ 
      key: key, 
      frames: this.scene.anims.generateFrameNumbers(key), 
      frameRate: framerate ?? 8, 
      repeat: repeat ?? -1,
      repeatDelay: repeat_delay ?? 0
    });

    this.anims.add(key);
  }

  // ------------------------------------------------
  // PRELOAD
  // Only execute these functions on scene.preload.
  // ------------------------------------------------
  loadTile(src: string, fw?: number, fh?: number) {
    this.tile_id++;

    if (!fw && !fh) this.scene.load.image('t' + this.tile_id, src);
    else this.scene.load.spritesheet('t' + this.tile_id, src, { frameWidth: fw!, frameHeight: fh! });
  }

  loadObject(src: string, offset?: number, fw?: number, fh?: number) {
    this.object_id++;

    if (!fw && !fh) this.scene.load.image('o' + this.object_id, src);
    else this.scene.load.spritesheet('o' + this.object_id, src, { frameWidth: fw!, frameHeight: fh! });

    if (offset) this.offsets.set('o' + this.object_id, offset);
  }
  // ------------------------------------------------

  // ------------------------------------------------
  // CREATE
  // Only execute these functions on scene.create.
  // ------------------------------------------------
   create() {
     for (let y = 0; y < Grid.ROW; y++)
      for (let x = 0; x < Grid.COLUMN; x++)
        this.tiles[y][x] = new Tile(this.scene, 1, x, y);
   }
 
  createTileAnim(id: number, framerate?: number, repeat?: number, repeat_delay?: number) {
    this.createAnim('t' + id, framerate, repeat, repeat_delay);
  }

  createObjectAnim(id: number, framerate?: number, repeat?: number, repeat_delay?: number) {
    this.createAnim('o' + id, framerate, repeat, repeat_delay);
  }
  // ------------------------------------------------

  getTile(x: number, y: number) {
    return (x > -1 && x < Grid.COLUMN && y > -1 && y < Grid.ROW) ? this.tiles[y][x] : null;
  }
  
  getTileByCartPos(x: number, y: number): Tile | null {
    return this.getTile(Math.floor((x / Grid.WIDTH) + 1.2), Math.floor((y / Grid.HEIGHT) + 1.2)); 
  }

  getTileByIsoPos(x: number, y: number): Tile | null {
    for (let z = 0; z <= Grid.MAX_Z; z++) {
      let mx = (x - Grid.OFFSET_X) * 2;
      let my = (y - (Grid.OFFSET_Y - z * Grid.OFFSET_Z)) * 2;
        
      let [ix, iy] = iso2cart(mx, my);
      let tile = this.getTileByCartPos(ix, iy);

      if (tile && tile.z == z)
        return tile;
    }

    return null;
  }

  setTile(x: number, y: number, tile: OptionalTileSetter) {
    this.tiles[y][x].set(tile);
  }

  setGrid(tiles: OptionalTileSetter[][]) {
     for (let y = 0; y < Grid.ROW; y++)
      for (let x = 0; x < Grid.COLUMN; x++)
        this.tiles[y][x].set(tiles[y][x]);
  }
}
