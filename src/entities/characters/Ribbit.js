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
  }

  updateAnimation(isMoving, onGround) {
    if (!onGround) {
      this.anims.play("ribbit-jump", true);
      return;
    }
    if (isMoving) {
      this.anims.play("ribbit-walk", true);
    } else {
      this.anims.stop();
      this.setTexture("ribbit-walk", 0); 
    }
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
