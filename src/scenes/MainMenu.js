import { gameState } from '../gameState.js'

export default class MainMenu extends Phaser.Scene {
  constructor() {
    super('MainMenu')
  }

  preload() {
    // Load background image
    // Replace 'menu-bg' with your actual background image path
    this.load.image('menu-bg', 'assets/homeBg.jpeg')

    // Optional: Load additional decorative elements
    // this.load.image('mask-icon', 'assets/images/mask-icon.png')
    // this.load.image('pattern', 'assets/images/african-pattern.png')
  }

  create() {
    const { width, height } = this.cameras.main

    // Background image with dark overlay for readability
    const bg = this.add.image(width / 2, height / 2, 'menu-bg')
    bg.setDisplaySize(width, height)

    // Dark gradient overlay for text readability
    const overlay = this.add.graphics()
    overlay.fillGradientStyle(0x000000, 0x000000, 0x1a0f0a, 0x1a0f0a, 0.7, 0.7, 0.9, 0.9)
    overlay.fillRect(0, 0, width, height)

    // Decorative top border with African pattern simulation
    const topBorder = this.add.graphics()
    topBorder.fillStyle(0xd4af37, 1)
    topBorder.fillRect(0, 0, width, 4)

    // Decorative geometric pattern (African-inspired)
    this.createDecorativePattern(width, height)

    // Main container for centered content
    const centerX = width / 2

    // Animated title with glow effect
    const titleShadow = this.add.text(centerX, 102, 'THE HIVE', {
      fontSize: '72px',
      fontFamily: '"Sankofa Display", sans-serif',
      color: '#000000',
      fontStyle: 'bold'
    }).setOrigin(0.5).setAlpha(0.5)

    const title = this.add.text(centerX, 100, 'THE HIVE', {
      fontSize: '72px',
      fontFamily: '"Sankofa Display", sans-serif',
      color: '#d4af37',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 6,
      shadow: {
        offsetX: 0,
        offsetY: 0,
        color: '#d4af37',
        blur: 25,
        fill: true
      }
    }).setOrigin(0.5)

    // Pulse animation for title and shadow
    this.tweens.add({
      targets: [title, titleShadow],
      scale: 1.05,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    })

    // Glow pulse animation
    this.tweens.add({
      targets: title,
      alpha: 0.9,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    })

    // Decorative line under title
    const titleLine = this.add.graphics()
    titleLine.lineStyle(2, 0xd4af37, 1)
    titleLine.beginPath()
    titleLine.moveTo(centerX - 120, 140)
    titleLine.lineTo(centerX + 120, 140)
    titleLine.strokePath()

    // Subtitle with elegant styling
    this.add.text(centerX, 170, 'An African Kingdom Adventure', {
      fontSize: '22px',
      fontFamily: '"Agbalumo", cursive',
      color: '#c9a961',
      letterSpacing: '2px'
    }).setOrigin(0.5)

    // Content container with subtle background
    const contentBg = this.add.graphics()
    contentBg.fillStyle(0x000000, 0.5)
    contentBg.lineStyle(2, 0xd4af37, 0.3)
    contentBg.fillRoundedRect(centerX - 200, 220, 400, 200, 10)
    contentBg.strokeRoundedRect(centerX - 200, 220, 400, 200, 10)

    // START button with professional styling
    const startBtn = this.createButton(
      centerX,
      270,
      'START QUEST',
      {
        fontSize: '32px',
        fontFamily: '"Agbalumo", cursive',
        color: '#1a0f0a',
        backgroundColor: '#d4af37',
        padding: { x: 40, y: 18 }
      }
    )

    // TUTORIAL button
    const tutorialBtn = this.createButton(
      centerX,
      350,
      'TUTORIAL',
      {
        fontSize: '24px',
        fontFamily: '"Agbalumo", cursive',
        color: '#d4af37',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: { x: 40, y: 15 },
        stroke: '#d4af37',
        strokeThickness: 2
      }
    )

    // Enhanced button interactions
    this.setupButtonInteractions(startBtn, {
      normalScale: 1,
      hoverScale: 1.08,
      normalColor: '#1a0f0a',
      hoverColor: '#000000',
      normalBg: '#d4af37',
      hoverBg: '#f4cf67',
      sound: true
    })

    this.setupButtonInteractions(tutorialBtn, {
      normalScale: 1,
      hoverScale: 1.05,
      normalColor: '#d4af37',
      hoverColor: '#f4cf67',
      normalBg: 'rgba(0, 0, 0, 0.7)',
      hoverBg: 'rgba(212, 175, 55, 0.2)',
      sound: false
    })

    // Button click handlers
    startBtn.on('pointerdown', () => {
      this.cameras.main.fadeOut(500, 0, 0, 0)
      this.time.delayedCall(500, () => {
        gameState.maskPieces = 0
        gameState.currentEnvIndex = 0
        this.scene.start('StoryScene')
      })
    })

    tutorialBtn.on('pointerdown', () => {
      this.cameras.main.fadeOut(500, 0, 0, 0)
      this.time.delayedCall(500, () => {
        this.scene.start('Tutorial')
      })
    })

    // Footer with decorative elements
    const footerBg = this.add.graphics()
    footerBg.fillStyle(0x000000, 0.4)
    footerBg.fillRoundedRect(centerX - 250, 430, 500, 50, 8)

    this.add.text(centerX, 455, 'Collect all 4 mask pieces to restore the kingdom', {
      fontSize: '18px',
      fontFamily: '"Agbalumo", cursive',
      color: '#c9a961',
      align: 'center',
      letterSpacing: '1px'
    }).setOrigin(0.5)

    // Decorative corner elements
    this.createCornerDecorations(width, height)

    // Fade in animation
    this.cameras.main.fadeIn(1000, 0, 0, 0)

    // Floating particles effect (optional decorative element)
    this.createFloatingParticles()

    // Sound Toggle Button
    this.createSoundToggle(width, height)

    // Background Music (only if sound enabled)
    if (this.cache.audio.exists('bgMusic') && gameState.soundEnabled) {
      if (!this.sound.get('bgMusic')) {
        this.bgMusic = this.sound.add('bgMusic', { loop: true, volume: 0.4 })
        this.bgMusic.play()
      } else if (!this.sound.get('bgMusic').isPlaying) {
        this.sound.get('bgMusic').play()
      }
    }
  }

  createSoundToggle(width, height) {
    // Sound toggle button in top right corner
    const soundIcon = gameState.soundEnabled ? '🔊' : '🔇'
    
    this.soundBtn = this.add.text(width - 50, 20, soundIcon, {
      fontSize: '32px',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      padding: { x: 10, y: 8 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true })

    this.soundBtn.on('pointerover', () => {
      this.soundBtn.setScale(1.1)
    })

    this.soundBtn.on('pointerout', () => {
      this.soundBtn.setScale(1)
    })

    this.soundBtn.on('pointerdown', () => {
      const isEnabled = gameState.toggleSound()
      this.soundBtn.setText(isEnabled ? '🔊' : '🔇')
      
      if (isEnabled) {
        // Turn sound on
        if (this.cache.audio.exists('bgMusic')) {
          const bgMusic = this.sound.get('bgMusic') || this.sound.add('bgMusic', { loop: true, volume: 0.4 })
          if (!bgMusic.isPlaying) {
            bgMusic.play()
          }
        }
      } else {
        // Turn sound off
        this.sound.stopAll()
      }
    })
  }

  createButton(x, y, text, style) {
    const btn = this.add.text(x, y, text, {
      fontSize: style.fontSize,
      fontFamily: style.fontFamily,
      color: style.color,
      backgroundColor: style.backgroundColor,
      padding: style.padding,
      stroke: style.stroke || '',
      strokeThickness: style.strokeThickness || 0
    }).setOrigin(0.5).setInteractive({ useHandCursor: true })

    return btn
  }

  setupButtonInteractions(button, config) {
    button.on('pointerover', () => {
      this.tweens.add({
        targets: button,
        scale: config.hoverScale,
        duration: 150,
        ease: 'Power2'
      })
      button.setColor(config.hoverColor)
      button.setBackgroundColor(config.hoverBg)
    })

    button.on('pointerout', () => {
      this.tweens.add({
        targets: button,
        scale: config.normalScale,
        duration: 150,
        ease: 'Power2'
      })
      button.setColor(config.normalColor)
      button.setBackgroundColor(config.normalBg)
    })

    button.on('pointerdown', () => {
      // Play click sound if enabled
      if (gameState.soundEnabled && this.cache.audio.exists('buttonClick')) {
        this.sound.play('buttonClick', { volume: 0.6 })
      }

      this.tweens.add({
        targets: button,
        scale: config.normalScale * 0.95,
        duration: 100,
        yoyo: true,
        ease: 'Power2'
      })
    })
  }

  createDecorativePattern(width, height) {
    const pattern = this.add.graphics()
    pattern.lineStyle(1, 0xd4af37, 0.15)

    // Create geometric pattern inspired by African art
    const spacing = 40
    for (let i = 0; i < width; i += spacing) {
      for (let j = 0; j < height; j += spacing) {
        if (Math.random() > 0.7) {
          pattern.strokeRect(i, j, 20, 20)
        }
      }
    }
  }

  createCornerDecorations(width, height) {
    const graphics = this.add.graphics()
    graphics.lineStyle(3, 0xd4af37, 0.8)

    // Top left corner
    graphics.beginPath()
    graphics.moveTo(20, 60)
    graphics.lineTo(20, 20)
    graphics.lineTo(60, 20)
    graphics.strokePath()

    // Top right corner
    graphics.beginPath()
    graphics.moveTo(width - 60, 20)
    graphics.lineTo(width - 20, 20)
    graphics.lineTo(width - 20, 60)
    graphics.strokePath()

    // Bottom left corner
    graphics.beginPath()
    graphics.moveTo(20, height - 60)
    graphics.lineTo(20, height - 20)
    graphics.lineTo(60, height - 20)
    graphics.strokePath()

    // Bottom right corner
    graphics.beginPath()
    graphics.moveTo(width - 60, height - 20)
    graphics.lineTo(width - 20, height - 20)
    graphics.lineTo(width - 20, height - 60)
    graphics.strokePath()
  }

  createFloatingParticles() {
    const particles = []
    const particleCount = 15

    for (let i = 0; i < particleCount; i++) {
      const x = Phaser.Math.Between(0, this.cameras.main.width)
      const y = Phaser.Math.Between(0, this.cameras.main.height)

      const particle = this.add.circle(x, y, 2, 0xd4af37, 0.3)
      particles.push(particle)

      this.tweens.add({
        targets: particle,
        y: y - Phaser.Math.Between(50, 150),
        alpha: 0,
        duration: Phaser.Math.Between(3000, 6000),
        repeat: -1,
        delay: Phaser.Math.Between(0, 3000),
        onRepeat: () => {
          particle.y = this.cameras.main.height + 10
          particle.alpha = 0.3
        }
      })
    }
  }
}