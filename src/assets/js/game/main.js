import 'phaser'
import Player from './classes/player'
import { Align } from './classes/util/align'
const gamePath = './src/assets/images/horror-city/'

export class SceneMain extends Phaser.Scene {
  constructor() {
    super('SceneMain');
  }
  preload () {
    this.load.tilemapTiledJSON(
      'apartment',
      './src/assets/map/apartment.json',
      'null',
      Phaser.Tilemaps.TILED_JSON
    )
    // this.load.image('aptModern', gamePath + 'objects/int/AptModern.png')
    this.load.image('delapidated', gamePath + 'objects/int/Delapidated.png')
    // this.load.image('extrasA', gamePath + 'objects/int/ExtrasA.png')
    // this.load.image('floor', gamePath + 'walls-floors/int/floor.png')
    this.load.image('floor', gamePath + 'walls-floors/int/floor2.png')
    // this.load.image('hospitalAlt', gamePath + 'objects/int/HospitalAlt.png')
    this.load.image('interior', gamePath + 'walls-floors/int/Interior.png')
    this.load.image('bootcampItems', gamePath + 'objects/int/bootCampInterior.png')
    // this.load.image('interiorHospital', gamePath + 'walls-floors/int/InteriorHospital.png')
    // this.load.image('office', gamePath + 'objects/int/OfficeFacility.png')
    // this.load.image('exteriorsA', gamePath + 'walls-floors/ext/PHC-A4-Exterior.png')
    // this.load.image('exteriorsB', gamePath + 'walls-floors/ext/PSF_A3_Exterior.png')
    this.load.image('wallJunctions', gamePath + 'walls-floors/int/wallJunctions.png')
    this.load.image('candleLights', gamePath + 'effects/CandleGlow.png')
    this.load.image('lightGlowB', gamePath + 'effects/LightGlowB.png')
    this.load.image('lightGlowC', gamePath + 'effects/LightGlowC.png')
    this.load.spritesheet(
      'characters',
      gamePath + 'sprites/humans/HC_Humans1B.png',
      {
        frameWidth: 16,
        frameHeight: 32,
        margin: 0,
        spacing: 0
      }
    )
  }

  create () {
    this.map = this.add.tilemap('apartment')
    // const aptModern = this.map.addTilesetImage('AptModern', 'aptModern');
    // const apt = this.add.image(0,0, 'aptModern')
    // Align.scaleToGameW(apt, this.game, 0.5)
    // Align.center(apt, this.game)
    const floor = this.map.addTilesetImage('floor2', 'floor')
    const walls = this.map.addTilesetImage('Interior', 'interior')
    const wallJunctions = this.map.addTilesetImage('wallJunctions', 'wallJunctions')
    const delapidated = this.map.addTilesetImage('Delapidated', 'delapidated')
    const bootcampItems = this.map.addTilesetImage('bootCampInterior', 'bootcampItems')
    const candleLights = this.map.addTilesetImage('CandleGlow', 'candleLights')
    const lightGlowB = this.map.addTilesetImage('LightGlowB', 'lightGlowB')
    const lightGlowC = this.map.addTilesetImage('LightGlowC', 'lightGlowC')
    // this.map.addTilesetImage('floor', 'floor');
    // this.map.addTilesetImage('floor2', 'floor2');
    // this.map.addTilesetImage('HospitalAlt', 'hospitalAlt');
    const livingRoomTiles = [
      bootcampItems,
      delapidated
    ]
    const kitchenTiles = [
      bootcampItems,
      delapidated
    ]
    const wallTiles = [
      walls,
      floor,
      wallJunctions,
      delapidated
    ]
    const lightAndShadows = [
      lightGlowB,
      lightGlowC,
      candleLights
    ]
    this.floorLayer = this.map.createStaticLayer('floor2', floor, 0, 0)
    this.walls = this.map.createStaticLayer('walls', wallTiles, 0, 0)
    this.livingRoomLow = this.map.createStaticLayer('living-room-low', livingRoomTiles, 0, 0)
    this.livingRoom = this.map.createStaticLayer('living-room', livingRoomTiles, 0, 0)
    this.livingRoomUp = this.map.createStaticLayer('living-room-up', livingRoomTiles, 0, 0)
    this.doors = this.map.createStaticLayer('doors', [delapidated], 0, 0)
    this.kitchenLow = this.map.createStaticLayer('kitchen-low', kitchenTiles, 0, 0)
    this.kitchen = this.map.createStaticLayer('kitchen', kitchenTiles, 0, 0)
    this.kitchenUp = this.map.createStaticLayer('kitchen-up', kitchenTiles, 0, 0)
    this.wallsUp = this.map.createStaticLayer('walls-up', wallTiles, 0, 0)
    this.collisions = this.map.createStaticLayer('collisions', candleLights, 0, 0)
    this.shadowsLights = this.map.createStaticLayer('shadows-lights', lightAndShadows, 0, 0)
    this.wallsUp.setDepth(1)
    this.shadowsLights.setDepth(2)
    
    

    const spawnPoint = this.map.findObject("Objects", obj => obj.name === "Spawn point")
    this.player = new Player(this, spawnPoint.x, spawnPoint.y - 14);

    this.collisions.setCollisionByProperty({ collides: true })
    this.collisions.visible = false
    this.physics.add.collider(this.player.sprite, this.collisions)

    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
    const camera = this.cameras.main
    camera.zoom = 2.5
    camera.startFollow(this.player.sprite)

    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
  }

  update(time, delta) {
    this.player.update()
  }
}