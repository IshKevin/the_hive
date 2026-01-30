// src/scenes/GameScene.js
import { gameState } from '../gameState.js'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene')
  }

  create() {
    const env = gameState.environments[gameState.currentEnvIndex]

    this.add.text(10, 10, `Environment: ${env}`, { fontSize: '16px' })

    // ground
    this.ground = this.physics.add.staticImage(400, 420, 'ground')

    // player
    this.player = this.physics.add.sprite(100, 300, 'player')
    this.player.setCollideWorldBounds(true)

    this.physics.add.collider(this.player, this.ground)

    // mask piece
    this.maskPiece = this.physics.add.sprite(600, 300, 'maskPiece')
    this.physics.add.overlap(this.player, this.maskPiece, this.collectMask, null, this)

    // controls
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200)
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200)
    } else {
      this.player.setVelocityX(0)
    }

    if (this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-400)
    }
  }

  collectMask(player, mask) {
    mask.destroy()
    gameState.maskPieces++
    gameState.currentEnvIndex++

    if (gameState.maskPieces === gameState.totalPieces) {
      this.scene.start('EndStory')
    } else {
      this.scene.restart()
    }
  }
}
