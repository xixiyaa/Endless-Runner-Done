// MenuScene.js

class MenuScene extends Phaser.Scene {
  constructor() {
      super('MenuScene');
  }

  create() {
      this.add.text(120, 200, 'SPACESHIP ENDLESS RUNNER', {
          fontSize: '32px',
          fill: '#ffffff'
      });

      this.add.text(140, 300,
          'Instructions:\n\n' +
          'Arrow Keys to move\n' +
          'F to fire\n' +
          'Press SPACE to begin',
          { fontSize: '20px', fill: '#ff9900' }
      );

      // Listen for space key
      this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      // Reset global data
      window.gameData.score = 0;
      window.gameData.totalTime = 0;


      this.sfxPowerup = this.sound.add('sfxPowerup');
  }

  update() {
      if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {

          this.sfxPowerup.play();
          // Start the "LandScene"
          this.scene.start('LandScene');
      }
  }
}
