import Phaser from "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, textureKey) {
    super(scene, x, y, textureKey); 

    this.scene = scene;
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.setBounce(0.0);

    this.moveSpeed = 180;
    this.jumpVelocity = -350;
    this.boostActive = false;

    this.cursors = scene.input.keyboard.createCursorKeys();
    this.keys = scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      ability: Phaser.Input.Keyboard.KeyCodes.SHIFT,
    });
  }

  update() {
    const { left, right, up } = this.cursors;
    const { left: a, right: d, up: w, ability } = this.keys;

    const movingLeft = left.isDown || a.isDown;
    const movingRight = right.isDown || d.isDown;
    const jumpPressed =
      Phaser.Input.Keyboard.JustDown(up) ||
      Phaser.Input.Keyboard.JustDown(w) ||
      Phaser.Input.Keyboard.JustDown(this.cursors.space);

    const onGround = this.body.blocked.down || this.body.touching.down;

   if (!this.boostActive) {
      if (movingLeft) {
        this.setVelocityX(-this.moveSpeed);
        this.setFlipX(true);
      } else if (movingRight) {
        this.setVelocityX(this.moveSpeed);
        this.setFlipX(false);
      } else {
        this.setVelocityX(0);
      }
   } else if (movingLeft) {
     this.setFlipX(true);
   } else if (movingRight) {
     this.setFlipX(false)}

  if (onGround) {
    this.boostActive = false}

  if (jumpPressed && onGround) {
    this.onJump(ability.isDown)}
  
  const isMoving = movingLeft || movingRight;
  this.updateAnimation(isMoving, onGround)}

  onJump(abilityHeld) {
    this.setVelocityY(this.jumpVelocity)}

  updateAnimacion( isMoving, onGround ) {}
}
