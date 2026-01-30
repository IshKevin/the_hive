// src/scenes/Preload.js
export default class Preload extends Phaser.Scene {
  constructor() {
    super('Preload')
  }

  preload() {
    // placeholders
    this.load.image('player', 'assets/player.png')
    this.load.image('ground', 'assets/ground.png')
    this.load.image('maskPiece', 'assets/maskPiece.png')
  }

  create() {
    this.scene.start('MainMenu')
  }
}
