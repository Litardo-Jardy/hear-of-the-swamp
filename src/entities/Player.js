import Phaser from "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, textureKey) {
    super(scene, x, y, textureKey);

    this.scene = scene;
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.setBounce(0.0);
    this.setOrigin(0.5, 1);

    this.body.setSize(36, 50);
    this.body.setOffset(16, 43);

    this.standingBody = { width: 36, height: 50, offsetX: 16, offsetY: 43 };
    this.crouchBody = { width: 36, height: 30, offsetX: 16, offsetY: 63 };
    this.isCrouching = false;

    this.moveSpeed = 170;
    this.jumpVelocity = -350;
    this.boostActive = false;

    this.cursors = scene.input.keyboard.createCursorKeys();
    this.keys = scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      ability: Phaser.Input.Keyboard.KeyCodes.SHIFT,
    });
  }

  update() {
    const { left, right, up, down } = this.cursors;
    const { left: a, right: d, up: w, down: s, ability } = this.keys;

    const movingLeft = left.isDown || a.isDown;
    const movingRight = right.isDown || d.isDown;
    const wantsCrouch = down.isDown || s.isDown;
    const jumpPressed =
      Phaser.Input.Keyboard.JustDown(up) ||
      Phaser.Input.Keyboard.JustDown(w) ||
      Phaser.Input.Keyboard.JustDown(this.cursors.space);

    const onGround = this.body.blocked.down || this.body.touching.down;

    const shouldCrouch = wantsCrouch && onGround;
    if (shouldCrouch !== this.isCrouching) {
      this.isCrouching = shouldCrouch;
      const shape = this.isCrouching ? this.crouchBody : this.standingBody;
      this.body.setSize(shape.width, shape.height);
      this.body.setOffset(shape.offsetX, shape.offsetY)}

    if (!this.boostActive) {
      if(this.isCrouching && movingRight) {
        this.setVelocityX(85);
      }else if (this.isCrouching && movingLeft) { 
        this.setVelocityX(-85);
      }else if (movingLeft) {
        this.setVelocityX(-this.moveSpeed);
        this.setFlipX(true);
      } else if (movingRight) {
        this.setVelocityX(this.moveSpeed);
        this.setFlipX(false);
      } else {
        this.setVelocityX(0)}
    } else if (movingLeft) {
      this.setFlipX(true);
    } else if (movingRight) {
      this.setFlipX(false)}

    if (onGround) {
      this.boostActive = false}

    if (jumpPressed && onGround && !this.isCrouching) {
      this.onJump(ability.isDown)}

    const isMoving = movingLeft || movingRight;
    this.updateAnimation(isMoving, onGround, wantsCrouch);
  }

  onJump(abilityHeld) {
    this.setVelocityY(this.jumpVelocity)}

  updateAnimation(isMoving, onGround, isCrouching) {}

  canClimb() { return false }

  canBreak() { return false }
}
