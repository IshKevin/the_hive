// src/scenes/Tutorial.js
export default class Tutorial extends Phaser.Scene {
    constructor() {
        super('Tutorial')
        this.currentStep = 0
        this.totalSteps = 6
        this.stepCompleted = false
    }

    create() {
        const { width, height } = this.cameras.main
        
        // Dark African-themed background
        this.cameras.main.setBackgroundColor('#1a0f0a')
        
        // Decorative top border
        const topBorder = this.add.graphics()
        topBorder.fillStyle(0xd4af37, 1)
        topBorder.fillRect(0, 0, width, 4)
        
        // Create decorative pattern
        this.createDecorativePattern()
        
        // Title with glow effect
        const titleShadow = this.add.text(width / 2, 42, 'TUTORIAL', {
            fontSize: '42px',
            fontFamily: '"Sankofa Display", sans-serif',
            color: '#000000',
            fontStyle: 'bold'
        }).setOrigin(0.5).setAlpha(0.5)
        
        const title = this.add.text(width / 2, 40, 'TUTORIAL', {
            fontSize: '42px',
            fontFamily: '"Sankofa Display", sans-serif',
            color: '#d4af37',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5)
        
        // Pulse animation for title
        this.tweens.add({
            targets: [title, titleShadow],
            scale: 1.03,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        })
        
        // Decorative line under title
        const titleLine = this.add.graphics()
        titleLine.lineStyle(2, 0xd4af37, 1)
        titleLine.beginPath()
        titleLine.moveTo(width / 2 - 100, 70)
        titleLine.lineTo(width / 2 + 100, 70)
        titleLine.strokePath()
        
        // Step indicator container
        this.stepIndicators = []
        this.createStepIndicators()
        
        // Main instruction panel
        this.instructionBg = this.add.graphics()
        this.instructionBg.fillStyle(0x000000, 0.7)
        this.instructionBg.lineStyle(2, 0xd4af37, 0.5)
        this.instructionBg.fillRoundedRect(50, 90, 700, 100, 10)
        this.instructionBg.strokeRoundedRect(50, 90, 700, 100, 10)
        
        // Instruction text
        this.instructionTitle = this.add.text(width / 2, 115, '', {
            fontSize: '22px',
            fontFamily: '"Sankofa Display", sans-serif',
            color: '#d4af37',
            fontStyle: 'bold'
        }).setOrigin(0.5)
        
        this.instructionText = this.add.text(width / 2, 155, '', {
            fontSize: '16px',
            fontFamily: '"Agbalumo", cursive',
            color: '#ffffff',
            align: 'center',
            lineSpacing: 5
        }).setOrigin(0.5)
        
        // Practice area
        this.createPracticeArea()
        
        // Create player
        this.player = this.physics.add.sprite(400, 320, 'player')
        this.player.setScale(0.35)
        this.player.setCollideWorldBounds(true)
        this.player.body.setAllowGravity(false)
        
        // Idle floating animation for player
        this.tweens.add({
            targets: this.player,
            y: this.player.y - 5,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        })
        
        // Controls
        this.cursors = this.input.keyboard.createCursorKeys()
        
        // Key press indicators
        this.createKeyIndicators()
        
        // Create tutorial elements (enemies, mask pieces)
        this.createTutorialElements()
        
        // Progress tracking
        this.movementTracker = { left: false, right: false, up: false, down: false }
        
        // Navigation buttons
        this.createNavigationButtons()
        
        // Tip box
        this.createTipBox()
        
        // Start first step
        this.showStep(0)
        
        // Fade in
        this.cameras.main.fadeIn(500, 0, 0, 0)
    }
    
    createDecorativePattern() {
        const pattern = this.add.graphics()
        pattern.lineStyle(1, 0xd4af37, 0.1)
        
        // Geometric African-inspired pattern on sides
        for (let i = 0; i < 10; i++) {
            pattern.strokeRect(5 + i * 3, 100 + i * 30, 20, 20)
            pattern.strokeRect(775 - i * 3, 100 + i * 30, 20, 20)
        }
    }
    
    createStepIndicators() {
        const startX = 275
        const y = 78
        
        for (let i = 0; i < this.totalSteps; i++) {
            const circle = this.add.circle(startX + i * 55, y, 10, 0x333333)
            circle.setStrokeStyle(2, 0xd4af37)
            this.stepIndicators.push(circle)
        }
        
        // Step labels
        this.add.text(startX + 2 * 55, y + 20, '', {
            fontSize: '10px',
            color: '#888888'
        }).setOrigin(0.5)
    }
    
    createPracticeArea() {
        // Practice zone background
        const practiceBg = this.add.graphics()
        practiceBg.fillStyle(0x2d1f1a, 0.8)
        practiceBg.lineStyle(3, 0xd4af37, 0.3)
        practiceBg.fillRoundedRect(100, 210, 600, 190, 15)
        practiceBg.strokeRoundedRect(100, 210, 600, 190, 15)
        
        // Grid lines for visual guidance
        const grid = this.add.graphics()
        grid.lineStyle(1, 0xd4af37, 0.1)
        for (let x = 150; x < 700; x += 50) {
            grid.beginPath()
            grid.moveTo(x, 220)
            grid.lineTo(x, 390)
            grid.strokePath()
        }
        for (let y = 240; y < 400; y += 40) {
            grid.beginPath()
            grid.moveTo(110, y)
            grid.lineTo(690, y)
            grid.strokePath()
        }
        
        // Zone label
        this.add.text(400, 225, '🎮 Practice Zone', {
            fontSize: '14px',
            fontFamily: '"Agbalumo", cursive',
            color: '#c9a961',
            fontStyle: 'italic'
        }).setOrigin(0.5)
    }
    
    createKeyIndicators() {
        const centerX = 400
        const y = 420
        
        // Key indicator background
        const keyBg = this.add.graphics()
        keyBg.fillStyle(0x000000, 0.6)
        keyBg.fillRoundedRect(centerX - 120, y - 25, 240, 55, 8)
        
        // Arrow keys visual
        this.keyUp = this.createKeyBox(centerX, y - 15, '▲')
        this.keyLeft = this.createKeyBox(centerX - 35, y + 10, '◄')
        this.keyDown = this.createKeyBox(centerX, y + 10, '▼')
        this.keyRight = this.createKeyBox(centerX + 35, y + 10, '►')
        
        // Key labels
        this.add.text(centerX + 80, y, 'Arrow Keys', {
            fontSize: '12px',
            color: '#888888'
        }).setOrigin(0, 0.5)
    }
    
    createKeyBox(x, y, symbol) {
        const container = this.add.container(x, y)
        
        const box = this.add.graphics()
        box.fillStyle(0x333333, 1)
        box.lineStyle(2, 0x555555, 1)
        box.fillRoundedRect(-12, -10, 24, 20, 4)
        box.strokeRoundedRect(-12, -10, 24, 20, 4)
        container.add(box)
        
        const text = this.add.text(0, 0, symbol, {
            fontSize: '12px',
            color: '#888888'
        }).setOrigin(0.5)
        container.add(text)
        
        container.box = box
        container.text = text
        
        return container
    }
    
    highlightKey(keyContainer, active) {
        keyContainer.box.clear()
        if (active) {
            keyContainer.box.fillStyle(0xd4af37, 1)
            keyContainer.box.lineStyle(2, 0xf4cf67, 1)
            keyContainer.text.setColor('#1a0f0a')
        } else {
            keyContainer.box.fillStyle(0x333333, 1)
            keyContainer.box.lineStyle(2, 0x555555, 1)
            keyContainer.text.setColor('#888888')
        }
        keyContainer.box.fillRoundedRect(-12, -10, 24, 20, 4)
        keyContainer.box.strokeRoundedRect(-12, -10, 24, 20, 4)
    }
    
    createTutorialElements() {
        // Demo mask piece (initially hidden)
        this.demoMask = this.physics.add.sprite(550, 300, 'maskPiece')
        this.demoMask.setScale(0.25)
        this.demoMask.body.setAllowGravity(false)
        this.demoMask.setVisible(false)
        
        // Floating animation for mask
        this.tweens.add({
            targets: this.demoMask,
            y: this.demoMask.y - 10,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        })
        
        // Glow effect for mask
        this.demoMaskGlow = this.add.circle(550, 300, 25, 0xd4af37, 0.3)
        this.demoMaskGlow.setVisible(false)
        this.tweens.add({
            targets: this.demoMaskGlow,
            scale: 1.5,
            alpha: 0,
            duration: 1000,
            repeat: -1
        })
        
        // Demo enemy (initially hidden)
        this.demoEnemy = this.physics.add.sprite(250, 300, 'enemy')
        this.demoEnemy.setScale(0.2)
        this.demoEnemy.setTint(0xff0000)
        this.demoEnemy.body.setAllowGravity(false)
        this.demoEnemy.setVisible(false)
        
        // Enemy patrol animation
        this.enemyTween = this.tweens.add({
            targets: this.demoEnemy,
            x: 350,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
            paused: true
        })
        
        // Warning indicator for enemy
        this.enemyWarning = this.add.text(250, 260, '⚠️ DANGER!', {
            fontSize: '12px',
            color: '#ff4444',
            fontStyle: 'bold'
        }).setOrigin(0.5).setVisible(false)
        
        this.tweens.add({
            targets: this.enemyWarning,
            alpha: 0.5,
            duration: 500,
            yoyo: true,
            repeat: -1
        })
        
        // Collision overlap
        this.physics.add.overlap(this.player, this.demoMask, this.collectDemoMask, null, this)
        
        // Keyboard shortcut display (initially hidden)
        this.keysDisplay = this.add.container(400, 320).setVisible(false)
        
        // Background for keys display
        const keysBg = this.add.graphics()
        keysBg.fillStyle(0x000000, 0.7)
        keysBg.fillRoundedRect(-180, -60, 360, 120, 10)
        keysBg.lineStyle(2, 0xd4af37, 0.5)
        keysBg.strokeRoundedRect(-180, -60, 360, 120, 10)
        this.keysDisplay.add(keysBg)
        
        // Key boxes
        const keyData = [
            { key: 'P', label: 'Pause', x: -120, color: 0x4ade80 },
            { key: 'ESC', label: 'Pause', x: -40, color: 0x4ade80 },
            { key: 'Q', label: 'Quit', x: 40, color: 0xff6b6b },
            { key: 'M', label: 'Sound', x: 120, color: 0xd4af37 }
        ]
        
        keyData.forEach(data => {
            // Key box
            const keyBox = this.add.graphics()
            keyBox.fillStyle(data.color, 1)
            keyBox.fillRoundedRect(data.x - 30, -45, 60, 50, 8)
            keyBox.lineStyle(2, 0xffffff, 0.3)
            keyBox.strokeRoundedRect(data.x - 30, -45, 60, 50, 8)
            this.keysDisplay.add(keyBox)
            
            // Key text
            const keyText = this.add.text(data.x, -25, data.key, {
                fontSize: '20px',
                fontFamily: '"Sankofa Display", sans-serif',
                color: '#1a0f0a',
                fontStyle: 'bold'
            }).setOrigin(0.5)
            this.keysDisplay.add(keyText)
            
            // Label under key
            const labelText = this.add.text(data.x, 25, data.label, {
                fontSize: '12px',
                fontFamily: '"Agbalumo", cursive',
                color: '#ffffff'
            }).setOrigin(0.5)
            this.keysDisplay.add(labelText)
        })
    }
    
    collectDemoMask(player, mask) {
        if (this.currentStep === 3 && mask.visible && !this.stepCompleted) {
            // Celebration effect
            this.tweens.add({
                targets: mask,
                scale: 0,
                alpha: 0,
                duration: 300,
                onComplete: () => {
                    mask.setVisible(false)
                    this.demoMaskGlow.setVisible(false)
                }
            })
            
            // Show success message
            this.showSuccessMessage('🎉 Mask Collected!')
            this.completeStep()
        }
    }
    
    showSuccessMessage(message) {
        const successText = this.add.text(400, 280, message, {
            fontSize: '24px',
            fontFamily: '"Sankofa Display", sans-serif',
            color: '#4ade80',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setAlpha(0)
        
        this.tweens.add({
            targets: successText,
            alpha: 1,
            y: 260,
            duration: 300,
            yoyo: true,
            hold: 800,
            onComplete: () => successText.destroy()
        })
    }
    
    createNavigationButtons() {
        // Skip button (top right corner)
        this.skipBtn = this.add.text(750, 25, 'SKIP ⏭', {
            fontSize: '14px',
            fontFamily: '"Agbalumo", cursive',
            color: '#888888',
            backgroundColor: 'rgba(0,0,0,0.6)',
            padding: { x: 12, y: 6 }
        }).setOrigin(1, 0).setInteractive({ useHandCursor: true })
        
        this.skipBtn.on('pointerover', () => {
            this.skipBtn.setColor('#ff6b6b')
            this.tweens.add({ targets: this.skipBtn, scale: 1.05, duration: 100 })
        })
        this.skipBtn.on('pointerout', () => {
            this.skipBtn.setColor('#888888')
            this.tweens.add({ targets: this.skipBtn, scale: 1, duration: 100 })
        })
        this.skipBtn.on('pointerdown', () => {
            this.cameras.main.fadeOut(500, 0, 0, 0)
            this.time.delayedCall(500, () => this.scene.start('StoryScene'))
        })
        
        // Previous button
        this.prevBtn = this.add.text(150, 470, '◄ PREVIOUS', {
            fontSize: '16px',
            fontFamily: '"Agbalumo", cursive',
            color: '#888888',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: { x: 15, y: 8 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true })
        
        this.prevBtn.on('pointerover', () => {
            if (this.currentStep > 0) {
                this.prevBtn.setColor('#d4af37')
                this.tweens.add({ targets: this.prevBtn, scale: 1.05, duration: 100 })
            }
        })
        this.prevBtn.on('pointerout', () => {
            this.prevBtn.setColor(this.currentStep > 0 ? '#c9a961' : '#888888')
            this.tweens.add({ targets: this.prevBtn, scale: 1, duration: 100 })
        })
        this.prevBtn.on('pointerdown', () => this.prevStep())
        
        // Next button
        this.nextBtn = this.add.text(500, 470, 'NEXT ►', {
            fontSize: '16px',
            fontFamily: '"Agbalumo", cursive',
            color: '#d4af37',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: { x: 15, y: 8 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true })
        
        this.nextBtn.on('pointerover', () => {
            this.nextBtn.setColor('#f4cf67')
            this.tweens.add({ targets: this.nextBtn, scale: 1.05, duration: 100 })
        })
        this.nextBtn.on('pointerout', () => {
            this.nextBtn.setColor('#d4af37')
            this.tweens.add({ targets: this.nextBtn, scale: 1, duration: 100 })
        })
        this.nextBtn.on('pointerdown', () => this.nextStep())
        
        // Back to menu button
        this.backBtn = this.add.text(650, 470, 'MENU', {
            fontSize: '16px',
            fontFamily: '"Agbalumo", cursive',
            color: '#c9a961',
            backgroundColor: 'rgba(0,0,0,0.7)',
            padding: { x: 20, y: 8 },
            stroke: '#d4af37',
            strokeThickness: 1
        }).setOrigin(0.5).setInteractive({ useHandCursor: true })
        
        this.backBtn.on('pointerover', () => {
            this.backBtn.setColor('#f4cf67')
            this.tweens.add({ targets: this.backBtn, scale: 1.05, duration: 100 })
        })
        this.backBtn.on('pointerout', () => {
            this.backBtn.setColor('#c9a961')
            this.tweens.add({ targets: this.backBtn, scale: 1, duration: 100 })
        })
        this.backBtn.on('pointerdown', () => {
            this.cameras.main.fadeOut(500, 0, 0, 0)
            this.time.delayedCall(500, () => this.scene.start('MainMenu'))
        })
        
        // End screen buttons (hidden initially)
        this.createEndButtons()
    }
    
    createEndButtons() {
        const { width, height } = this.cameras.main
        
        // Container for end buttons (hidden initially)
        this.endButtonsContainer = this.add.container(width / 2, height / 2 + 50).setAlpha(0).setVisible(false)
        
        // Semi-transparent background
        const endBg = this.add.graphics()
        endBg.fillStyle(0x000000, 0.85)
        endBg.fillRoundedRect(-200, -80, 400, 160, 15)
        endBg.lineStyle(3, 0xd4af37, 1)
        endBg.strokeRoundedRect(-200, -80, 400, 160, 15)
        this.endButtonsContainer.add(endBg)
        
        // Congratulations text
        const congratsText = this.add.text(0, -55, '🎉 Tutorial Complete! 🎉', {
            fontSize: '22px',
            fontFamily: '"Sankofa Display", sans-serif',
            color: '#d4af37',
            fontStyle: 'bold'
        }).setOrigin(0.5)
        this.endButtonsContainer.add(congratsText)
        
        // Start Game button
        const startBtnBg = this.add.graphics()
        startBtnBg.fillStyle(0x4ade80, 1)
        startBtnBg.fillRoundedRect(-170, -15, 160, 45, 10)
        this.endButtonsContainer.add(startBtnBg)
        
        const startBtnText = this.add.text(-90, 7, '▶ START GAME', {
            fontSize: '16px',
            fontFamily: '"Sankofa Display", sans-serif',
            color: '#1a0f0a',
            fontStyle: 'bold'
        }).setOrigin(0.5)
        this.endButtonsContainer.add(startBtnText)
        
        // Start button hitbox
        const startBtnHitbox = this.add.rectangle(-90, 7, 160, 45, 0x000000, 0)
            .setInteractive({ useHandCursor: true })
        this.endButtonsContainer.add(startBtnHitbox)
        
        startBtnHitbox.on('pointerover', () => {
            startBtnBg.clear()
            startBtnBg.fillStyle(0x6ee7a0, 1)
            startBtnBg.fillRoundedRect(-170, -15, 160, 45, 10)
        })
        startBtnHitbox.on('pointerout', () => {
            startBtnBg.clear()
            startBtnBg.fillStyle(0x4ade80, 1)
            startBtnBg.fillRoundedRect(-170, -15, 160, 45, 10)
        })
        startBtnHitbox.on('pointerdown', () => {
            this.cameras.main.fadeOut(500, 0, 0, 0)
            this.time.delayedCall(500, () => this.scene.start('StoryScene'))
        })
        
        // Main Menu button
        const menuBtnBg = this.add.graphics()
        menuBtnBg.fillStyle(0xd4af37, 1)
        menuBtnBg.fillRoundedRect(10, -15, 160, 45, 10)
        this.endButtonsContainer.add(menuBtnBg)
        
        const menuBtnText = this.add.text(90, 7, '🏠 MAIN MENU', {
            fontSize: '16px',
            fontFamily: '"Sankofa Display", sans-serif',
            color: '#1a0f0a',
            fontStyle: 'bold'
        }).setOrigin(0.5)
        this.endButtonsContainer.add(menuBtnText)
        
        // Menu button hitbox
        const menuBtnHitbox = this.add.rectangle(90, 7, 160, 45, 0x000000, 0)
            .setInteractive({ useHandCursor: true })
        this.endButtonsContainer.add(menuBtnHitbox)
        
        menuBtnHitbox.on('pointerover', () => {
            menuBtnBg.clear()
            menuBtnBg.fillStyle(0xf4cf67, 1)
            menuBtnBg.fillRoundedRect(10, -15, 160, 45, 10)
        })
        menuBtnHitbox.on('pointerout', () => {
            menuBtnBg.clear()
            menuBtnBg.fillStyle(0xd4af37, 1)
            menuBtnBg.fillRoundedRect(10, -15, 160, 45, 10)
        })
        menuBtnHitbox.on('pointerdown', () => {
            this.cameras.main.fadeOut(500, 0, 0, 0)
            this.time.delayedCall(500, () => this.scene.start('MainMenu'))
        })
        
        // Tip at bottom
        const tipText = this.add.text(0, 55, 'Press any button to continue', {
            fontSize: '12px',
            fontFamily: '"Agbalumo", cursive',
            color: '#888888'
        }).setOrigin(0.5)
        this.endButtonsContainer.add(tipText)
    }
    
    showEndScreen() {
        // Hide regular navigation buttons
        this.prevBtn.setVisible(false)
        this.nextBtn.setVisible(false)
        this.backBtn.setVisible(false)
        this.skipBtn.setVisible(false)
        this.tipBg.setVisible(false)
        this.tipText.setVisible(false)
        
        // Show and animate end buttons
        this.endButtonsContainer.setVisible(true)
        this.endButtonsContainer.setDepth(100)
        
        this.tweens.add({
            targets: this.endButtonsContainer,
            alpha: 1,
            scale: { from: 0.8, to: 1 },
            duration: 400,
            ease: 'Back.easeOut'
        })
    }
    
    createTipBox() {
        this.tipBg = this.add.graphics()
        this.tipBg.fillStyle(0x1a3d1a, 0.8)
        this.tipBg.lineStyle(2, 0x4ade80, 0.5)
        this.tipBg.fillRoundedRect(550, 410, 200, 45, 8)
        this.tipBg.strokeRoundedRect(550, 410, 200, 45, 8)
        
        this.tipText = this.add.text(650, 432, '💡 Try it now!', {
            fontSize: '14px',
            fontFamily: '"Agbalumo", cursive',
            color: '#4ade80',
            align: 'center'
        }).setOrigin(0.5)
        
        this.tweens.add({
            targets: [this.tipBg, this.tipText],
            alpha: 0.7,
            duration: 800,
            yoyo: true,
            repeat: -1
        })
    }
    
    showStep(stepIndex) {
        this.currentStep = stepIndex
        this.stepCompleted = false
        
        // Reset movement tracker for each step
        this.movementTracker = { left: false, right: false, up: false, down: false }
        this.diagonalMoved = false
        
        // Reset Next button styling
        this.resetNextButton()
        
        // Update step indicators
        this.stepIndicators.forEach((indicator, i) => {
            indicator.setFillStyle(i < stepIndex ? 0x4ade80 : (i === stepIndex ? 0xd4af37 : 0x333333))
        })
        
        // Update navigation buttons
        this.prevBtn.setColor(stepIndex > 0 ? '#c9a961' : '#555555')
        this.nextBtn.setText(stepIndex >= this.totalSteps - 1 ? 'START GAME ►' : 'NEXT ►')
        
        // Hide all tutorial elements first
        this.demoMask.setVisible(false)
        this.demoMaskGlow.setVisible(false)
        this.demoEnemy.setVisible(false)
        this.enemyWarning.setVisible(false)
        this.keysDisplay.setVisible(false)
        this.enemyTween.pause()
        
        // Reset player position with animation
        this.tweens.add({
            targets: this.player,
            x: 400,
            y: 320,
            duration: 300,
            ease: 'Power2'
        })
        
        const steps = [
            {
                title: '🎯 Step 1: Basic Movement',
                text: 'Use the ARROW KEYS to move your character.\nTry moving in all 4 directions: UP, DOWN, LEFT, RIGHT',
                tip: '💡 Move in all directions!'
            },
            {
                title: '🏃 Step 2: Master Movement',
                text: 'Great! Now try moving diagonally by pressing TWO arrow keys at once.\nExplore the entire practice area!',
                tip: '💡 Press 2 keys together!'
            },
            {
                title: '⚠️ Step 3: Avoid Enemies',
                text: 'RED enemies will hurt you! They patrol the world.\nStay away from them to survive!',
                tip: '💡 Keep your distance!',
                showEnemy: true
            },
            {
                title: '✨ Step 4: Collect Masks',
                text: 'GOLDEN MASK pieces are your goal! Touch them to collect.\nMove to the glowing mask on the right!',
                tip: '💡 Collect the mask!',
                showMask: true
            },
            {
                title: '⌨️ Step 5: Keyboard Shortcuts',
                text: '[P] or [ESC] = Pause/Resume game\n[Q] = Quit to menu (when paused)  •  [M] = Toggle sound',
                tip: '💡 Try pressing P!',
                showKeys: true
            },
            {
                title: '🌍 Step 6: Explore the World',
                text: 'The kingdom has 4 environments: Savannah, Swamp, Forest, Mountain.\nFind all 4 mask pieces scattered across the lands!',
                tip: '🎮 Ready to play!'
            }
        ]
        
        const step = steps[stepIndex]
        
        // Animate instruction text
        this.instructionTitle.setText('')
        this.instructionText.setText('')
        
        this.time.delayedCall(100, () => {
            this.typewriterEffect(this.instructionTitle, step.title, 30)
            this.time.delayedCall(step.title.length * 30, () => {
                this.typewriterEffect(this.instructionText, step.text, 15)
            })
        })
        
        this.tipText.setText(step.tip)
        
        // Show step-specific elements
        if (step.showEnemy) {
            this.demoEnemy.setVisible(true)
            this.demoEnemy.setPosition(250, 300)
            this.enemyWarning.setVisible(true)
            this.enemyTween.resume()
        }
        
        if (step.showMask) {
            this.demoMask.setVisible(true)
            this.demoMask.setScale(0.25)
            this.demoMask.setAlpha(1)
            this.demoMask.setPosition(550, 300)
            this.demoMaskGlow.setVisible(true)
            this.demoMaskGlow.setPosition(550, 300)
        }
        
        if (step.showKeys) {
            this.keysDisplay.setVisible(true)
            // Animate the keys appearing
            this.keysDisplay.setAlpha(0)
            this.keysDisplay.setScale(0.8)
            this.tweens.add({
                targets: this.keysDisplay,
                alpha: 1,
                scale: 1,
                duration: 400,
                ease: 'Back.easeOut'
            })
            
            // Auto-complete this step after viewing
            this.time.delayedCall(2000, () => {
                if (this.currentStep === 4 && !this.stepCompleted) {
                    this.showSuccessMessage('✓ Shortcuts Learned!')
                    this.completeStep()
                }
            })
        }
    }
    
    typewriterEffect(textObject, fullText, delay) {
        let index = 0
        const timer = this.time.addEvent({
            delay: delay,
            repeat: fullText.length - 1,
            callback: () => {
                textObject.setText(fullText.substring(0, ++index))
            }
        })
    }
    
    updateStepIndicator(stepIndex, completed) {
        if (completed) {
            this.stepIndicators[stepIndex].setFillStyle(0x4ade80)
            
            // Add checkmark effect
            this.tweens.add({
                targets: this.stepIndicators[stepIndex],
                scale: 1.3,
                duration: 200,
                yoyo: true
            })
        }
    }
    
    completeStep() {
        if (this.stepCompleted) return
        
        this.stepCompleted = true
        this.updateStepIndicator(this.currentStep, true)
        
        // Highlight Next button
        this.nextBtn.setBackgroundColor('#d4af37')
        this.nextBtn.setColor('#1a0f0a')
        this.nextBtn.setFontSize('20px')
        
        // Pulsing animation on Next button
        if (this.nextBtnTween) this.nextBtnTween.stop()
        this.nextBtnTween = this.tweens.add({
            targets: this.nextBtn,
            scale: 1.15,
            duration: 400,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        })
        
        // Auto-advance after delay
        this.time.delayedCall(2000, () => {
            if (this.stepCompleted && this.currentStep < this.totalSteps - 1) {
                this.nextStep()
            }
        })
    }
    
    resetNextButton() {
        if (this.nextBtnTween) {
            this.nextBtnTween.stop()
            this.nextBtnTween = null
        }
        this.nextBtn.setScale(1)
        this.nextBtn.setBackgroundColor('rgba(0,0,0,0.5)')
        this.nextBtn.setColor('#d4af37')
        this.nextBtn.setFontSize('16px')
    }
    
    nextStep() {
        if (this.currentStep < this.totalSteps - 1) {
            this.showStep(this.currentStep + 1)
        } else {
            // Show end screen with options
            this.showEndScreen()
        }
    }
    
    prevStep() {
        if (this.currentStep > 0) {
            this.showStep(this.currentStep - 1)
        }
    }

    update() {
        const speed = 200
        let vx = 0
        let vy = 0

        // Track movement for step completion
        if (this.cursors.left.isDown) {
            vx = -speed
            this.player.setFlipX(true)
            this.highlightKey(this.keyLeft, true)
            this.movementTracker.left = true
        } else {
            this.highlightKey(this.keyLeft, false)
        }
        
        if (this.cursors.right.isDown) {
            vx = speed
            this.player.setFlipX(false)
            this.highlightKey(this.keyRight, true)
            this.movementTracker.right = true
        } else {
            this.highlightKey(this.keyRight, false)
        }

        if (this.cursors.up.isDown) {
            vy = -speed
            this.highlightKey(this.keyUp, true)
            this.movementTracker.up = true
        } else {
            this.highlightKey(this.keyUp, false)
        }
        
        if (this.cursors.down.isDown) {
            vy = speed
            this.highlightKey(this.keyDown, true)
            this.movementTracker.down = true
        } else {
            this.highlightKey(this.keyDown, false)
        }

        this.player.setVelocity(vx, vy)
        
        // Constrain player to practice area
        this.player.x = Phaser.Math.Clamp(this.player.x, 120, 680)
        this.player.y = Phaser.Math.Clamp(this.player.y, 230, 380)
        
        // Check step 1 completion (all directions used)
        if (this.currentStep === 0 && !this.stepCompleted) {
            if (this.movementTracker.left && this.movementTracker.right && 
                this.movementTracker.up && this.movementTracker.down) {
                this.showSuccessMessage('✓ Movement Mastered!')
                this.completeStep()
            }
        }
        
        // Check step 2 completion (diagonal movement)
        if (this.currentStep === 1 && !this.stepCompleted) {
            if ((this.cursors.left.isDown || this.cursors.right.isDown) && 
                (this.cursors.up.isDown || this.cursors.down.isDown)) {
                this.diagonalMoved = true
            }
            if (this.diagonalMoved) {
                this.showSuccessMessage('✓ Diagonal Movement!')
                this.completeStep()
            }
        }
        
        // Check step 3 completion (observe enemy for 3 seconds)
        if (this.currentStep === 2 && !this.stepCompleted) {
            if (!this.enemyObserveTimer) {
                this.enemyObserveTimer = this.time.delayedCall(3000, () => {
                    if (this.currentStep === 2 && !this.stepCompleted) {
                        this.showSuccessMessage('✓ Enemy Spotted!')
                        this.completeStep()
                    }
                })
            }
        } else {
            if (this.enemyObserveTimer) {
                this.enemyObserveTimer.destroy()
                this.enemyObserveTimer = null
            }
        }
        
        // Step 4 (mask collection) is handled in collectDemoMask
        
        // Check step 5 completion (auto-complete after reading)
        if (this.currentStep === 4 && !this.stepCompleted) {
            if (!this.finalStepTimer) {
                this.finalStepTimer = this.time.delayedCall(3000, () => {
                    if (this.currentStep === 4 && !this.stepCompleted) {
                        this.showSuccessMessage('🎮 Ready to Play!')
                        this.completeStep()
                    }
                })
            }
        } else {
            if (this.finalStepTimer) {
                this.finalStepTimer.destroy()
                this.finalStepTimer = null
            }
        }
        
        // Update enemy warning position
        if (this.demoEnemy.visible) {
            this.enemyWarning.setPosition(this.demoEnemy.x, this.demoEnemy.y - 40)
        }
        
        // Update mask glow position
        if (this.demoMask.visible && this.demoMaskGlow.visible) {
            this.demoMaskGlow.setPosition(this.demoMask.x, this.demoMask.y)
        }
    }
}
