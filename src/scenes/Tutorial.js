export default class Tutorial extends Phaser.Scene {
  constructor() {
    super('Tutorial')
  }

  create() {
    this.add.text(400, 100, 'HOW TO PLAY', {
      fontSize: '32px',
      color: '#ffffff'
    }).setOrigin(0.5)

    this.add.text(400, 200,
      'Use Arrow Keys to Move\nUp Arrow to Jump\n\nCollect the Mask Pieces!',
      { fontSize: '20px', align: 'center' }
    ).setOrigin(0.5)

    const backBtn = this.add.text(400, 350, 'BACK TO MENU', {
      fontSize: '24px',
      backgroundColor: '#000'
    }).setOrigin(0.5).setInteractive()

    backBtn.on('pointerdown', () => {
      this.scene.start('MainMenu')
    })
  }
}
