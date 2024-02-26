import Game from "../game";
import Grid from "./grid";

import { cart2iso } from "../utils/math";
import type { OptionalTileSetter } from "./types";

export default class Tile {
  grid: Grid;

  sprite = {} as Phaser.GameObjects.Sprite;
  ssprite = {} as Phaser.GameObjects.Sprite;

  readonly x: number;
  readonly y: number;
  readonly by: number;
  z: number;

  constructor(scene: Game, id: number, x: number, y: number, z?: number) {
    this.x = x;
    this.y = y;
    this.z = z ?? 0;
    this.grid = scene.grid;

    let [sx, sy] = cart2iso(x * Grid.WIDTH, y * Grid.HEIGHT);

    sx = (sx / 2) + Grid.OFFSET_X;
    sy = (sy / 2) + Grid.OFFSET_Y;
    this.by = sy;

    this.sprite = scene.add.sprite(sx, sy, 't' + id);
    this.ssprite = scene.add.sprite(sx, sy, '').setVisible(false);
  }

  setTile(id: number) {
    let tkey = 't' + id;
    let y = this.by - Grid.OFFSET_Z * this.z;

    this.sprite.setTexture(tkey)
               .setY(y)
               .setVisible(true);

    if (this.grid.anims.has(tkey)) this.sprite.play(tkey);
    else this.sprite.stop();
  }

  setObject(id: number) {
    let okey = 'o' + id;
    let y = this.by - (Grid.OFFSET_Z * this.z) - (this.grid.offsets.get(okey) ?? 0);

    this.ssprite.setTexture(okey)
                .setY(y)
                .setVisible(true);
      
    if (this.grid.anims.has(okey)) this.ssprite.play(okey);
    else this.ssprite.stop();
  }

  set(setter: OptionalTileSetter) {
    if (!setter) {
      this.sprite.setVisible(false);
      this.ssprite.setVisible(false);
      return;
    }

    if (typeof setter == "object") {
      this.z = setter.z ?? 0;
      this.setTile(setter.id);

      setter.object ? this.setObject(setter.object):
                      this.ssprite.setVisible(false);
    } else {
      this.setTile(setter)
    }
  }

}
