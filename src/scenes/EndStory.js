// src/scenes/EndStory.js
export default class EndStory extends Phaser.Scene {
  constructor() {
    super('EndStory')
  }

  create() {
    this.add.text(400, 200,
      'The mask is restored.\nThe kingdom is united.',
      { fontSize: '20px', align: 'center' }
    ).setOrigin(0.5)

    this.input.once('pointerdown', () => {
      this.scene.start('Credits')
    })
  }
}
