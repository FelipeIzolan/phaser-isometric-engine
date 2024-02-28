import Game from "../game";
import Grid from "./grid";

import { cart2iso } from "../utils/math";
import type { OptionalTileSetter } from "./types";

export default class Tile {
  protected grid: Grid;
  protected sprite = {} as Phaser.GameObjects.Sprite;
  protected ssprite = {} as Phaser.GameObjects.Sprite;
  protected by: number;

  readonly x: number;
  readonly y: number;
  z: number;

  object: number | null;

  constructor(scene: Game, id: number, x: number, y: number, z?: number) {
    this.x = x;
    this.y = y;
    this.z = z ?? 0;
    this.object = null;
    this.grid = scene.grid;

    let [sx, sy] = cart2iso(x * Grid.WIDTH, y * Grid.HEIGHT);

    sx = (sx / 2) + Grid.OFFSET_X;
    sy = (sy / 2) + Grid.OFFSET_Y;
    this.by = sy;

    this.sprite = scene.add.sprite(sx, sy, 't' + id);
    this.ssprite = scene.add.sprite(sx, sy, '').setVisible(false);
  }

   
  // ------------------------------------------------
  // TILE SETTER & GETTER
  // ------------------------------------------------
  get depth() {
    return this.sprite.depth;
  }

  get worldX() {
    return this.sprite.x;
  }

  set worldX(v: number) {
    this.sprite.x = v;
    this.ssprite.x = v;
  }

  get worldY() {
    return this.sprite.y;
  }

  set worldY(v: number) {
    this.sprite.y = v;
    this.ssprite.y = v - (this.grid.offsets.get(this.ssprite.texture.key) ?? 0);
  }
  // ------------------------------------------------

  setTile(id: number) {
    let tkey = 't' + id;
    let y = this.by - Grid.OFFSET_Z * this.z;

    this.sprite.setTexture(tkey)
               .setY(y)
               .setDepth((Grid.WIDTH * this.x) + (Grid.HEIGHT * this.y) + (Grid.OFFSET_Z * this.z))
               .setVisible(true);

    if (this.grid.anims.has(tkey)) this.sprite.play(tkey);
    else this.sprite.stop();
  }

  setObject(id: number) {
    let okey = 'o' + id;
    let offset = this.grid.offsets.get(okey) ?? 0;
    let y = this.by - (Grid.OFFSET_Z * this.z) - offset;

    this.ssprite.setTexture(okey)
                .setY(y)
                .setDepth(this.sprite.depth + offset)
                .setVisible(true);
      
    if (this.grid.anims.has(okey)) this.ssprite.play(okey);
    else this.ssprite.stop();
  }

  set(setter?: OptionalTileSetter) {
    if (!setter) {
      this.sprite.setVisible(false);
      this.ssprite.setVisible(false);
      return;
    }

    if (typeof setter == "object") {
      this.z = setter.z ?? 0;
      this.setTile(setter.id);

      this.object = setter.object ?? null;
      setter.object ? this.setObject(setter.object):
                      this.ssprite.setVisible(false);
    } else {
      this.setTile(setter)
    }
  }

}
