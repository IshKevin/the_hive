// src/main.js
import Preload from './scenes/Preload.js'
import MainMenu from './scenes/MainMenu.js'
import Tutorial from './scenes/Tutorial.js'
import StoryScene from './scenes/StoryScene.js'
import GameScene from './scenes/GameScene.js'
import EndStory from './scenes/EndStory.js'
import Credits from './scenes/Credits.js'

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 450,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 0 } }
  },
  scene: [
    Preload,
    MainMenu,
    Tutorial,
    StoryScene,
    GameScene,
    EndStory,
    Credits
  ]
}

new Phaser.Game(config)
