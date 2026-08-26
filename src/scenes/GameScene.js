import Phaser from "phaser";
import Ribbit from "../entities/characters/Ribbit.js";
import { STARTING_LIVES } from "../config.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene")}

  create() {
    this.lives = STARTING_LIVES;
    this.coinsCollected = 0;

    this.physics.world.setBounds(0, 0, 2400, 540);
    this.cameras.main.setBounds(0, 0, 2400, 540);

    this.createGround();
    this.createPlayer();
    this.createCoins();
    this.createEnemies();
    this.createGoal();
    this.createHUD();

    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

    this.physics.add.collider(this.player, this.groundGroup);
    this.physics.add.collider(this.enemies, this.groundGroup);

    this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
    this.physics.add.overlap(this.player, this.enemies, this.handleEnemyContact, null, this);
    this.physics.add.overlap(this.player, this.goalZone, this.handleGoalReached, null, this);
  }

createGround() {
  this.groundGroup = this.physics.add.staticGroup();

  const groundSegments = [
    { x: 0, width: 480 },
    { x: 680, width: 900 },
    { x: 1700, width: 700 },
  ];

  const tileHeight = 32;
  const groundY = 500;

  groundSegments.forEach((segment) => {
    const centerX = segment.x + segment.width / 2;

    const body = this.add.rectangle(centerX, groundY, segment.width, tileHeight);
    this.physics.add.existing(body, true);
    body.setVisible(false);
    this.groundGroup.add(body);

    this.add.tileSprite(centerX, groundY, segment.width, tileHeight, "ground");
  });

  this.gapStart = 480;
  this.gapEnd = 680;
}
  createPlayer() {
    this.player = new Ribbit(this, 60, 400);
  }

  createCoins() {
    this.coins = this.physics.add.staticGroup();
    const coinPositions = [300, 750, 900, 1050, 1800, 1950];
    coinPositions.forEach((x) => {
      this.coins.create(x, 440, "coin");
    });
  }

  createEnemies() {
    this.enemies = this.physics.add.group();
    const enemy = this.enemies.create(1000, 460, "enemy");
    enemy.setCollideWorldBounds(true);
    enemy.setVelocityX(60);
    enemy.patrolMinX = 950;
    enemy.patrolMaxX = 1150;
  }

  createGoal() {
    this.goalZone = this.physics.add.staticSprite(2300, 460, "obstacle-rock");
    this.goalZone.setTint(0x6fcf97);
  }

  createHUD() {
    this.hudLives = this.add
      .text(16, 16, `Vidas: ${this.lives}`, { fontSize: "18px", color: "#ffffff" })
      .setScrollFactor(0);
    this.hudCoins = this.add
      .text(16, 40, `Monedas: ${this.coinsCollected}`, { fontSize: "18px", color: "#ffffff" })
      .setScrollFactor(0);
  }

  collectCoin(player, coin) {
    coin.destroy();
    this.coinsCollected += 1;
    this.hudCoins.setText(`Monedas: ${this.coinsCollected}`);
  }

  handleEnemyContact(player, enemy) {
    this.loseLife();
    // Empuje simple para separar al jugador del enemigo tras el golpe.
    const direction = player.x < enemy.x ? -1 : 1;
    player.setVelocity(direction * 200, -200);
  }

  loseLife() {
    this.lives -= 1;
    this.hudLives.setText(`Vidas: ${this.lives}`);

    if (this.lives <= 0) {
      this.scene.restart();
    }
  }

  handleGoalReached() {
    this.add
      .text(this.cameras.main.midPoint.x, 200, "¡Tramo 1 completado!", {
        fontSize: "28px",
        color: "#f2c94c",
      })
      .setOrigin(0.5)
      .setScrollFactor(0);
    this.physics.pause();
  }

  update() {
    this.player.update();
    this.updateEnemyPatrol();
  }

  updateEnemyPatrol() {
    this.enemies.getChildren().forEach((enemy) => {
      if (enemy.x <= enemy.patrolMinX) {
        enemy.setVelocityX(60);
      } else if (enemy.x >= enemy.patrolMaxX) {
        enemy.setVelocityX(-60);
      }
    });
  }
}
