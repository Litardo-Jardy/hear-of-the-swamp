import Phaser from "phaser";
import { GAME_WIDTH, GAME_HEIGHT, PHYSICS } from "./config.js";
import BootScene from "./scenes/BootScene.js";
import PreloadScene from "./scenes/PreloadScene.js";
import MainMenuScene from "./scenes/MainMenuScene.js";
import GameScene from "./scenes/GameScene.js";

const config = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: "game-container",
  backgroundColor: "#1b3a2b",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: PHYSICS.gravity },
      debug: true, 
    },
  },
  scene: [BootScene, PreloadScene, MainMenuScene, GameScene],
};

new Phaser.Game(config);
