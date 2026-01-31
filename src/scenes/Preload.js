// src/scenes/Preload.js
export default class Preload extends Phaser.Scene {
  constructor() {
    super('Preload')
  }

  init() {
    this.cameras.main.setBackgroundColor('#1a0f0a')
  }

  preload() {
    // Loading text
    const loadingText = this.add.text(400, 200, 'Loading Kingdom...', {
      fontSize: '32px',
      fontFamily: '"Agbalumo", cursive',
      color: '#d4af37',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    // Progress bar background
    const progressBox = this.add.graphics()
    progressBox.fillStyle(0x222222, 0.8)
    progressBox.fillRect(250, 250, 300, 30)

    // Progress bar
    const progressBar = this.add.graphics()

    // Loading percentage text
    const percentText = this.add.text(400, 265, '0%', {
      fontSize: '18px',
      color: '#ffffff'
    }).setOrigin(0.5)

    // Update progress
    this.load.on('progress', (value) => {
      progressBar.clear()
      progressBar.fillStyle(0xd4af37, 1)
      progressBar.fillRect(250, 250, 300 * value, 30)
      percentText.setText(parseInt(value * 100) + '%')
    })

    this.load.on('complete', () => {
      progressBar.destroy()
      progressBox.destroy()
      loadingText.destroy()
      percentText.destroy()
    })

    // Initial placeholders
    this.load.image('player', 'assets/player.png')
    this.load.image('ground', 'assets/ground.png')
    this.load.image('maskPiece', 'assets/maskPiece.png')
    this.load.image('enemy', 'assets/ground.png')

    // Mask pieces - one for each environment
    this.load.image('mask1', 'assets/mask1.png')  // Savannah
    this.load.image('mask2', 'assets/mask2.png')  // Swamp
    this.load.image('mask3', 'assets/mask3.png')  // Forest
    this.load.image('mask4', 'assets/mask4.png')  // Mountain

    // Audio assets
    this.load.audio('bgMusic', 'assets/music/backgroundMusic.mp3')
    this.load.audio('buttonClick', 'assets/music/buttonClick.mp3')

    // Sound effects
    this.load.audio('pickSound', 'assets/music/pick.mp3')
    this.load.audio('failSound', 'assets/music/failed.mp3')
    this.load.audio('clapSound', 'assets/music/clap.wav')  // Victory sound
  }

  create() {
    this.scene.start('MainMenu')
  }
}
