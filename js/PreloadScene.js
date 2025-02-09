class PreloadScene extends Phaser.Scene {
  constructor() {
      super('PreloadScene');
  }

  preload() {
      // Load images (single explosion image, no animation)
      this.load.image('bullet', 'assets/bullet.png');
      this.load.image('enemyShip', 'assets/enemy-ship.png');
      this.load.image('rocket', 'assets/rocket.png');

      // NEW: Load the second type of enemy
      this.load.image('enemyShip2', 'assets/enemy-ship2.png');
      this.load.image('enemyShip111', 'assets/enemieship111.png');

      this.load.image('landBg', 'assets/land.png');
      this.load.image('oceanBg', 'assets/ocean.png');
      this.load.image('spaceBg', 'assets/space-bg.png');
      this.load.image('spaceship', 'assets/spaceship.png');
      this.load.image('explosion', 'assets/explosion.png');

      // Audio
      this.load.audio('bgMusic', 'assets/bg-music.mp3');
      this.load.audio('sfxCollision', 'assets/sfx-collision.wav');
      this.load.audio('sfxExplosion', 'assets/sfx-explosion.wav');
      this.load.audio('sfxGameOver', 'assets/sfx-gameover.wav');
      this.load.audio('sfxThrust', 'assets/sfx-thrust.wav');
      this.load.audio('sfxPowerup', 'assets/powerup.wav');
      this.load.audio('sfxShoot', 'assets/shoot.wav');
  }

  create() {
      // No animation creation needed, since explosion.png is a single image
      this.scene.start('MenuScene');
  }
}
