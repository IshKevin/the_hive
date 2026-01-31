// src/scenes/EndStory.js
export default class EndStory extends Phaser.Scene {
  constructor() {
    super('EndStory')
  }

  create() {
    this.cameras.main.setBackgroundColor('#0f1a0a')

    // Victory title
    this.add.text(400, 60, '✦ VICTORY ✦', {
      fontSize: '40px',
      color: '#d4af37',
      fontStyle: 'bold',
      stroke: '#000',
      strokeThickness: 6
    }).setOrigin(0.5)

    // Ending story
    const endText = `You have collected all 4 pieces of the Sacred Mask!

The fragments glow with ancient power as they
come together, reforming the legendary artifact.

The mask shines brighter than ever before,
its blessing spreading across the land.

The Savannah blooms with life.
The Swamp waters run clear.
The Forest sings with joy.
The Mountain stands proud.

The kingdom is united once more.
Peace and prosperity return to the people.

The ancestors smile upon you, brave hero.
Your name will be remembered forever.`

    this.add.text(400, 260, endText, {
      fontSize: '15px',
      color: '#ffffff',
      align: 'center',
      lineSpacing: 6
    }).setOrigin(0.5)

    const continueText = this.add.text(400, 430, 'Click to see credits', {
      fontSize: '14px',
      color: '#d4af37'
    }).setOrigin(0.5)

    this.tweens.add({
      targets: continueText,
      alpha: 0.4,
      duration: 700,
      yoyo: true,
      repeat: -1
    })

    this.input.once('pointerdown', () => {
      this.scene.start('Credits')
    })
  }
}
