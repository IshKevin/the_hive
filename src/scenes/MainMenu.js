import { gameState } from '../gameState.js'

export default class MainMenu extends Phaser.Scene {
  constructor() {
    super('MainMenu')
  }

  create() {
    this.add.text(400, 120, 'MASK OF THE KING', {
      fontSize: '32px',
      color: '#ffffff'
    }).setOrigin(0.5)

    const startBtn = this.add.text(400, 220, 'START', {
      fontSize: '24px',
      backgroundColor: '#000'
    }).setOrigin(0.5).setInteractive()

    const tutorialBtn = this.add.text(400, 280, 'TUTORIAL', {
      fontSize: '20px',
      backgroundColor: '#000'
    }).setOrigin(0.5).setInteractive()

    startBtn.on('pointerdown', () => {
      gameState.maskPieces = 0
      gameState.currentEnvIndex = 0
      this.scene.start('StoryScene')
    })

    tutorialBtn.on('pointerdown', () => {
      this.scene.start('Tutorial')
    })
  }
}
