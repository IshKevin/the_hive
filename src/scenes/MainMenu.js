import { gameState } from '../gameState.js'

export default class MainMenu extends Phaser.Scene {
  constructor() {
    super('MainMenu')
  }

  create() {
    // African-themed background
    this.cameras.main.setBackgroundColor('#1a0f0a')

    // Animated title
    const title = this.add.text(400, 100, 'MASK OF THE KING', {
      fontSize: '40px',
      color: '#d4af37',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 6
    }).setOrigin(0.5)

    // Pulse animation for title
    this.tweens.add({
      targets: title,
      scale: 1.05,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    })

    // Subtitle
    this.add.text(400, 150, 'An African Kingdom Adventure', {
      fontSize: '16px',
      color: '#8b7355',
      fontStyle: 'italic'
    }).setOrigin(0.5)

    // START button
    const startBtn = this.add.text(400, 240, 'START QUEST', {
      fontSize: '28px',
      color: '#d4af37',
      backgroundColor: '#000000',
      padding: { x: 30, y: 15 },
      stroke: '#d4af37',
      strokeThickness: 2
    }).setOrigin(0.5).setInteractive()

    // TUTORIAL button
    const tutorialBtn = this.add.text(400, 320, 'TUTORIAL', {
      fontSize: '24px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 30, y: 12 }
    }).setOrigin(0.5).setInteractive()

    // Button hover effects
    startBtn.on('pointerover', () => {
      startBtn.setScale(1.1)
      startBtn.setBackgroundColor('#d4af37')
      startBtn.setColor('#000000')
    })

    startBtn.on('pointerout', () => {
      startBtn.setScale(1)
      startBtn.setBackgroundColor('#000000')
      startBtn.setColor('#d4af37')
    })

    tutorialBtn.on('pointerover', () => {
      tutorialBtn.setScale(1.1)
      tutorialBtn.setColor('#d4af37')
    })

    tutorialBtn.on('pointerout', () => {
      tutorialBtn.setScale(1)
      tutorialBtn.setColor('#ffffff')
    })

    // Button click handlers
    startBtn.on('pointerdown', () => {
      gameState.maskPieces = 0
      gameState.currentEnvIndex = 0
      this.scene.start('StoryScene')
    })

    tutorialBtn.on('pointerdown', () => {
      this.scene.start('Tutorial')
    })

    // Footer info
    this.add.text(400, 420, 'Collect all 4 mask pieces to restore the kingdom', {
      fontSize: '14px',
      color: '#666666',
      align: 'center'
    }).setOrigin(0.5)
  }
}
