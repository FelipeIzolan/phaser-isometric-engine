import "./style.css";

import Phaser from "phaser";
import Game from "./game";

var config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1024,
  height: 576,
  scene: Game,
  pixelArt: true,
//  roundPixels: true,                   // <- ROUND_PIXELS(optional) | maybe it can improve the render 
//  scale: { mode: Phaser.Scale.RESIZE } // <- FULLSCREEN             | can cause sprites distortion
};

new Phaser.Game(config);
