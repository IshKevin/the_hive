// src/scenes/GameScene.js
import { gameState } from '../gameState.js'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene')
  }

  create() {
    const { width, height } = this.scale
    const worldWidth = 3200
    const worldHeight = 450
    const screenWidth = 800

    this.physics.world.setBounds(0, 0, worldWidth, worldHeight)
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight)
    this.cameras.main.setSize(screenWidth, worldHeight)

    // Background Images for each environment segment
    const backgrounds = [
      { key: 'savannaBackground', fallbackColor: 0xe6ccb2 },   // Savannah
      { key: 'swampBackground', fallbackColor: 0x2d6a4f },     // Swamp
      { key: 'forestBackground', fallbackColor: 0x52b788 },    // Forest
      { key: 'mountainBackground', fallbackColor: 0xa8dadc }   // Mountain
    ]
    
    backgrounds.forEach((bg, i) => {
      const xPos = i * screenWidth
      
      if (this.textures.exists(bg.key)) {
        // Use background image
        const bgImage = this.add.image(xPos, 0, bg.key).setOrigin(0)
        // Scale to fit the screen segment
        bgImage.setDisplaySize(screenWidth, worldHeight)
      } else {
        // Fallback to colored rectangle
        this.add.rectangle(xPos, 0, screenWidth, worldHeight, bg.fallbackColor).setOrigin(0)
      }
    })

    // UI Text (Fixed on screen)
    this.uiContainer = this.add.container(0, 0).setScrollFactor(0).setDepth(100)

    this.envText = this.add.text(10, 10, 'Env: Savannah', {
      fontSize: '22px',
      fontFamily: '"Agbalumo", cursive',
      fill: '#d4af37',
      stroke: '#000',
      strokeThickness: 3
    })
    this.uiContainer.add(this.envText)

    this.maskText = this.add.text(10, 38, `Masks: 0/${gameState.totalPieces}`, {
      fontSize: '22px',
      fontFamily: '"Agbalumo", cursive',
      fill: '#d4af37',
      stroke: '#000',
      strokeThickness: 3
    })
    this.uiContainer.add(this.maskText)

    // Mask Piece Icons UI - Show collected pieces
    this.maskIcons = []
    const maskIconsStartX = 10
    const maskIconsStartY = 70
    for (let i = 1; i <= 4; i++) {
      const icon = this.add.image(maskIconsStartX + (i - 1) * 45, maskIconsStartY, `mask${i}`)
        .setScale(0.08)
        .setAlpha(0.3)  // Dimmed until collected
        .setScrollFactor(0)
      this.maskIcons.push(icon)
      this.uiContainer.add(icon)
    }

    const infoText = this.add.text(width / 2, height - 30, 'Arrow Keys: Move  |  P: Pause  |  M: Sound', {
      fontSize: '16px',
      fontFamily: '"Agbalumo", cursive',
      fill: '#fff',
      stroke: '#000',
      strokeThickness: 2
    }).setOrigin(0.5).setScrollFactor(0)
    this.uiContainer.add(infoText)

    this.posText = this.add.text(width - 100, 10, 'X: 0 Y: 0', {
      fontSize: '14px',
      fontFamily: '"Agbalumo", cursive',
      fill: '#ffff00'
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

    // Helper function to get random number in range
    const randomRange = (min, max) => Phaser.Math.Between(min, max)

    // Mask Pieces - Each environment has a unique piece at RANDOM positions
    this.maskPieces = this.physics.add.group()
    
    // Each environment is 800px wide, define random zones for each mask
    // Avoid spawning too close to edges (50px margin) and player start area
    const maskConfigs = [
      { texture: 'mask1', name: 'mask1', minX: 200, maxX: 750 },   // Savannah (avoid player spawn)
      { texture: 'mask2', name: 'mask2', minX: 850, maxX: 1550 },  // Swamp
      { texture: 'mask3', name: 'mask3', minX: 1650, maxX: 2350 }, // Forest
      { texture: 'mask4', name: 'mask4', minX: 2450, maxX: 3150 }  // Mountain
    ]

    maskConfigs.forEach((config) => {
      const randomX = randomRange(config.minX, config.maxX)
      const randomY = randomRange(50, 400)  // Random Y within world height
      
      const piece = this.maskPieces.create(randomX, randomY, config.texture).setScale(0.15)
      piece.body.setAllowGravity(false)
      piece.maskName = config.name  // Store which mask piece this is
      this.tweens.add({
        targets: piece, y: randomY - 10, duration: 1000, yoyo: true, repeat: -1
      })
    })

    this.physics.add.overlap(this.player, this.maskPieces, this.collectMask, null, this)

    // Enemies - Spawn immediately in EACH environment (2-3 per environment)
    this.enemies = this.physics.add.group()
    
    // Spawn enemies in EACH environment
    const environments = [
      { minX: 200, maxX: 750 },   // Savannah (avoid player spawn at 100)
      { minX: 850, maxX: 1550 },  // Swamp
      { minX: 1650, maxX: 2350 }, // Forest
      { minX: 2450, maxX: 3150 }  // Mountain
    ]
    
    environments.forEach(env => {
      const numEnemiesInEnv = randomRange(2, 3)  // 2-3 enemies per environment (guaranteed)
      
      for (let i = 0; i < numEnemiesInEnv; i++) {
        const randomX = randomRange(env.minX, env.maxX)
        const randomY = randomRange(50, 400)
        
        // Faster velocity (minimum 80, max 200) for quicker movement
        let randomVX = randomRange(-200, 200)
        let randomVY = randomRange(-200, 200)
        // Ensure minimum speed so enemies are always moving fast
        if (Math.abs(randomVX) < 80) randomVX = randomVX >= 0 ? 100 : -100
        if (Math.abs(randomVY) < 80) randomVY = randomVY >= 0 ? 100 : -100
        
        const enemy = this.enemies.create(randomX, randomY, 'enemy')
        enemy.setScale(0.15) // SMALL enemies
        enemy.setTint(0xff0000)
        enemy.setBounce(1)
        enemy.setCollideWorldBounds(true)
        enemy.setVelocity(randomVX, randomVY)
        enemy.body.setAllowGravity(false)
        enemy.setActive(true)
        enemy.setVisible(true)
      }
    })

    this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, null, this)

    // Mask Particles - Phaser 3.60+ syntax
    this.maskParticles = this.add.particles(0, 0, 'maskPiece', {
      speed: { min: 50, max: 150 },
      scale: { start: 0.3, end: 0 },
      lifespan: 600,
      gravityY: 200,
      emitting: false  // Don't emit automatically
    })

    // Initial state - Reset collected masks
    gameState.resetMasks()
    this.isCollecting = false
    this.isHit = false

    // Set camera to initial screen
    this.cameras.main.setScroll(0, 0)

    // Ensure Background Music is playing at very low volume (if sound enabled)
    if (gameState.soundEnabled && this.cache.audio.exists('bgMusic')) {
      const bgMusic = this.sound.get('bgMusic') || this.sound.add('bgMusic', { loop: true, volume: 0.05 })
      if (!bgMusic.isPlaying) {
        bgMusic.play()
      } else {
        bgMusic.setVolume(0.05)
      }
    } else if (!gameState.soundEnabled) {
      this.sound.stopAll()
    }

    // Track previous key states for movement sounds
    this.prevKeys = {
      left: false,
      right: false,
      up: false,
      down: false
    }
    
    // Pause state
    this.isPaused = false
    
    // Create pause button and menu
    this.createPauseButton()
    this.createPauseMenu()
    
    // Keyboard shortcuts
    this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
    this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)
    this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q)
    this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
  }
  
  createPauseButton() {
    // Pause button (top right)
    this.pauseBtn = this.add.text(760, 10, '⏸', {
      fontSize: '28px',
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: { x: 10, y: 5 }
    }).setScrollFactor(0).setDepth(100).setInteractive({ useHandCursor: true })
    
    this.pauseBtn.on('pointerover', () => {
      this.pauseBtn.setScale(1.1)
    })
    this.pauseBtn.on('pointerout', () => {
      this.pauseBtn.setScale(1)
    })
    this.pauseBtn.on('pointerdown', () => {
      this.togglePause()
    })
  }
  
  createPauseMenu() {
    const { width, height } = this.scale
    
    // Pause menu container (hidden initially)
    this.pauseMenu = this.add.container(width / 2, height / 2).setScrollFactor(0).setDepth(200).setVisible(false)
    
    // Dark overlay behind menu
    this.pauseOverlay = this.add.rectangle(0, 0, width * 2, height * 2, 0x000000, 0.7)
    this.pauseMenu.add(this.pauseOverlay)
    
    // Menu background
    const menuBg = this.add.graphics()
    menuBg.fillStyle(0x1a0f0a, 0.95)
    menuBg.fillRoundedRect(-150, -120, 300, 240, 15)
    menuBg.lineStyle(3, 0xd4af37, 1)
    menuBg.strokeRoundedRect(-150, -120, 300, 240, 15)
    this.pauseMenu.add(menuBg)
    
    // Pause title
    const pauseTitle = this.add.text(0, -90, '⏸ PAUSED', {
      fontSize: '32px',
      fontFamily: '"Sankofa Display", sans-serif',
      color: '#d4af37',
      fontStyle: 'bold'
    }).setOrigin(0.5)
    this.pauseMenu.add(pauseTitle)
    
    // Decorative line
    const line = this.add.graphics()
    line.lineStyle(2, 0xd4af37, 0.5)
    line.beginPath()
    line.moveTo(-100, -55)
    line.lineTo(100, -55)
    line.strokePath()
    this.pauseMenu.add(line)
    
    // Resume button
    const resumeBtnBg = this.add.graphics()
    resumeBtnBg.fillStyle(0x4ade80, 1)
    resumeBtnBg.fillRoundedRect(-100, -40, 200, 50, 10)
    this.pauseMenu.add(resumeBtnBg)
    
    const resumeText = this.add.text(0, -15, '▶ RESUME', {
      fontSize: '20px',
      fontFamily: '"Sankofa Display", sans-serif',
      color: '#1a0f0a',
      fontStyle: 'bold'
    }).setOrigin(0.5)
    this.pauseMenu.add(resumeText)
    
    const resumeHitbox = this.add.rectangle(0, -15, 200, 50, 0x000000, 0)
      .setInteractive({ useHandCursor: true })
    this.pauseMenu.add(resumeHitbox)
    
    resumeHitbox.on('pointerover', () => {
      resumeBtnBg.clear()
      resumeBtnBg.fillStyle(0x6ee7a0, 1)
      resumeBtnBg.fillRoundedRect(-100, -40, 200, 50, 10)
    })
    resumeHitbox.on('pointerout', () => {
      resumeBtnBg.clear()
      resumeBtnBg.fillStyle(0x4ade80, 1)
      resumeBtnBg.fillRoundedRect(-100, -40, 200, 50, 10)
    })
    resumeHitbox.on('pointerdown', () => {
      this.togglePause()
    })
    
    // Quit button
    const quitBtnBg = this.add.graphics()
    quitBtnBg.fillStyle(0xff6b6b, 1)
    quitBtnBg.fillRoundedRect(-100, 25, 200, 50, 10)
    this.pauseMenu.add(quitBtnBg)
    
    const quitText = this.add.text(0, 50, '🏠 QUIT TO MENU', {
      fontSize: '18px',
      fontFamily: '"Sankofa Display", sans-serif',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5)
    this.pauseMenu.add(quitText)
    
    const quitHitbox = this.add.rectangle(0, 50, 200, 50, 0x000000, 0)
      .setInteractive({ useHandCursor: true })
    this.pauseMenu.add(quitHitbox)
    
    quitHitbox.on('pointerover', () => {
      quitBtnBg.clear()
      quitBtnBg.fillStyle(0xff8a8a, 1)
      quitBtnBg.fillRoundedRect(-100, 25, 200, 50, 10)
    })
    quitHitbox.on('pointerout', () => {
      quitBtnBg.clear()
      quitBtnBg.fillStyle(0xff6b6b, 1)
      quitBtnBg.fillRoundedRect(-100, 25, 200, 50, 10)
    })
    quitHitbox.on('pointerdown', () => {
      this.quitGame()
    })
    
    // Tip text with shortcuts
    const tipText = this.add.text(0, 100, '[ESC/P] Resume  •  [Q] Quit  •  [M] Sound', {
      fontSize: '11px',
      fontFamily: '"Agbalumo", cursive',
      color: '#888888'
    }).setOrigin(0.5)
    this.pauseMenu.add(tipText)
  }
  
  togglePause() {
    this.isPaused = !this.isPaused
    
    if (this.isPaused) {
      // Pause the game
      this.physics.pause()
      this.tweens.pauseAll()
      this.pauseMenu.setVisible(true)
      this.pauseBtn.setText('▶')
      
      // Pause background music
      const bgMusic = this.sound.get('bgMusic')
      if (bgMusic && bgMusic.isPlaying) {
        bgMusic.pause()
      }
    } else {
      // Resume the game
      this.physics.resume()
      this.tweens.resumeAll()
      this.pauseMenu.setVisible(false)
      this.pauseBtn.setText('⏸')
      
      // Resume background music
      const bgMusic = this.sound.get('bgMusic')
      if (bgMusic && gameState.soundEnabled) {
        bgMusic.resume()
      }
    }
  }
  
  quitGame() {
    // Stop all sounds
    this.sound.stopAll()
    
    // Reset game state
    gameState.resetMasks()
    
    // Fade out and go to main menu
    this.cameras.main.fadeOut(500, 0, 0, 0)
    this.time.delayedCall(500, () => {
      this.scene.start('MainMenu')
    })
  }

  update() {
    // Check for keyboard shortcuts
    if (Phaser.Input.Keyboard.JustDown(this.keyESC) || Phaser.Input.Keyboard.JustDown(this.keyP)) {
      this.togglePause()
    }
    
    // Q to quit (only when paused for safety)
    if (Phaser.Input.Keyboard.JustDown(this.keyQ) && this.isPaused) {
      this.quitGame()
    }
    
    // M to toggle music/sound
    if (Phaser.Input.Keyboard.JustDown(this.keyM)) {
      gameState.toggleSound()
      const bgMusic = this.sound.get('bgMusic')
      if (gameState.soundEnabled) {
        if (bgMusic && !this.isPaused) bgMusic.resume()
      } else {
        if (bgMusic) bgMusic.pause()
      }
    }
    
    // Don't process game logic if paused or hit
    if (this.isPaused || this.isHit) return

    // Play button click sound on key press (JustDown) if sound enabled
    if (Phaser.Input.Keyboard.JustDown(this.cursors.left) ||
        Phaser.Input.Keyboard.JustDown(this.cursors.right) ||
        Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
        Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      if (gameState.soundEnabled && this.cache.audio.exists('buttonClick')) {
        this.sound.play('buttonClick', { volume: 0.3 })
      }
    }

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
    if (this.isCollecting || !mask.active) return

    // Get which mask piece was collected
    const maskName = mask.maskName
    const maskIndex = parseInt(maskName.replace('mask', '')) - 1

    // Position of the collected mask
    const mx = mask.x
    const my = mask.y

    try {
      // Particle burst - Phaser 3.60+ syntax
      if (this.maskParticles) {
        this.maskParticles.setPosition(mx, my)
        this.maskParticles.explode(15)
      }
    } catch (e) {
      console.warn("Particle effect failed:", e)
    }

    mask.destroy()
    gameState.maskPieces++
    gameState.collectedMasks[maskName] = true

    // Update mask icon to show collected (full opacity)
    if (this.maskIcons && this.maskIcons[maskIndex]) {
      this.maskIcons[maskIndex].setAlpha(1)
      // Add a pop effect to the icon
      this.tweens.add({
        targets: this.maskIcons[maskIndex],
        scale: 0.12,
        duration: 200,
        yoyo: true,
        ease: 'Bounce.easeOut'
      })
    }

    // Play pick sound for collection (if sound enabled)
    if (gameState.soundEnabled && this.cache.audio.exists('pickSound')) {
      this.sound.play('pickSound', { volume: 0.6 })
    }

    if (this.maskText) {
      this.maskText.setText(`Masks: ${gameState.maskPieces}/${gameState.totalPieces}`)
    }

    try {
      const flash = this.add.rectangle(400, 225, 800, 450, 0xffffff, 0.4).setScrollFactor(0).setDepth(99)
      this.tweens.add({
        targets: flash,
        alpha: 0,
        duration: 300,
        onComplete: () => flash.destroy()
      })
    } catch (e) {
      console.warn("Flash effect failed:", e)
    }

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

    // Play fail sound for hit (if sound enabled)
    if (gameState.soundEnabled && this.cache.audio.exists('failSound')) {
      this.sound.play('failSound', { volume: 0.6 })
    }

    // Red flash
    const flash = this.add.rectangle(400, 225, 800, 450, 0xff0000, 0.5).setScrollFactor(0).setDepth(99)
    this.tweens.add({ targets: flash, alpha: 0, duration: 300, onComplete: () => flash.destroy() })

    this.add.text(400, 225, 'HIT!', {
      fontSize: '64px',
      fontFamily: '"Sankofa Display", sans-serif',
      color: '#ff0000',
      stroke: '#000',
      strokeThickness: 6,
      fontStyle: 'bold'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(100)

    this.time.delayedCall(1000, () => {
      this.scene.restart()
    })
  }
}
