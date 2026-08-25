import Phaser from "phaser";

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super("MainMenuScene");
  }

  create() {
    const { width, height } = this.cameras.main;

    this.add
      .text(width / 2, height / 2 - 80, "Heart of the Swamp", {
        fontSize: "40px",
        color: "#eafbea",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    const startText = this.add
      .text(width / 2, height / 2 + 20, "Presiona ESPACIO para empezar", {
        fontSize: "20px",
        color: "#6fcf97",
      })
      .setOrigin(0.5);

    // Pequeña animación de parpadeo para invitar a interactuar.
    this.tweens.add({
      targets: startText,
      alpha: 0.3,
      duration: 700,
      yoyo: true,
      repeat: -1,
    });

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start("GameScene");
    });
  }
}
