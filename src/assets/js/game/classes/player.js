export default class Player {
  constructor(scene, x, y) {
    this.scene = scene

    const anims = scene.anims
    const playerAnimations = [
      { name: 'player-walk-front', frames: { start: 3, end: 5 } },
      { name: 'player-walk-left', frames: { start: 15, end: 17 } },
      { name: 'player-walk-right', frames: { start: 27, end: 29 } },
      { name: 'player-walk-back', frames: { start: 39, end: 41 } },
    ]

    playerAnimations.forEach(( { name, frames } ) => {
      anims.create({
        key: name,
        frames: anims.generateFrameNumbers("characters", frames),
        frameRate: 8,
        repeat: -1
      })  
    })

    this.sprite = scene.physics.add
      .sprite(x, y, "characters", 0)
      .setSize(8, 11)
      .setOffset(4, 21)

    // this.sprite.anims.play("player-walk-front")
    // this.sprite.anims.stop()

    this.keys = scene.input.keyboard.createCursorKeys()
  }

  freeze() {
    this.sprite.body.moves = false
  }
  // TODO: add movement logic to player
  update() {
    const keys = this.keys
    const sprite = this.sprite
    const speed = 60
    const prevVelocity = sprite.body.velocity.clone()
    // console.log(prevVelocity)
    // Stop any previous movement from the last frame
    // sprite.body.setVelocity(0)

    // Horizontal movement
    if (keys.left.isDown) {
      sprite.body.setVelocityX(-speed)
    } else if (keys.right.isDown) {
      sprite.body.setVelocityX(speed)
    }

    // Vertical movement
    if (keys.up.isDown) {
      sprite.body.setVelocityY(-speed)
    } else if (keys.down.isDown) {
      sprite.body.setVelocityY(speed)
    }

    // Normalize and scale the velocity so that sprite can't move faster along a diagonal
    sprite.body.velocity.normalize().scale(speed)

    // Update the animation last and give left/right/down animations precedence over up animations
    if (keys.left.isDown) {
      sprite.anims.play("player-walk-left", true)
    } else if (keys.right.isDown) {
      sprite.anims.play('player-walk-right', true)
    } else if (keys.up.isDown) {
      sprite.anims.play("player-walk-back", true)
    } else if (keys.down.isDown) {
      sprite.anims.play("player-walk-front", true)
    } else {
      sprite.anims.stop()

      // If we were moving & now we're not, then pick a single idle frame to use
      if (prevVelocity.y < 0) {
        sprite.setTexture('characters', 16)
      } else if (prevVelocity.y > 0) {
        console.log(prevVelocity.y)
        sprite.setTexture('characters', 28)
      } else if (prevVelocity.x < 0) {
        sprite.setTexture('characters', 40)
      } else {
        sprite.setTexture('characters', 4)
      }
    }
    // sprite.body.setVelocity(0)
  }

  destroy() {
    this.sprite.destroy()
  }
}
