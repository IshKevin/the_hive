export default class Tutorial extends Phaser.Scene {
    constructor() {
        super('Tutorial')
    }

    create() {
        this.cameras.main.setBackgroundColor('#1a0f0a')

        this.add.text(400, 50, 'HOW TO PLAY', {
            fontSize: '36px',
            color: '#d4af37',
            fontStyle: 'bold',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5)

        // Instructions
        const instructions = `⬅️ LEFT ARROW - Move Left
➡️ RIGHT ARROW - Move Right
⬆️ UP ARROW - Jump

🎯 OBJECTIVE:
Collect all 4 mask pieces from different environments

💡 TIP:
Use platforms to reach higher areas
Press R to restart if you get stuck

Try moving around below!`

        this.add.text(400, 180, instructions, {
            fontSize: '16px',
            color: '#ffffff',
            align: 'center',
            lineSpacing: 8
        }).setOrigin(0.5)

        // Add static ground for tutorial
        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(400, 400, 'ground').setScale(2, 1).refreshBody()
        this.platforms.create(600, 250, 'ground').setScale(0.5, 1).refreshBody()

        // Add Player for practice - SMALLER SIZE
        this.player = this.physics.add.sprite(100, 300, 'player')
        this.player.setScale(0.3) // Match game scene size
        this.player.setCollideWorldBounds(true)
        this.player.setBounce(0.1)

        this.physics.add.collider(this.player, this.platforms)

        // Controls
        this.cursors = this.input.keyboard.createCursorKeys()

        const backBtn = this.add.text(400, 430, 'BACK TO MENU', {
            fontSize: '20px',
            color: '#d4af37',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive()

        backBtn.on('pointerover', () => {
            backBtn.setScale(1.1)
        })

        backBtn.on('pointerout', () => {
            backBtn.setScale(1)
        })

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
