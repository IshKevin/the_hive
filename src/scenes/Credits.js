// src/scenes/Credits.js
export default class Credits extends Phaser.Scene {
  constructor() {
    super('Credits')
  }

  create() {
    const { width, height } = this.cameras.main
    
    // Dark cinematic background
    this.cameras.main.setBackgroundColor('#050508')
    
    // Create ambient particles
    this.createParticles(width, height)
    
    // Fixed UI layer
    this.fixedLayer = this.add.container(0, 0).setScrollFactor(0)
    
    // Decorative top border with gradient effect
    const topBorder = this.add.graphics()
    topBorder.fillGradientStyle(0xd4af37, 0xf4cf67, 0xd4af37, 0xf4cf67, 1, 1, 1, 1)
    topBorder.fillRect(0, 0, width, 5)
    this.fixedLayer.add(topBorder)
    
    // Side decorations
    this.createSideDecorations(width, height)
    
    // Scrolling credits container
    this.creditsContainer = this.add.container(0, height)
    
    // Build credits content
    let currentY = 0
    
    // === MAIN TITLE ===
    currentY = this.addCreditsSection(currentY, width, [
      { type: 'studio', text: 'THE HIVE GROUP' },
      { type: 'presents', text: 'PRESENTS' }
    ])
    
    currentY += 40
    
    // === GAME TITLE ===
    currentY = this.addCreditsSection(currentY, width, [
      { type: 'game-title', text: 'THE HIVE' },
      { type: 'tagline', text: '~ A Traditional African Kingdom Adventure ~' }
    ])
    
    currentY += 60
    
    // === DEVELOPMENT TEAM ===
    currentY = this.addSectionTitle(currentY, width, '✦ DEVELOPMENT TEAM ✦')
    currentY += 10
    
    // Lead Developer
    currentY = this.addTeamMember(currentY, width, {
      name: 'NIYOKWIZERA JEAN D\'AMOUR',
      role: 'Lead Developer',
      icon: '👨‍💻',
      color: '#4ade80'
    })
    
    // Game Developer & Controller
    currentY = this.addTeamMember(currentY, width, {
      name: 'ISHIMWE KEVIN',
      role: 'Game Developer & Controller',
      icon: '🎮',
      color: '#60a5fa'
    })
    
    currentY += 30
    
    // === CREATIVE TEAM ===
    currentY = this.addSectionTitle(currentY, width, '✦ CREATIVE TEAM ✦')
    currentY += 10
    
    // Creative Director
    currentY = this.addTeamMember(currentY, width, {
      name: 'KAMARA JOSHUA',
      role: 'Creative Direction & Character Design',
      icon: '🎨',
      color: '#f472b6'
    })
    
    // Project Manager
    currentY = this.addTeamMember(currentY, width, {
      name: 'OTABOR EGHAREVBA',
      role: 'Project Manager, Animator & Background Designer',
      icon: '🎬',
      color: '#fbbf24'
    })
    
    currentY += 30
    
    // === AUDIO & INNOVATION ===
    currentY = this.addSectionTitle(currentY, width, '✦ AUDIO & INNOVATION ✦')
    currentY += 10
    
    // Music & Innovation
    currentY = this.addTeamMember(currentY, width, {
      name: 'DUSHIME ARIANE',
      role: 'Music Composer & Innovator',
      icon: '🎵',
      color: '#a78bfa'
    })
    
    currentY += 50
    
    // === TECHNOLOGIES ===
    currentY = this.addSectionTitle(currentY, width, '✦ BUILT WITH ✦')
    currentY += 10
    
    const techItems = [
      { text: 'Phaser 3 Game Framework', icon: '⚡' },
      { text: 'JavaScript / HTML5 / CSS3', icon: '💻' },
      { text: 'Web Audio API', icon: '🔊' }
    ]
    
    techItems.forEach(tech => {
      const techText = this.add.text(width / 2, currentY, `${tech.icon}  ${tech.text}`, {
        fontSize: '14px',
        fontFamily: '"Agbalumo", cursive',
        color: '#888888'
      }).setOrigin(0.5)
      this.creditsContainer.add(techText)
      currentY += 28
    })
    
    currentY += 40
    
    // === INSPIRATION ===
    currentY = this.addSectionTitle(currentY, width, '✦ INSPIRED BY ✦')
    currentY += 10
    
    const inspirationItems = [
      'The Rich Heritage of African Kingdoms',
      'Traditional African Folklore & Mythology',
      'The Spirit of Unity & Community'
    ]
    
    inspirationItems.forEach(item => {
      const inspText = this.add.text(width / 2, currentY, item, {
        fontSize: '13px',
        fontFamily: '"Agbalumo", cursive',
        color: '#c9a961',
        fontStyle: 'italic'
      }).setOrigin(0.5)
      this.creditsContainer.add(inspText)
      currentY += 26
    })
    
    currentY += 50
    
    // === SPECIAL THANKS ===
    currentY = this.addSectionTitle(currentY, width, '✦ SPECIAL THANKS ✦')
    currentY += 10
    
    const thanksItems = [
      'To all players who embarked on this quest',
      'To the ancestors who inspire these stories',
      'To Africa, the cradle of civilization',
      'To our families for their endless support'
    ]
    
    thanksItems.forEach(item => {
      const thankText = this.add.text(width / 2, currentY, item, {
        fontSize: '12px',
        fontFamily: '"Agbalumo", cursive',
        color: '#777777'
      }).setOrigin(0.5)
      this.creditsContainer.add(thankText)
      currentY += 24
    })
    
    currentY += 60
    
    // === FINAL MESSAGE ===
    const finalBg = this.add.graphics()
    finalBg.fillStyle(0xd4af37, 0.1)
    finalBg.fillRoundedRect(width / 2 - 180, currentY - 10, 360, 80, 10)
    this.creditsContainer.add(finalBg)
    
    const finalMsg = this.add.text(width / 2, currentY + 15, '🎭 Thank You For Playing! 🎭', {
      fontSize: '24px',
      fontFamily: '"Sankofa Display", sans-serif',
      color: '#d4af37',
      fontStyle: 'bold'
    }).setOrigin(0.5)
    this.creditsContainer.add(finalMsg)
    
    const subMsg = this.add.text(width / 2, currentY + 50, 'May your journey continue...', {
      fontSize: '14px',
      fontFamily: '"Agbalumo", cursive',
      color: '#c9a961',
      fontStyle: 'italic'
    }).setOrigin(0.5)
    this.creditsContainer.add(subMsg)
    
    currentY += 100
    
    // === COPYRIGHT ===
    const copyright1 = this.add.text(width / 2, currentY, '© 2026 The Hive Group', {
      fontSize: '14px',
      fontFamily: '"Sankofa Display", sans-serif',
      color: '#d4af37'
    }).setOrigin(0.5)
    this.creditsContainer.add(copyright1)
    currentY += 22
    
    const copyright2 = this.add.text(width / 2, currentY, 'All Rights Reserved', {
      fontSize: '11px',
      fontFamily: '"Agbalumo", cursive',
      color: '#555555'
    }).setOrigin(0.5)
    this.creditsContainer.add(copyright2)
    currentY += 80
    
    // Total height of credits
    this.totalCreditsHeight = currentY
    
    // Auto-scroll settings
    this.scrollSpeed = 35
    this.isScrolling = true
    this.scrollY = 0
    
    // Bottom UI
    this.createBottomUI(width, height)
    
    // Input handlers
    this.setupInputHandlers(width, height)
    
    // Fade in
    this.cameras.main.fadeIn(800, 0, 0, 0)
  }
  
  addCreditsSection(startY, width, items) {
    let y = startY
    
    items.forEach(item => {
      let textObj
      
      switch(item.type) {
        case 'logo':
          textObj = this.add.text(width / 2, y, item.emoji, {
            fontSize: '50px'
          }).setOrigin(0.5)
          y += 60
          break
          
        case 'studio':
          textObj = this.add.text(width / 2, y, item.text, {
            fontSize: '28px',
            fontFamily: '"Sankofa Display", sans-serif',
            color: '#d4af37',
            fontStyle: 'bold',
            letterSpacing: 8
          }).setOrigin(0.5)
          y += 35
          break
          
        case 'presents':
          textObj = this.add.text(width / 2, y, item.text, {
            fontSize: '12px',
            fontFamily: '"Agbalumo", cursive',
            color: '#888888',
            letterSpacing: 4
          }).setOrigin(0.5)
          y += 25
          break
          
        case 'game-title':
          // Glow effect
          const glow = this.add.text(width / 2, y, item.text, {
            fontSize: '48px',
            fontFamily: '"Sankofa Display", sans-serif',
            color: '#d4af37'
          }).setOrigin(0.5).setAlpha(0.3).setBlendMode(Phaser.BlendModes.ADD)
          this.creditsContainer.add(glow)
          
          textObj = this.add.text(width / 2, y, item.text, {
            fontSize: '48px',
            fontFamily: '"Sankofa Display", sans-serif',
            color: '#ffffff',
            fontStyle: 'bold',
            stroke: '#d4af37',
            strokeThickness: 2
          }).setOrigin(0.5)
          y += 55
          break
          
        case 'tagline':
          textObj = this.add.text(width / 2, y, item.text, {
            fontSize: '14px',
            fontFamily: '"Agbalumo", cursive',
            color: '#c9a961',
            fontStyle: 'italic'
          }).setOrigin(0.5)
          y += 25
          break
      }
      
      if (textObj) this.creditsContainer.add(textObj)
    })
    
    return y
  }
  
  addSectionTitle(startY, width, title) {
    // Decorative line left
    const lineLeft = this.add.graphics()
    lineLeft.lineStyle(1, 0xd4af37, 0.5)
    lineLeft.beginPath()
    lineLeft.moveTo(width / 2 - 180, startY + 10)
    lineLeft.lineTo(width / 2 - 80, startY + 10)
    lineLeft.strokePath()
    this.creditsContainer.add(lineLeft)
    
    // Title
    const titleText = this.add.text(width / 2, startY, title, {
      fontSize: '18px',
      fontFamily: '"Sankofa Display", sans-serif',
      color: '#d4af37',
      fontStyle: 'bold'
    }).setOrigin(0.5)
    this.creditsContainer.add(titleText)
    
    // Decorative line right
    const lineRight = this.add.graphics()
    lineRight.lineStyle(1, 0xd4af37, 0.5)
    lineRight.beginPath()
    lineRight.moveTo(width / 2 + 80, startY + 10)
    lineRight.lineTo(width / 2 + 180, startY + 10)
    lineRight.strokePath()
    this.creditsContainer.add(lineRight)
    
    return startY + 35
  }
  
  addTeamMember(startY, width, member) {
    // Card background
    const cardBg = this.add.graphics()
    cardBg.fillStyle(0x1a1a2e, 0.8)
    cardBg.fillRoundedRect(width / 2 - 180, startY, 360, 70, 10)
    cardBg.lineStyle(2, Phaser.Display.Color.HexStringToColor(member.color).color, 0.6)
    cardBg.strokeRoundedRect(width / 2 - 180, startY, 360, 70, 10)
    this.creditsContainer.add(cardBg)
    
    // Icon
    const icon = this.add.text(width / 2 - 150, startY + 35, member.icon, {
      fontSize: '28px'
    }).setOrigin(0.5)
    this.creditsContainer.add(icon)
    
    // Name
    const nameText = this.add.text(width / 2 + 10, startY + 22, member.name, {
      fontSize: '16px',
      fontFamily: '"Sankofa Display", sans-serif',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5)
    this.creditsContainer.add(nameText)
    
    // Role
    const roleText = this.add.text(width / 2 + 10, startY + 48, member.role, {
      fontSize: '12px',
      fontFamily: '"Agbalumo", cursive',
      color: member.color
    }).setOrigin(0.5)
    this.creditsContainer.add(roleText)
    
    return startY + 85
  }
  
  createSideDecorations(width, height) {
    const sideDecor = this.add.graphics()
    
    // Left side African pattern
    for (let i = 0; i < 8; i++) {
      const y = 80 + i * 45
      sideDecor.lineStyle(1, 0xd4af37, 0.15)
      sideDecor.strokeRect(15, y, 15, 15)
      sideDecor.strokeRect(20, y + 5, 5, 5)
    }
    
    // Right side African pattern
    for (let i = 0; i < 8; i++) {
      const y = 80 + i * 45
      sideDecor.lineStyle(1, 0xd4af37, 0.15)
      sideDecor.strokeRect(width - 30, y, 15, 15)
      sideDecor.strokeRect(width - 25, y + 5, 5, 5)
    }
    
    this.fixedLayer.add(sideDecor)
  }
  
  createBottomUI(width, height) {
    // Gradient fade at bottom
    const bottomGradient = this.add.graphics()
    bottomGradient.fillGradientStyle(0x050508, 0x050508, 0x050508, 0x050508, 0, 0, 1, 1)
    bottomGradient.fillRect(0, height - 90, width, 90)
    this.fixedLayer.add(bottomGradient)
    
    // Back to menu button
    const btnWidth = 180
    const btnHeight = 42
    
    this.menuBtn = this.add.container(width / 2, height - 35)
    this.fixedLayer.add(this.menuBtn)
    
    // Button shadow
    const btnShadow = this.add.graphics()
    btnShadow.fillStyle(0x000000, 0.4)
    btnShadow.fillRoundedRect(-btnWidth / 2 + 3, -btnHeight / 2 + 3, btnWidth, btnHeight, 10)
    this.menuBtn.add(btnShadow)
    
    this.btnBg = this.add.graphics()
    this.btnBg.fillGradientStyle(0xd4af37, 0xd4af37, 0xb8960c, 0xb8960c, 1, 1, 1, 1)
    this.btnBg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 10)
    this.menuBtn.add(this.btnBg)
    
    const btnText = this.add.text(0, 0, '🏠 MAIN MENU', {
      fontSize: '16px',
      fontFamily: '"Sankofa Display", sans-serif',
      color: '#0a0a0a',
      fontStyle: 'bold'
    }).setOrigin(0.5)
    this.menuBtn.add(btnText)
    
    this.menuBtn.setSize(btnWidth, btnHeight)
    this.menuBtn.setInteractive({ useHandCursor: true })
    
    this.menuBtn.on('pointerover', () => {
      this.tweens.add({ targets: this.menuBtn, scale: 1.08, duration: 150 })
      this.btnBg.clear()
      this.btnBg.fillGradientStyle(0xf4cf67, 0xf4cf67, 0xd4af37, 0xd4af37, 1, 1, 1, 1)
      this.btnBg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 10)
    })
    
    this.menuBtn.on('pointerout', () => {
      this.tweens.add({ targets: this.menuBtn, scale: 1, duration: 150 })
      this.btnBg.clear()
      this.btnBg.fillGradientStyle(0xd4af37, 0xd4af37, 0xb8960c, 0xb8960c, 1, 1, 1, 1)
      this.btnBg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 10)
    })
    
    this.menuBtn.on('pointerdown', () => {
      if (this.cache.audio.exists('buttonClick')) {
        this.sound.play('buttonClick')
      }
      this.cameras.main.fadeOut(500, 0, 0, 0)
      this.time.delayedCall(500, () => {
        this.scene.start('MainMenu')
      })
    })
    
    // Scroll hint
    const scrollHint = this.add.text(width / 2, height - 70, '↕ Scroll or wait for auto-scroll', {
      fontSize: '10px',
      fontFamily: '"Agbalumo", cursive',
      color: '#444444'
    }).setOrigin(0.5)
    this.fixedLayer.add(scrollHint)
  }
  
  setupInputHandlers(width, height) {
    // Mouse wheel scroll
    this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY) => {
      this.isScrolling = false
      this.scrollY += deltaY * 0.8
      this.scrollY = Phaser.Math.Clamp(this.scrollY, 0, this.totalCreditsHeight + height)
      this.creditsContainer.y = height - this.scrollY
    })
    
    // Touch drag scroll
    this.isDragging = false
    this.lastPointerY = 0
    
    this.input.on('pointerdown', (pointer) => {
      if (pointer.y < height - 90) {
        this.isDragging = true
        this.isScrolling = false
        this.lastPointerY = pointer.y
      }
    })
    
    this.input.on('pointermove', (pointer) => {
      if (this.isDragging) {
        const deltaY = this.lastPointerY - pointer.y
        this.scrollY += deltaY
        this.scrollY = Phaser.Math.Clamp(this.scrollY, 0, this.totalCreditsHeight + height)
        this.creditsContainer.y = height - this.scrollY
        this.lastPointerY = pointer.y
      }
    })
    
    this.input.on('pointerup', () => {
      this.isDragging = false
    })
  }
  
  createParticles(width, height) {
    // Golden sparkles
    for (let i = 0; i < 15; i++) {
      const x = Phaser.Math.Between(50, width - 50)
      const y = Phaser.Math.Between(height, height + 150)
      const size = Phaser.Math.Between(1, 3)
      const particle = this.add.star(x, y, 5, size / 2, size, 0xd4af37, 0.4)
      
      this.tweens.add({
        targets: particle,
        y: -30,
        alpha: 0,
        rotation: Phaser.Math.DegToRad(180),
        duration: Phaser.Math.Between(8000, 15000),
        repeat: -1,
        delay: Phaser.Math.Between(0, 5000)
      })
    }
    
    // Subtle floating dots
    for (let i = 0; i < 8; i++) {
      const x = Phaser.Math.Between(30, width - 30)
      const y = Phaser.Math.Between(50, height - 50)
      const particle = this.add.circle(x, y, 1, 0xffffff, 0.3)
      
      this.tweens.add({
        targets: particle,
        alpha: 0.1,
        duration: Phaser.Math.Between(2000, 4000),
        yoyo: true,
        repeat: -1,
        delay: Phaser.Math.Between(0, 2000)
      })
    }
  }
  
  update(time, delta) {
    // Auto-scroll credits
    if (this.isScrolling) {
      this.scrollY += (this.scrollSpeed * delta) / 1000
      this.creditsContainer.y = this.cameras.main.height - this.scrollY
      
      // Loop credits when they've scrolled past
      if (this.scrollY > this.totalCreditsHeight + this.cameras.main.height) {
        this.scrollY = 0
        this.creditsContainer.y = this.cameras.main.height
      }
    }
  }
}
