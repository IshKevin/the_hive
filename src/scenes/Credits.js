// src/scenes/Credits.js
export default class Credits extends Phaser.Scene {
  constructor() {
    super('Credits')
  }

  create() {
    this.add.text(400, 200,
      'Game by:\nKevin Ishimwe\n\nGlobal Game Jam',
      { fontSize: '18px', align: 'center' }
    ).setOrigin(0.5)
  }
}
