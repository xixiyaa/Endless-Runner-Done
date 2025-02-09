// main.js
// create by Xifan Luo (xluo46@ucsc.edu)
/*Multiple Scenes & Transitions (Menu, Land, Ocean, Space, Game Over)
Restart Without Reload (press SPACE in Game Over to return to Menu)
Instructions (shown on the main menu)
Player Input (arrow keys to move, F to fire)
Animated Character (using a sprite sheet—or adapt for your explosion or other asset)
Scrolling Background (tileSprite in each scene)
Collision Detection (Arcade Physics for bullets and enemies)
Looping Background Music (bgMusic.mp3)
At Least Four Sound Effects (collision, explosion, gameover, thrust, plus optional shoot/powerup)
Randomness (enemy spawning, velocities)
Scoring & Survival Time (score increments, time displayed)
Endless Gameplay (SpaceScene runs indefinitely)
Playable 15+ Seconds (progress through Land→Ocean→Space)
No Major Crashes (code runs smoothly)
Credits (shown in the Game Over scene)


CREATIVE TILT
  1) Technically Interesting:
     - We researched and implemented a bouncing enemy ("enemyShip111") 
       with random velocities and collisions, something beyond the 
       straightforward horizontal approach. 
     - This required new physics setup (setBounce, setCollideWorldBounds) 
       and we enjoyed experimenting with random x/y speeds.

  2) Visual / Audio Style:
     - Our game transitions from land to ocean to space, each with unique 
       backgrounds and color-coded UI.
     - We also introduced multiple SFX (shoot, explosion, collision, etc.) 
       and used them to enhance the arcade feel. The final environment 
       is “endless,” which is a fun twist on typical runner games.
*/

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [
      PreloadScene,
      MenuScene,
      LandScene,
      OceanScene,
      SpaceScene,
      GameOverScene
  ],
  physics: {
      default: 'arcade',
      arcade: {
          debug: false
      }
  }
};

const game = new Phaser.Game(config);

// A global data object to track score & time across Scenes, if desired:
window.gameData = {
  score: 0,
  totalTime: 0
};
