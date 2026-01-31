// src/scenes/StoryScene.js
export default class StoryScene extends Phaser.Scene {
  constructor() {
    super('StoryScene')
  }

  create() {
    // Background color for story
    this.cameras.main.setBackgroundColor('#1a0f0a')

    // Title
    this.add.text(400, 80, 'THE LEGEND OF THE SACRED MASK', {
      fontSize: '24px',
      color: '#d4af37',
      fontStyle: 'bold',
      stroke: '#000',
      strokeThickness: 4
    }).setOrigin(0.5)

    // Story text
    const storyText = `Long ago, in the heart of Africa, a powerful king ruled
with wisdom and strength. His sacred mask, blessed by
the ancestors, kept the kingdom united and prosperous.

But a great storm scattered the mask into 4 pieces,
each lost in a different land:

The Golden Savannah
The Mystic Swamp
The Ancient Forest
The Sacred Mountain

You must journey through each realm and recover
the pieces to restore peace to the kingdom.

Click to begin your quest...`

    this.add.text(400, 280, storyText, {
      fontSize: '16px',
      color: '#ffffff',
      align: 'center',
      lineSpacing: 8
    }).setOrigin(0.5)

    // Pulsing effect on "Click to begin"
    const clickText = this.add.text(400, 430, '▼ CLICK TO BEGIN ▼', {
      fontSize: '14px',
      color: '#d4af37'
    }).setOrigin(0.5)

    this.tweens.add({
      targets: clickText,
      alpha: 0.3,
      duration: 800,
      yoyo: true,
      repeat: -1
    })

    this.input.once('pointerdown', () => {
      this.scene.start('GameScene')
    })
  }
}
