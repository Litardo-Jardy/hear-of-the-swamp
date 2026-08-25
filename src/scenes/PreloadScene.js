import Phaser from "phaser";
import { GAME_WIDTH, GAME_HEIGHT } from "../config.js";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene")}

  preload() {
    this.createLoadingBar();

    this.load.spritesheet("ribbit-walk", "/sprites/ribbit/ribbit-walk.png", {
      frameWidth: 67,
      frameHeight: 61})

    this.load.spritesheet("ribbit-jump", "/sprites/ribbit/ribbit-jump.png", {
      frameWidth: 68,
      frameHeight: 99})
  }

  create() {
    this.createPlaceholderTextures();
    this.scene.start("MainMenuScene");
  }

  createLoadingBar() {
    const { width, height } = this.cameras.main;

    const progressBox = this.add.graphics();
    const progressBar = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

    const loadingText = this.add
      .text(width / 2, height / 2 - 50, "Cargando...", {
        fontSize: "20px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    this.load.on("progress", (value) => {
      progressBar.clear();
      progressBar.fillStyle(0x6fcf97, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
    });

    this.load.on("complete", () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });
  }

  createPlaceholderTextures() {
    const placeholders = [
      { key: "vine", color: 0xb08968, w: 28, h: 32 }, 
      { key: "crag", color: 0x3a5a40, w: 44, h: 28 }, 
      { key: "ground", color: 0x5b3a29, w: 64, h: 32 },
      { key: "coin", color: 0xf2c94c, w: 16, h: 16 },
      { key: "obstacle-rock", color: 0x828282, w: 40, h: 40 },
      { key: "enemy", color: 0xeb5757, w: 28, h: 28 },
    ];

    placeholders.forEach(({ key, color, w, h }) => {
      const graphics = this.make.graphics({ x: 0, y: 0, add: false });
      graphics.fillStyle(color, 1);
      graphics.fillRect(0, 0, w, h);
      graphics.generateTexture(key, w, h);
      graphics.destroy();
    });
  }
}
