// src/scenes/GameScene.js
import { gameState } from '../gameState.js'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene')
  }

  create() {
    // Total world is 4 screens wide (3200x450)
    const worldWidth = 3200
    const worldHeight = 450
    const screenWidth = 800

    this.physics.world.setBounds(0, 0, worldWidth, worldHeight)
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight)
    this.cameras.main.setSize(screenWidth, worldHeight)

    // Background Colors for each segment
    const colors = [0xe6ccb2, 0x2d6a4f, 0x52b788, 0xa8dadc] // Savannah, Swamp, Forest, Mountain
    colors.forEach((color, i) => {
      this.add.rectangle(i * screenWidth, 0, screenWidth, worldHeight, color).setOrigin(0)
    })

    // UI Text (Fixed on screen)
    this.uiContainer = this.add.container(0, 0).setScrollFactor(0).setDepth(100)

    this.envText = this.add.text(10, 10, 'Env: Savannah', {
      fontSize: '18px', fill: '#fff', stroke: '#000', strokeThickness: 3
    })
    this.uiContainer.add(this.envText)

    this.maskText = this.add.text(10, 35, `Masks: 0/${gameState.totalPieces}`, {
      fontSize: '18px', fill: '#fff', stroke: '#000', strokeThickness: 3
    })
    this.uiContainer.add(this.maskText)

    const infoText = this.add.text(10, 60, 'Arrow Keys to Move | Avoid Red Enemies!', {
      fontSize: '14px', fill: '#fff', stroke: '#000', strokeThickness: 2
    })
    this.uiContainer.add(infoText)

    this.posText = this.add.text(10, 80, 'X: 0 Y: 0', {
      fontSize: '14px', fill: '#ffff00'
    })
    this.uiContainer.add(this.posText)

    // Player - TOP-DOWN MOVEMENT
    this.player = this.physics.add.sprite(100, 225, 'player')
    this.player.setScale(0.3)
    this.player.setCollideWorldBounds(true)
    this.player.body.setAllowGravity(false)

    // Controls
    this.cursors = this.input.keyboard.createCursorKeys()
    this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

    // Mask Pieces - Create all 4 at once
    this.maskPieces = this.physics.add.group()
    const piecePositions = [
      { x: 650, y: 350 },      // Savannah
      { x: 1200, y: 100 },     // Swamp
      { x: 2300, y: 225 },     // Forest
      { x: 3000, y: 150 }      // Mountain
    ]

    piecePositions.forEach((pos, i) => {
      const piece = this.maskPieces.create(pos.x, pos.y, 'maskPiece').setScale(0.2)
      piece.body.setAllowGravity(false)
      this.tweens.add({
        targets: piece, y: pos.y - 10, duration: 1000, yoyo: true, repeat: -1
      })
    })

    this.physics.add.overlap(this.player, this.maskPieces, this.collectMask, null, this)

    // Enemies - Small and red
    this.enemies = this.physics.add.group()
    const enemyPositions = [
      { x: 400, y: 100, vx: 0, vy: 100 },
      { x: 600, y: 300, vx: -100, vy: 0 },
      { x: 1000, y: 200, vx: 120, vy: 50 },
      { x: 1400, y: 100, vx: 0, vy: 150 },
      { x: 2000, y: 300, vx: -110, vy: 0 },
      { x: 2500, y: 150, vx: 50, vy: 100 },
      { x: 2800, y: 100, vx: 80, vy: 40 },
      { x: 3100, y: 350, vx: -70, vy: -50 }
    ]

    enemyPositions.forEach(pos => {
      const enemy = this.enemies.create(pos.x, pos.y, 'enemy')
      enemy.setScale(0.15) // SMALL enemies
      enemy.setTint(0xff0000)
      enemy.setBounce(1)
      enemy.setCollideWorldBounds(true)
      enemy.setVelocity(pos.vx, pos.vy)
      enemy.body.setAllowGravity(false)
    })

    this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, null, this)

    // Mask Particles
    this.maskParticles = this.add.particles('maskPiece')

    // Initial state
    gameState.maskPieces = 0
    this.isCollecting = false
    this.isHit = false

    // Set camera to initial screen
    this.cameras.main.setScroll(0, 0)
  }

  update() {
    if (this.isHit) return

    // TOP-DOWN MOVEMENT - 4 directions
    const speed = 250
    let vx = 0
    let vy = 0

    if (this.cursors.left.isDown) {
      vx = -speed
      this.player.setFlipX(true)
    } else if (this.cursors.right.isDown) {
      vx = speed
      this.player.setFlipX(false)
    }

    if (this.cursors.up.isDown) {
      vy = -speed
    } else if (this.cursors.down.isDown) {
      vy = speed
    }

    this.player.setVelocity(vx, vy)
    this.posText.setText(`X: ${Math.floor(this.player.x)} Y: ${Math.floor(this.player.y)}`)

    // Screen Transition Logic
    const currentScreen = Math.floor(this.player.x / 800)
    const targetScrollX = currentScreen * 800

    if (this.cameras.main.scrollX !== targetScrollX) {
      this.cameras.main.setScroll(targetScrollX, 0)
    }

    // Update Env Text based on screen
    const envNames = ['Savannah', 'Swamp', 'Forest', 'Mountain']
    this.envText.setText(`Env: ${envNames[currentScreen] || 'Unknown'}`)

    // Manual Restart
    if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
      this.scene.restart()
    }
  }

  collectMask(player, mask) {
    if (this.isCollecting) return

    // Mask collection effect
    const emitter = this.maskParticles.createEmitter({
      x: mask.x,
      y: mask.y,
      speed: { min: 50, max: 150 },
      scale: { start: 0.2, end: 0 },
      lifespan: 800,
      quantity: 15
    })
    emitter.explode()

    mask.destroy()
    gameState.maskPieces++
    this.maskText.setText(`Masks: ${gameState.maskPieces}/${gameState.totalPieces}`)

    // Celebration flash
    const flash = this.add.rectangle(400, 225, 800, 450, 0xffffff, 0.4).setScrollFactor(0).setDepth(99)
    this.tweens.add({ targets: flash, alpha: 0, duration: 300, onComplete: () => flash.destroy() })

    if (gameState.maskPieces >= gameState.totalPieces) {
      this.isCollecting = true
      this.time.delayedCall(1000, () => {
        this.scene.start('EndStory')
      })
    }
  }

  hitEnemy(player, enemy) {
    if (this.isHit) return
    this.isHit = true

    player.setTint(0xff0000)
    this.cameras.main.shake(300, 0.02)

    // Red flash
    const flash = this.add.rectangle(400, 225, 800, 450, 0xff0000, 0.5).setScrollFactor(0).setDepth(99)
    this.tweens.add({ targets: flash, alpha: 0, duration: 300, onComplete: () => flash.destroy() })

    this.add.text(400, 225, 'HIT!', {
      fontSize: '48px', color: '#ff0000', stroke: '#000', strokeThickness: 6, fontStyle: 'bold'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(100)

    this.time.delayedCall(1000, () => {
      this.scene.restart()
    })
  }
}
