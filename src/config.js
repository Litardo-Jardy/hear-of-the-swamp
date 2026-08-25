// Constantes globales del juego.
// Centralizamos aquí los valores que probablemente vayan a ajustar
// seguido durante el desarrollo (velocidades, gravedad, tamaño de pantalla, etc.)
// para no tener que buscarlos dentro de la lógica de cada escena.

export const GAME_WIDTH = 960;
export const GAME_HEIGHT = 540;

export const PHYSICS = {
  gravity: 900,
};

// Personajes disponibles. El "key" se usa para identificar sprites,
// animaciones y la lógica de habilidad especial de cada uno.
export const CHARACTERS = {
  RIBBIT: {
    key: "ribbit",
    name: "Ribbit",
    moveSpeed: 180,
    jumpVelocity: -420,
    longJumpMultiplier: 1.6, // habilidad especial: salto largo
  },
  VINE: {
    key: "vine",
    name: "Vine",
    moveSpeed: 200,
    jumpVelocity: -450,
    climbSpeed: 160, // habilidad especial: trepar ramas
  },
  CRAG: {
    key: "crag",
    name: "Crag",
    moveSpeed: 140,
    jumpVelocity: -380,
    breakForce: true, // habilidad especial: romper obstáculos
  },
};

// Tipos de obstáculo, usados para saber qué personaje puede resolver cada uno.
// Esto es lo que en el pitch llamamos "obstáculos bloqueados por habilidad".
export const OBSTACLE_TYPES = {
  WIDE_GAP: "wide_gap", // requiere Ribbit (salto largo)
  HIGH_LEDGE: "high_ledge", // requiere Vine (trepar)
  BREAKABLE_ROCK: "breakable_rock", // requiere Crag (romper)
};

export const STARTING_LIVES = 3;
