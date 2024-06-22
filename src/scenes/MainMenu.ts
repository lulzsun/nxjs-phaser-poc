import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    phaserLogo: GameObjects.Image;
    nxjsLogo: GameObjects.Image;
    title: GameObjects.Text;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.background = this.add.image(1280/2, 720/2, 'background');

        this.phaserLogo = this.add.image(1280/2, 720/2 - 130, 'phaser-logo');
        this.nxjsLogo = this.add.image(1280/2, 720/2 + 30, 'nxjs-logo');
        this.nxjsLogo.setScale(0.2);

        this.title = this.add.text(1280/2, 720/2 + 170, 'Main Menu', {
            fontFamily: 'system-ui', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 1,
            align: 'center'
        }).setOrigin(0.5);


        this.input.once('pointerdown', () => {

            this.scene.start('Game');

        });
    }
}
