import Player from "../Player";

const createAnimationHook = (scene, data) => { 
     for (const [key_data, start_data, end_data, frameRate_data, repeat_data] of data){
        if (!scene.anims.exists(key_data)) {
           scene.anims.create({
           key: key_data,
           frames: scene.anims.generateFrameNumbers(key_data, { start: start_data, end: end_data }),
           frameRate: frameRate_data,
           repeat: repeat_data});
	}
      }
   }

export default class Ribbit extends Player {
  constructor(scene, x, y) {
    super(scene, x, y, "ribbit-walk", 0);
    this.moveSpeed = 187;
    this.jumpVelocity = -350;
    this.longJumpMultiplier = 1.8;
    this.createAnimations(scene);
  }
  createAnimations(scene) {
    //Creating and verifying animations for sprite rendering;
    createAnimationHook(scene, [
       ["ribbit-walk", 0, 9, 8, -1],
       ["ribbit-jump", 0, 4, 8, 0],
       ["ribbit-idle", 0, 3, 10, 0],
       ["ribbit-blink", 0, 1, 2, 1],
       ["ribbit-crouch-walk", 0, 1, 8, -1],
    ])}

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
