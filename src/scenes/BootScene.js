import Phaser from "phaser";

// BootScene: lo primero que corre. Su único trabajo es cargar los assets
// mínimos necesarios para poder mostrar la pantalla de carga (Preload),
// como la barra de progreso o el logo. Separarla de Preload evita que
// la barra de carga tarde en aparecer porque está esperando sus propios assets.
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
