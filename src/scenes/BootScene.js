import Phaser from "phaser";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    // TODO: cargar aquí el logo/fondo de la pantalla de carga si se agrega uno.
  }

  create() {
    this.scene.start("PreloadScene");
  }
}
