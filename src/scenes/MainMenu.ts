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
        console.log("start - mainmenu create scene");
        this.background = this.add.image(1280/2, 720/2, 'background');

        this.phaserLogo = this.add.image(1280/2, 720/2 - 65, 'phaser-logo');
        this.nxjsLogo = this.add.image(1280/2, 720/2 + 65, 'nxjs-logo');
        this.nxjsLogo.setScale(0.15);

        // this.title = this.add.text(512, 460, 'Main Menu', {
        //     fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
        //     stroke: '#000000', strokeThickness: 8,
        //     align: 'center'
        // }).setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('Game');

        });
        console.log("end - mainmenu create scene");
    }

    update ()
    {
        // console.log("hello world");
    }
}
