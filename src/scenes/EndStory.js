// src/scenes/EndStory.js
import { gameState } from '../gameState.js'

export default class EndStory extends Phaser.Scene {
  constructor() {
    super('EndStory')
    this.scrollY = 0
    this.maxScroll = 0
    this.canScroll = false
  }

  create() {
    const { width, height } = this.cameras.main
    
    // Stop all sounds (including background music)
    this.sound.stopAll()
    
    // Play victory clap sound (if sound enabled)
    if (gameState.soundEnabled && this.cache.audio.exists('clapSound')) {
      this.sound.play('clapSound', { volume: 0.8 })
    }
    
    // Calculate responsive sizes
    const padding = Math.min(width * 0.05, 40)
    const contentWidth = width - padding * 2
    const titleSize = Math.min(Math.floor(width * 0.05), 42)
    const textSize = Math.min(Math.floor(width * 0.018), 14)
    
    // Victory green background
    this.cameras.main.setBackgroundColor('#0a1a0f')
    
    // Fixed UI layer
    this.fixedLayer = this.add.container(0, 0).setScrollFactor(0)
    
    // Decorative top border (gold)
    const topBorder = this.add.graphics()
    topBorder.fillStyle(0xd4af37, 1)
    topBorder.fillRect(0, 0, width, 4)
    this.fixedLayer.add(topBorder)
    
    // Create victory particles
    this.createVictoryParticles(width, height)
    
    // Scrollable content container
    this.contentContainer = this.add.container(0, 0)
    
    // Main content background
    const contentBg = this.add.graphics()
    contentBg.fillStyle(0x000000, 0.4)
    contentBg.lineStyle(2, 0xd4af37, 0.4)
    contentBg.fillRoundedRect(padding, padding + 10, contentWidth, height * 1.4, 15)
    contentBg.strokeRoundedRect(padding, padding + 10, contentWidth, height * 1.4, 15)
    this.contentContainer.add(contentBg)
    
    // Track content height
    let currentY = padding + 30
    
    // Victory crown/decoration
    const crown = this.add.text(width / 2, currentY, '👑', {
      fontSize: `${Math.floor(titleSize * 0.8)}px`
    }).setOrigin(0.5, 0).setAlpha(0)
    this.contentContainer.add(crown)
    
    // Floating animation for crown
    this.tweens.add({
      targets: crown,
      y: currentY - 5,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
      delay: 1000
    })
    
    currentY += titleSize + 10
    
    // Victory title with glow
    const titleShadow = this.add.text(width / 2, currentY + 3, '✦ VICTORY ✦', {
      fontSize: `${titleSize}px`,
      fontFamily: '"Sankofa Display", sans-serif',
      color: '#000000',
      fontStyle: 'bold'
    }).setOrigin(0.5, 0).setAlpha(0)
    this.contentContainer.add(titleShadow)
    
    const title = this.add.text(width / 2, currentY, '✦ VICTORY ✦', {
      fontSize: `${titleSize}px`,
      fontFamily: '"Sankofa Display", sans-serif',
      color: '#d4af37',
      fontStyle: 'bold',
      stroke: '#000',
      strokeThickness: 5
    }).setOrigin(0.5, 0).setAlpha(0)
    this.contentContainer.add(title)
    
    currentY += title.height + 15
    
    // Decorative line
    const titleLine = this.add.graphics()
    titleLine.lineStyle(2, 0xd4af37, 0.8)
    titleLine.beginPath()
    titleLine.moveTo(width / 2 - Math.min(120, contentWidth * 0.2), currentY)
    titleLine.lineTo(width / 2 + Math.min(120, contentWidth * 0.2), currentY)
    titleLine.strokePath()
    titleLine.setAlpha(0)
    this.contentContainer.add(titleLine)
    
    currentY += 20
    
    // Story paragraphs - split for better animation
    const storyParagraphs = [
      'You have collected all 4 pieces of the Sacred Mask!',
      'The fragments glow with ancient power as they come together, reforming the legendary artifact.',
      'The mask shines brighter than ever before, its blessing spreading across the land.'
    ]
    
    this.storyTextObjects = []
    storyParagraphs.forEach((para, index) => {
      const text = this.add.text(width / 2, currentY, para, {
        fontSize: `${textSize}px`,
        fontFamily: '"Agbalumo", cursive',
        color: '#ffffff',
        align: 'center',
        wordWrap: { width: contentWidth - 60 },
        lineSpacing: 4
      }).setOrigin(0.5, 0).setAlpha(0)
      this.contentContainer.add(text)
      this.storyTextObjects.push(text)
      currentY += text.height + 15
    })
    
    currentY += 10
    
    // Environment results with icons
    const environments = [
      { icon: '🌅', text: 'The Savannah blooms with life.', color: '#e6ccb2' },
      { icon: '🌿', text: 'The Swamp waters run clear.', color: '#52b788' },
      { icon: '🌲', text: 'The Forest sings with joy.', color: '#2d6a4f' },
      { icon: '⛰️', text: 'The Mountain stands proud.', color: '#a8dadc' }
    ]
    
    this.envCards = []
    const cardWidth = Math.min(contentWidth - 40, 350)
    
    environments.forEach((env, index) => {
      // Card background
      const card = this.add.graphics()
      card.fillStyle(Phaser.Display.Color.HexStringToColor(env.color).color, 0.15)
      card.lineStyle(2, Phaser.Display.Color.HexStringToColor(env.color).color, 0.4)
      card.fillRoundedRect(width / 2 - cardWidth / 2, currentY, cardWidth, 40, 8)
      card.strokeRoundedRect(width / 2 - cardWidth / 2, currentY, cardWidth, 40, 8)
      card.setAlpha(0)
      this.contentContainer.add(card)
      
      // Icon
      const icon = this.add.text(width / 2 - cardWidth / 2 + 30, currentY + 20, env.icon, {
        fontSize: '20px'
      }).setOrigin(0.5).setAlpha(0)
      this.contentContainer.add(icon)
      
      // Text
      const envText = this.add.text(width / 2 + 10, currentY + 20, env.text, {
        fontSize: `${textSize}px`,
        fontFamily: '"Agbalumo", cursive',
        color: env.color
      }).setOrigin(0.5).setAlpha(0)
      this.contentContainer.add(envText)
      
      this.envCards.push({ card, icon, text: envText })
      currentY += 50
    })
    
    currentY += 15
    
    // Final message
    const finalMessages = [
      'The kingdom is united once more.',
      'Peace and prosperity return to the people.',
      'The ancestors smile upon you, brave hero.',
      'Your name will be remembered forever.'
    ]
    
    this.finalTextObjects = []
    finalMessages.forEach((msg, index) => {
      const isLast = index === finalMessages.length - 1
      const text = this.add.text(width / 2, currentY, msg, {
        fontSize: `${textSize + (isLast ? 2 : 0)}px`,
        fontFamily: '"Agbalumo", cursive',
        color: isLast ? '#d4af37' : '#c9a961',
        fontStyle: isLast ? 'bold' : 'normal',
        align: 'center',
        wordWrap: { width: contentWidth - 60 }
      }).setOrigin(0.5, 0).setAlpha(0)
      this.contentContainer.add(text)
      this.finalTextObjects.push(text)
      currentY += text.height + 12
    })
    
    currentY += 25
    
    // Continue button
    const btnWidth = Math.min(200, contentWidth * 0.5)
    const btnHeight = 40
    
    this.continueBtn = this.add.container(width / 2, currentY)
    
    this.btnBg = this.add.graphics()
    this.btnBg.fillStyle(0xd4af37, 1)
    this.btnBg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 8)
    this.continueBtn.add(this.btnBg)
    
    const btnTextSize = Math.min(18, Math.floor(width * 0.022))
    const btnText = this.add.text(0, 0, '▶ VIEW CREDITS', {
      fontSize: `${btnTextSize}px`,
      fontFamily: '"Sankofa Display", sans-serif',
      color: '#1a0f0a',
      fontStyle: 'bold'
    }).setOrigin(0.5)
    this.continueBtn.add(btnText)
    
    this.continueBtn.setAlpha(0)
    this.continueBtn.setSize(btnWidth, btnHeight)
    this.continueBtn.setInteractive({ useHandCursor: true })
    this.contentContainer.add(this.continueBtn)
    
    this.continueBtn.on('pointerover', () => {
      this.tweens.add({ targets: this.continueBtn, scale: 1.1, duration: 150 })
      this.btnBg.clear()
      this.btnBg.fillStyle(0xf4cf67, 1)
      this.btnBg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 8)
    })
    
    this.continueBtn.on('pointerout', () => {
      this.tweens.add({ targets: this.continueBtn, scale: 1, duration: 150 })
      this.btnBg.clear()
      this.btnBg.fillStyle(0xd4af37, 1)
      this.btnBg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 8)
    })
    
    this.continueBtn.on('pointerdown', () => {
      if (this.cache.audio.exists('buttonClick')) {
        this.sound.play('buttonClick')
      }
      this.cameras.main.fadeOut(800, 0, 0, 0)
      this.time.delayedCall(800, () => {
        this.scene.start('Credits')
      })
    })
    
    currentY += btnHeight + 30
    
    // Calculate scroll
    const totalContentHeight = currentY + padding
    this.maxScroll = Math.max(0, totalContentHeight - height + 40)
    this.canScroll = this.maxScroll > 0
    
    // Scroll indicator
    if (this.canScroll) {
      this.scrollIndicator = this.add.text(width / 2, height - 25, '▼ Scroll ▼', {
        fontSize: '12px',
        fontFamily: '"Agbalumo", cursive',
        color: '#d4af37'
      }).setOrigin(0.5).setAlpha(0.7)
      this.fixedLayer.add(this.scrollIndicator)
      
      this.tweens.add({
        targets: this.scrollIndicator,
        y: height - 20,
        alpha: 0.4,
        duration: 800,
        yoyo: true,
        repeat: -1
      })
    }
    
    // Scroll input
    this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY) => {
      if (this.canScroll) {
        this.scrollY = Phaser.Math.Clamp(this.scrollY + deltaY * 0.5, 0, this.maxScroll)
        this.contentContainer.y = -this.scrollY
        this.updateScrollIndicator()
      }
    })
    
    // Touch scrolling
    this.isDragging = false
    this.lastPointerY = 0
    
    this.input.on('pointerdown', (pointer) => {
      if (this.canScroll) {
        this.isDragging = true
        this.lastPointerY = pointer.y
      }
    })
    
    this.input.on('pointermove', (pointer) => {
      if (this.isDragging && this.canScroll) {
        const deltaY = this.lastPointerY - pointer.y
        this.scrollY = Phaser.Math.Clamp(this.scrollY + deltaY, 0, this.maxScroll)
        this.contentContainer.y = -this.scrollY
        this.lastPointerY = pointer.y
        this.updateScrollIndicator()
      }
    })
    
    this.input.on('pointerup', () => {
      this.isDragging = false
    })
    
    // Ensure music is playing
    if (this.cache.audio.exists('bgMusic')) {
      const bgMusic = this.sound.get('bgMusic') || this.sound.add('bgMusic', { loop: true, volume: 0.4 })
      if (!bgMusic.isPlaying) {
        bgMusic.play()
      }
    }
    
    // Start animation sequence
    this.cameras.main.fadeIn(800, 0, 0, 0)
    this.time.delayedCall(500, () => {
      this.animateSequence(crown, title, titleShadow, titleLine)
    })
  }
  
  updateScrollIndicator() {
    if (this.scrollIndicator) {
      const nearBottom = this.scrollY >= this.maxScroll - 20
      this.scrollIndicator.setVisible(!nearBottom)
    }
  }
  
  createVictoryParticles(width, height) {
    // Golden victory sparkles
    for (let i = 0; i < 25; i++) {
      const x = Phaser.Math.Between(30, width - 30)
      const y = Phaser.Math.Between(height, height + 200)
      const size = Phaser.Math.Between(2, 4)
      const particle = this.add.star(x, y, 5, size / 2, size, 0xd4af37, 0.6)
      
      this.tweens.add({
        targets: particle,
        y: -50,
        alpha: 0,
        rotation: Phaser.Math.DegToRad(360),
        duration: Phaser.Math.Between(4000, 8000),
        repeat: -1,
        delay: Phaser.Math.Between(0, 3000)
      })
    }
    
    // Green nature particles
    for (let i = 0; i < 15; i++) {
      const x = Phaser.Math.Between(30, width - 30)
      const y = Phaser.Math.Between(50, height - 50)
      const particle = this.add.circle(x, y, Phaser.Math.Between(1, 2), 0x52b788, 0.4)
      
      this.tweens.add({
        targets: particle,
        y: y - Phaser.Math.Between(40, 80),
        alpha: 0,
        duration: Phaser.Math.Between(3000, 5000),
        repeat: -1,
        delay: Phaser.Math.Between(0, 2000)
      })
    }
  }
  
  animateSequence(crown, title, titleShadow, titleLine) {
    // Animate crown
    this.tweens.add({
      targets: crown,
      alpha: 1,
      duration: 800,
      ease: 'Power2'
    })
    
    // Animate title
    this.tweens.add({
      targets: [title, titleShadow],
      alpha: 1,
      duration: 1000,
      delay: 300,
      ease: 'Power2'
    })
    
    // Title pulse
    this.tweens.add({
      targets: title,
      scale: 1.03,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
      delay: 1500
    })
    
    this.tweens.add({
      targets: titleLine,
      alpha: 1,
      duration: 600,
      delay: 800
    })
    
    // Animate story paragraphs
    this.storyTextObjects.forEach((textObj, index) => {
      this.tweens.add({
        targets: textObj,
        alpha: 1,
        duration: 600,
        delay: 1200 + index * 400,
        ease: 'Power2'
      })
    })
    
    // Animate environment cards
    const storyDelay = 1200 + this.storyTextObjects.length * 400
    
    this.envCards.forEach((env, index) => {
      this.tweens.add({
        targets: [env.card, env.icon, env.text],
        alpha: 1,
        duration: 400,
        delay: storyDelay + index * 200,
        ease: 'Power2'
      })
      
      // Floating icon
      this.tweens.add({
        targets: env.icon,
        y: env.icon.y - 3,
        duration: 1000 + index * 100,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
        delay: storyDelay + 400 + index * 200
      })
    })
    
    // Animate final messages
    const envsDelay = storyDelay + this.envCards.length * 200
    
    this.finalTextObjects.forEach((textObj, index) => {
      this.tweens.add({
        targets: textObj,
        alpha: 1,
        duration: 500,
        delay: envsDelay + 300 + index * 300,
        ease: 'Power2'
      })
    })
    
    // Animate button
    const finalDelay = envsDelay + 300 + this.finalTextObjects.length * 300
    
    this.tweens.add({
      targets: this.continueBtn,
      alpha: 1,
      duration: 600,
      delay: finalDelay + 200,
      ease: 'Back.easeOut',
      onComplete: () => {
        this.tweens.add({
          targets: this.continueBtn,
          scale: 1.05,
          duration: 800,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut'
        })
      }
    })
  }
}
