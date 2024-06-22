import { Scene } from 'phaser';

export class GameOver extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameover_text : Phaser.GameObjects.Text;

    constructor ()
    {
        super('GameOver');
    }

    create ()
    {
        this.camera = this.cameras.main
        this.camera.setBackgroundColor(0xff0000);

        this.background = this.add.image(1280/2, 720/2, 'background');
        this.background.setAlpha(0.5);

        this.gameover_text = this.add.text(1280/2, 720/2, 'Game Over', {
            fontFamily: 'system-ui', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 1,
            align: 'center'
        });
        this.gameover_text.setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('MainMenu');

        });
    }
}
