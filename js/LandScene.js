class LandScene extends Phaser.Scene {
  constructor() {
      super('LandScene');
  }

  create() {
      // Music & SFX
      this.bgMusic = this.sound.add('bgMusic', { loop: true, volume: 0.5 });
      if (!this.bgMusic.isPlaying) {
          this.bgMusic.play();
      }
      this.sfxCollision = this.sound.add('sfxCollision');
      this.sfxExplosion = this.sound.add('sfxExplosion');
      this.sfxGameOver = this.sound.add('sfxGameOver');
      this.sfxThrust = this.sound.add('sfxThrust');
      this.sfxShoot = this.sound.add('sfxShoot');

      // Background scroll
      this.bg = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'landBg');
      this.bg.setOrigin(0, 0);

      // Player
      this.player = this.physics.add.sprite(100, this.game.config.height / 2, 'spaceship');
      this.player.setCollideWorldBounds(true);
      
      this.player.setScale(0.3);

      // Bullets group
      this.bullets = this.physics.add.group({
          defaultKey: 'bullet',
          maxSize: 20
      });

      // Enemies group
      this.enemies = this.physics.add.group();

      // Keyboard input
      this.cursors = this.input.keyboard.createCursorKeys();
      this.fireKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

      // Text displays (red, bigger)
      this.scoreText = this.add.text(10, 10, 'Score: 0', {
          fontSize: '28px',
          fill: '#ff0000'
      });
      this.timeText = this.add.text(10, 50, 'Time: 0', {
          fontSize: '28px',
          fill: '#ff0000'
      });

      this.sceneTimer = 0;

      // Colliders/overlaps
      this.physics.add.overlap(this.bullets, this.enemies, this.handleBulletEnemyCollision, null, this);
      this.physics.add.overlap(this.player, this.enemies, this.handlePlayerEnemyCollision, null, this);

      // Spawn an enemy every 1.5 seconds
      this.spawnTimer = this.time.addEvent({
          delay: 1500,
          callback: this.spawnEnemy,
          callbackScope: this,
          loop: true
      });
  }

  update(time, delta) {
      // Scroll background
      this.bg.tilePositionX += 2;

      // Player movement
      if (this.cursors.up.isDown) {
          this.player.setVelocityY(-200);
          this.sfxThrust.play({ volume: 0.1 });
      } else if (this.cursors.down.isDown) {
          this.player.setVelocityY(200);
          this.sfxThrust.play({ volume: 0.1 });
      } else {
          this.player.setVelocityY(0);
      }

      if (this.cursors.left.isDown) {
          this.player.setVelocityX(-200);
      } else if (this.cursors.right.isDown) {
          this.player.setVelocityX(200);
      } else {
          this.player.setVelocityX(0);
      }

      // Firing
      if (Phaser.Input.Keyboard.JustDown(this.fireKey)) {
          this.fireBullet();
      }

      // Clean up bullets off-screen
      this.bullets.children.each(bullet => {
          if (bullet.active && bullet.x > this.game.config.width) {
              bullet.disableBody(true, true);
          }
      }, this);

      // Update time
      let dt = delta / 1000;
      this.sceneTimer += dt;
      window.gameData.totalTime += dt;

      this.scoreText.setText('Score: ' + window.gameData.score);
      this.timeText.setText('Time: ' + Math.floor(window.gameData.totalTime));

      // After ~15 seconds, go to the next scene
      if (this.sceneTimer >= 15) {
          this.scene.start('OceanScene');
      }
  }

  // REVISED: now we randomly choose among three enemies
  spawnEnemy() {
      let randomValue = Math.random();
      let key;
      if (randomValue < 0.22) {
          key = 'enemyShip';
      } else if (randomValue < 0.44) {
          key = 'rocket';
      } else if (randomValue < 0.6 ) {
          key = 'enemyShip2';
      } else {
          key = 'enemyShip111';
      }

      let enemy = this.enemies.create(
          this.game.config.width + 50,
          Phaser.Math.Between(50, this.game.config.height - 50),
          key
      );

      if (key === 'enemyShip') {
        enemy.setScale(0.25);  // or whatever bigger factor you want
      }

      if (key === 'enemyShip111') {
        enemy.setScale(0.25);
        // e.g. move left with random speed between -300 and -150
        // plus random vertical velocity between -100 and 100
        enemy.setVelocity(
            Phaser.Math.Between(-300, -150),
            Phaser.Math.Between(-100, 100)
        );
        // Let it bounce around
        enemy.setBounce(1, 1);
        enemy.setCollideWorldBounds(true);
    } else {
        // Otherwise, just do the original horizontal velocity
        enemy.setVelocityX(Phaser.Math.Between(-200, -300));
        enemy.setCollideWorldBounds(false);
    }

      //enemy.setScale(1.5);
      enemy.setVelocityX(Phaser.Math.Between(-200, -300));
      enemy.setCollideWorldBounds(false);
  }

  fireBullet() {
      let bullet = this.bullets.get(this.player.x + 20, this.player.y);
      if (bullet) {
          bullet.enableBody(true, this.player.x + 20, this.player.y, true, true);
          bullet.setVelocityX(400);
          bullet.body.setAllowGravity(false);
          bullet.setCollideWorldBounds(false);

          this.sfxShoot.play();
      }
  }

  handleBulletEnemyCollision(bullet, enemy) {
      bullet.disableBody(true, true);
      enemy.disableBody(true, true);

      this.sfxExplosion.play();
      let explosionSprite = this.add.image(enemy.x, enemy.y, 'explosion');
      this.time.delayedCall(300, () => {
          explosionSprite.destroy();
      });

      window.gameData.score += 10;
  }

  handlePlayerEnemyCollision(player, enemy) {
      this.sfxCollision.play();
      this.sfxGameOver.play();
      this.scene.start('GameOverScene');
  }
}
