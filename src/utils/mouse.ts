import Game from "../game";

export default class Mouse {
  protected scene: Game;

  constructor(scene: Game) {
    this.scene = scene;
  }

  isLeftDown(): boolean {
    return this.scene.input.mousePointer.leftButtonDown();
  }

  isRightDown(): boolean {
    return this.scene.input.mousePointer.rightButtonDown();
  }

  isLeftRelease(): boolean {
    return this.scene.input.mousePointer.leftButtonReleased();
  }

  isRightRelease(): boolean {
    return this.scene.input.mousePointer.rightButtonReleased();
  }

  setCursor(src?: string) {
    this.scene.game.canvas.style.cursor = src ? `url(${src}), auto` : '';
  }
}
