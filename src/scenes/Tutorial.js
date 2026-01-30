export default class Tutorial extends Phaser.Scene {
    constructor() {
        super('Tutorial')
    }

    create() {
        this.add.text(400, 50, 'HOW TO PLAY', {
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0.5)

        this.add.text(400, 100,
            'Use Arrow Keys to Move & Jump',
            { fontSize: '20px', align: 'center' }
        ).setOrigin(0.5)

        // Add static ground for tutorial
        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(400, 400, 'ground').setScale(2, 1).refreshBody()
        this.platforms.create(600, 250, 'ground').setScale(0.5, 1).refreshBody()

        // Add Player for practice
        this.player = this.physics.add.sprite(100, 300, 'player')
        this.player.setCollideWorldBounds(true)
        this.player.setBounce(0.1)

        this.physics.add.collider(this.player, this.platforms)

        // Controls
        this.cursors = this.input.keyboard.createCursorKeys()

        const backBtn = this.add.text(400, 430, 'BACK TO MENU', {
            fontSize: '20px',
            backgroundColor: '#000'
        }).setOrigin(0.5).setInteractive()

        backBtn.on('pointerdown', () => {
            this.scene.start('MainMenu')
        })
    }

    update() {
        // Movement Logic
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200)
            this.player.setFlipX(true)
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200)
            this.player.setFlipX(false)
        } else {
            this.player.setVelocityX(0)
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-500)
        }
    }
}
