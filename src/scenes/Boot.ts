import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        console.log("start - preload boot scene");
        this.load.image('background', 'assets/bg.png');
        console.log("end - preload boot scene");
    }

    create ()
    {
        console.log("start - create boot scene");
        this.scene.start('Preloader');
        console.log("end - create boot scene");
    }
}
