// src/scenes/EndStory.js
import { gameState } from '../gameState.js'

export default class EndStory extends Phaser.Scene {
  constructor() {
    super('EndStory')
  }

  create() {
    const { width, height } = this.cameras.main
    
    // Stop all sounds (including background music)
    this.sound.stopAll()
    
    // Play victory clap sound (if sound enabled)
    if (gameState.soundEnabled && this.cache.audio.exists('clapSound')) {
      this.sound.play('clapSound', { volume: 0.8 })
    }
    
    // Victory dark green background
    this.cameras.main.setBackgroundColor('#0a1a0f')
    
    // Create victory particles
    this.createVictoryParticles(width, height)
    
    // Decorative top border (gold)
    const topBorder = this.add.graphics()
    topBorder.fillStyle(0xd4af37, 1)
    topBorder.fillRect(0, 0, width, 4)
    
    // Victory crown/decoration
    const crown = this.add.text(width / 2, 30, '👑', {
      fontSize: '36px'
    }).setOrigin(0.5).setAlpha(0)
    
    // Victory title
    const title = this.add.text(width / 2, 70, '✦ VICTORY ✦', {
      fontSize: '42px',
      fontFamily: '"Sankofa Display", sans-serif',
      color: '#d4af37',
      fontStyle: 'bold',
      stroke: '#000',
      strokeThickness: 5
    }).setOrigin(0.5).setAlpha(0)
    
    // Decorative line under title
    const titleLine = this.add.graphics()
    titleLine.lineStyle(2, 0xd4af37, 0.8)
    titleLine.beginPath()
    titleLine.moveTo(width / 2 - 100, 100)
    titleLine.lineTo(width / 2 + 100, 100)
    titleLine.strokePath()
    titleLine.setAlpha(0)
    
    // THE FINAL MASK - Main feature!
    const finalMask = this.add.image(width / 2, height / 2 - 20, 'finalMask')
    finalMask.setScale(0.4)
    finalMask.setAlpha(0)
    
    // Glow effect behind mask
    const maskGlow = this.add.graphics()
    maskGlow.fillStyle(0xd4af37, 0.3)
    maskGlow.fillCircle(width / 2, height / 2 - 20, 120)
    maskGlow.setAlpha(0)
    
    // Subtitle under mask
    const subtitle = this.add.text(width / 2, height / 2 + 130, 'The Sacred Mask is Complete!', {
      fontSize: '22px',
      fontFamily: '"Agbalumo", cursive',
      color: '#d4af37',
      fontStyle: 'bold'
    }).setOrigin(0.5).setAlpha(0)
    
    // Short message
    const message = this.add.text(width / 2, height / 2 + 165, 'The kingdom is restored. Peace returns to the land.', {
      fontSize: '16px',
      fontFamily: '"Agbalumo", cursive',
      color: '#c9a961',
      align: 'center'
    }).setOrigin(0.5).setAlpha(0)
    
    // Continue button
    const btnWidth = 180
    const btnHeight = 45
    
    const continueBtn = this.add.container(width / 2, height - 60)
    
    const btnBg = this.add.graphics()
    btnBg.fillStyle(0xd4af37, 1)
    btnBg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 10)
    continueBtn.add(btnBg)
    
    const btnText = this.add.text(0, 0, '▶ VIEW CREDITS', {
      fontSize: '18px',
      fontFamily: '"Sankofa Display", sans-serif',
      color: '#1a0f0a',
      fontStyle: 'bold'
    }).setOrigin(0.5)
    continueBtn.add(btnText)
    
    continueBtn.setAlpha(0)
    continueBtn.setSize(btnWidth, btnHeight)
    continueBtn.setInteractive({ useHandCursor: true })
    
    continueBtn.on('pointerover', () => {
      this.tweens.add({ targets: continueBtn, scale: 1.1, duration: 150 })
      btnBg.clear()
      btnBg.fillStyle(0xf4cf67, 1)
      btnBg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 10)
    })
    
    continueBtn.on('pointerout', () => {
      this.tweens.add({ targets: continueBtn, scale: 1, duration: 150 })
      btnBg.clear()
      btnBg.fillStyle(0xd4af37, 1)
      btnBg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 10)
    })
    
    continueBtn.on('pointerdown', () => {
      if (gameState.soundEnabled && this.cache.audio.exists('buttonClick')) {
        this.sound.play('buttonClick')
      }
      this.cameras.main.fadeOut(800, 0, 0, 0)
      this.time.delayedCall(800, () => {
        this.scene.start('Credits')
      })
    })
    
    // Fade in
    this.cameras.main.fadeIn(800, 0, 0, 0)
    
    // Animation sequence
    this.time.delayedCall(300, () => {
      // Crown appears
      this.tweens.add({
        targets: crown,
        alpha: 1,
        duration: 600,
        ease: 'Power2'
      })
      
      // Floating crown animation
      this.tweens.add({
        targets: crown,
        y: 25,
        duration: 1500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
        delay: 600
      })
    })
    
    this.time.delayedCall(600, () => {
      // Title appears
      this.tweens.add({
        targets: title,
        alpha: 1,
        duration: 800,
        ease: 'Power2'
      })
      
      this.tweens.add({
        targets: titleLine,
        alpha: 1,
        duration: 600,
        delay: 200
      })
    })
    
    this.time.delayedCall(1200, () => {
      // Mask glow appears first
      this.tweens.add({
        targets: maskGlow,
        alpha: 1,
        duration: 600
      })
      
      // Pulsing glow
      this.tweens.add({
        targets: maskGlow,
        alpha: 0.5,
        duration: 1500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
        delay: 800
      })
    })
    
    this.time.delayedCall(1500, () => {
      // Final mask appears with dramatic effect
      this.tweens.add({
        targets: finalMask,
        alpha: 1,
        scale: 0.45,
        duration: 1000,
        ease: 'Back.easeOut'
      })
      
      // Floating mask animation
      this.tweens.add({
        targets: finalMask,
        y: height / 2 - 30,
        duration: 2000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
        delay: 1200
      })
    })
    
    this.time.delayedCall(2500, () => {
      // Subtitle and message
      this.tweens.add({
        targets: subtitle,
        alpha: 1,
        duration: 600,
        ease: 'Power2'
      })
      
      this.tweens.add({
        targets: message,
        alpha: 1,
        duration: 600,
        delay: 300,
        ease: 'Power2'
      })
    })
    
    this.time.delayedCall(3500, () => {
      // Button appears
      this.tweens.add({
        targets: continueBtn,
        alpha: 1,
        duration: 600,
        ease: 'Back.easeOut'
      })
      
      // Button pulse
      this.tweens.add({
        targets: continueBtn,
        scale: 1.05,
        duration: 800,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
        delay: 800
      })
    })
  }
  
  createVictoryParticles(width, height) {
    // Golden victory sparkles
    for (let i = 0; i < 20; i++) {
      const x = Phaser.Math.Between(30, width - 30)
      const y = Phaser.Math.Between(height, height + 150)
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
    for (let i = 0; i < 10; i++) {
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
}
