import { Scene } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(1280/2, 720/2, 'background');
        this.background.setAlpha(0.5);

        this.msg_text = this.add.text(1280/2, 720/2, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
            fontFamily: 'system-ui', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 1,
            align: 'center'
        });
        this.msg_text.setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });
    }
}
