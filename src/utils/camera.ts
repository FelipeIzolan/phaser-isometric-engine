import Game from "../game";

import { clamp } from "./math";

export default class Camera {
  static ZOOM_MIN = 0.1;
  static ZOOM_MAX = 5;

  protected scene: Game

  constructor(scene: Game) {
    this.scene = scene;
  }

  create() {
    this.scene.input.on("wheel", (_: any, _1: any, _2: any, dy: number) =>
      this.scene.cameras.main.setZoom(clamp(this.scene.cameras.main.zoom + (-dy * 0.01), Camera.ZOOM_MIN, Camera.ZOOM_MAX))
    );

    this.scene.input.on("pointermove", (p: Phaser.Input.Pointer) => {
      if (!this.scene.mouse.isRightDown()) return;
      this.scene.cameras.main.scrollX -= (p.x - p.prevPosition.x) / this.scene.cameras.main.zoom;
      this.scene.cameras.main.scrollY -= (p.y - p.prevPosition.y) / this.scene.cameras.main.zoom;
    });

  }
}
