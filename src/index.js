import style from "./main.css"

import 'phaser'
import { SceneMain } from './assets/js/game/main'

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 640,
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
        // debug: true,
        gravity: { y: 0 }
      }
    },
    scene: [SceneMain]
};

window.game = new Phaser.Game(config)