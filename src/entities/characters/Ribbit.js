import Player from "../Player";

export default class Ribbit extends Player {
  constructor(scene, x, y) {
    super(scene, x, y, "ribbit-walk", 0); // <-- corregido
    this.moveSpeed = 187;
    this.jumpVelocity = -350;
    this.longJumpMultiplier = 1.8;
    this.createAnimations(scene);
  }
  createAnimations(scene) {
    if (!scene.anims.exists("ribbit-walk")) {
      scene.anims.create({
        key: "ribbit-walk",
        frames: scene.anims.generateFrameNumbers("ribbit-walk", { start: 0, end: 9 }),
        frameRate: 8,
        repeat: -1,
      });
    }
    if (!scene.anims.exists("ribbit-jump")) {
      scene.anims.create({
        key: "ribbit-jump",
        frames: scene.anims.generateFrameNumbers("ribbit-jump", { start: 0, end: 4 }),
        frameRate: 8,
        repeat: 0,
      });
    }
    if (!scene.anims.exists("ribbit-idle")) {
      scene.anims.create({
        key: "ribbit-idle",
        frames: scene.anims.generateFrameNumbers("ribbit-idle", { start: 0, end: 3 }),
        frameRate: 10,
        repeat: 0,
      });
    }
    if (!scene.anims.exists("ribbit-blink")) {
      scene.anims.create({
        key: "ribbit-blink",
        frames: scene.anims.generateFrameNumbers("ribbit-blink", { start: 0, end: 1 }),
        frameRate: 1.8,
        repeat: 1,
      });
    }
    if (!scene.anims.exists("ribbit-crouch-walk")) {
      scene.anims.create({
        key: "ribbit-crouch-walk",
        frames: scene.anims.generateFrameNumbers("ribbit-crouch-walk", { start: 0, end: 1 }),
        frameRate: 8,
        repeat: -1,
      });
    }
  }
  updateAnimation(isMoving, onGround, isCrouching) {
    
     if (isCrouching) {
        if (isMoving) {
          this.anims.play("ribbit-crouch-walk", true);
        } else if (!this._crouchAnimStarted) {
          this.anims.play("ribbit-idle", true);
          this._crouchAnimStarted = true}
       return}

    if (isCrouching) {
      if (!this._crouchAnimStarted) {
        this.anims.play("ribbit-idle", true);
        this._crouchAnimStarted = true}
      return}

    if (this._crouchAnimStarted) {
      this.anims.stop();
      this._crouchAnimStarted = false}

    if (!onGround) {
      this.anims.play("ribbit-jump", true);
      return}

    if (isMoving) {
      this.anims.play("ribbit-walk", true);
    } else {
      this.anims.play("ribbit-blink", true)}
  }

  onJump(abilityHeld) {
    if (abilityHeld) {
      const direction = this.flipX ? -1 : 1;
      this.setVelocityX(this.moveSpeed * this.longJumpMultiplier * direction);
      this.boostActive = true;
    }
    super.onJump(abilityHeld);
  }
}
