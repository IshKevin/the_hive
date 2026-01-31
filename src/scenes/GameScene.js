// src/scenes/GameScene.js
import { gameState } from '../gameState.js'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene')
  }

  create() {
    this.env = gameState.environments[gameState.currentEnvIndex]

    // Set up world bounds for scrolling (Double width)
    this.physics.world.setBounds(0, 0, 1600, 450)
    this.cameras.main.setBounds(0, 0, 1600, 450)

    // Background Color
    const colors = {
      savannah: '#e6ccb2', swamp: '#2d6a4f', forest: '#52b788', mountain: '#a8dadc'
    }
    this.cameras.main.setBackgroundColor(colors[this.env] || '#040218')

    // UI Text (Fixed on screen)
    this.add.text(10, 10, `Env: ${this.env.toUpperCase()}`, {
      fontSize: '18px', fill: '#fff', stroke: '#000', strokeThickness: 3
    }).setScrollFactor(0)

    this.add.text(10, 35, `Masks: ${gameState.maskPieces}/${gameState.totalPieces}`, {
      fontSize: '18px', fill: '#fff', stroke: '#000', strokeThickness: 3
    }).setScrollFactor(0)

    this.add.text(10, 60, 'Arrows to Move | R to Restart', {
      fontSize: '14px', fill: '#fff', stroke: '#000', strokeThickness: 2
    }).setScrollFactor(0)

    // Platforms
    this.platforms = this.physics.add.staticGroup()
    this.createLevel(this.env)

    // Player - SMALLER SIZE
    const startX = this.startPos ? this.startPos.x : 100
    const startY = this.startPos ? this.startPos.y : 300
    this.player = this.physics.add.sprite(startX, startY, 'player')
    this.player.setScale(0.3) // Make player smaller

    this.player.setCollideWorldBounds(true)
    this.player.setBounce(0.1)

    this.cameras.main.startFollow(this.player, true, 0.05, 0.05)
    this.physics.add.collider(this.player, this.platforms)

    // Controls
    this.cursors = this.input.keyboard.createCursorKeys()
    this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

    // Goal (Mask) - SMALLER SIZE
    const maskX = this.maskPos ? this.maskPos.x : 1500
    const maskY = this.maskPos ? this.maskPos.y : 300
    this.mask = this.physics.add.sprite(maskX, maskY, 'maskPiece').setScale(0.25) // Smaller mask

    this.tweens.add({
      targets: this.mask, y: maskY - 10, duration: 1000, yoyo: true, repeat: -1
    })

    this.physics.add.overlap(this.player, this.mask, this.collectMask, null, this)

    // Create particles for mask collection effect
    this.maskParticles = this.add.particles('maskPiece')
    this.maskParticles.setDepth(100)

    // Environment name display
    const envNames = {
      savannah: 'THE GOLDEN SAVANNAH',
      swamp: 'THE MYSTIC SWAMP',
      forest: 'THE ANCIENT FOREST',
      mountain: 'THE SACRED MOUNTAIN'
    }

    const envTitle = this.add.text(400, 100, envNames[this.env] || this.env.toUpperCase(), {
      fontSize: '28px',
      color: '#d4af37',
      stroke: '#000',
      strokeThickness: 4,
      fontStyle: 'bold'
    }).setOrigin(0.5).setScrollFactor(0)

    // Fade out environment title
    this.tweens.add({
      targets: envTitle,
      alpha: 0,
      duration: 3000,
      delay: 1000,
      ease: 'Power2'
    })
  }

  createLevel(env) {
    // Create logic for different levels
    this.startPos = { x: 50, y: 300 }
    this.maskPos = { x: 1500, y: 300 } // Far right

    // Helper to create ground
    const addPlat = (x, y, scaleX) => {
      this.platforms.create(x, y, 'ground').setScale(scaleX, 1).refreshBody()
    }

    if (env === 'savannah') {
      addPlat(400, 430, 2); addPlat(1200, 430, 2); // Floor
      addPlat(600, 300, 0.5); addPlat(900, 250, 0.5)
    } else if (env === 'swamp') {
      addPlat(200, 400, 1); addPlat(600, 350, 0.5);
      addPlat(1000, 300, 0.5); addPlat(1400, 250, 0.8)
      this.maskPos = { x: 1400, y: 150 }
    } else if (env === 'forest') {
      addPlat(400, 440, 2); addPlat(1200, 440, 2)
      addPlat(800, 300, 0.3); addPlat(1000, 200, 0.3)
    } else { // mountain
      addPlat(100, 400, 0.5); addPlat(500, 300, 0.5);
      addPlat(900, 300, 0.5); addPlat(1300, 200, 0.5)
    }
  }

  update() {
    // Left/Right
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-250)
      this.player.setFlipX(true)
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(250)
      this.player.setFlipX(false)
    } else {
      this.player.setVelocityX(0)
    }

    // Jump
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-550)
    }

    // Manual Restart
    if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
      this.scene.restart()
    }
  }

  collectMask(player, mask) {
    // Prevent multiple collections
    if (this.isCollecting) return
    this.isCollecting = true

    // Freeze player momentarily
    player.setVelocity(0, 0)

    // Particle burst effect
    const emitter = this.maskParticles.createEmitter({
      x: mask.x,
      y: mask.y,
      speed: { min: 100, max: 300 },
      angle: { min: 0, max: 360 },
      scale: { start: 0.3, end: 0 },
      blendMode: 'ADD',
      lifespan: 1000,
      gravityY: 200,
      quantity: 20
    })

    emitter.explode()

    // Screen flash effect
    const flash = this.add.rectangle(400, 225, 800, 450, 0xffffff, 0.5)
    flash.setScrollFactor(0)
    flash.setDepth(99)

    this.tweens.add({
      targets: flash,
      alpha: 0,
      duration: 500,
      onComplete: () => flash.destroy()
    })

    // Celebration text
    const collectText = this.add.text(mask.x, mask.y - 50, 'MASK PIECE FOUND!', {
      fontSize: '24px',
      color: '#d4af37',
      stroke: '#000',
      strokeThickness: 4,
      fontStyle: 'bold'
    }).setOrigin(0.5)

    this.tweens.add({
      targets: collectText,
      y: mask.y - 100,
      alpha: 0,
      duration: 1500,
      ease: 'Power2'
    })

    // Destroy mask with scale animation
    this.tweens.add({
      targets: mask,
      scale: 0,
      alpha: 0,
      duration: 500,
      onComplete: () => mask.destroy()
    })

    // Update game state
    gameState.maskPieces++
    gameState.currentEnvIndex++

    // TODO: Play collection sound effect here
    // this.sound.play('collectSound')

    // Transition to next scene after delay
    this.time.delayedCall(1500, () => {
      if (gameState.maskPieces >= gameState.totalPieces) {
        this.scene.start('EndStory')
      } else {
        this.scene.restart()
      }
    })
  }
}
