// src/scenes/StoryScene.js
export default class StoryScene extends Phaser.Scene {
  constructor() {
    super('StoryScene')
  }

  create() {
    this.add.text(400, 200,
      'The King’s sacred mask was shattered.\n\nCollect the 4 pieces\nand restore the kingdom.',
      { fontSize: '18px', align: 'center' }
    ).setOrigin(0.5)

    this.input.once('pointerdown', () => {
      this.scene.start('GameScene')
    })
  }
}
