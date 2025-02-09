// GameOverScene.js

class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    create() {
        // Display final score and time
        this.add.text(200, 200, 'GAME OVER', { fontSize: '48px', fill: '#ff0000' });
        this.add.text(200, 300, `Final Score: ${window.gameData.score}`, { fontSize: '24px', fill: '#ffffff' });
        this.add.text(200, 340, `Time Survived: ${Math.floor(window.gameData.totalTime)} s`, 
            { fontSize: '24px', fill: '#ffffff' }
        );

        // Minimal "credits"
        this.add.text(200, 400,
            'CREDITS:\n' +
            '- Game Programming: (XIFAN LUO)\n' +
            '- Visual Assets: (XIFAN LUO)\n' +
            '- Special Thanks to GuangYang Chen \n' +
            'Press SPACE to Return to Main Menu',
            { fontSize: '18px', fill: '#ffffff' }
        );

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.scene.start('MenuScene');
        }
    }
}
