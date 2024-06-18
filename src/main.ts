import './preload';

import { Boot } from './scenes/Boot';
import { Game as MainGame } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';

import { Game, Types } from "phaser";
import { NXLoaderPlugin } from './plugins/loader/NXLoaderPlugin';
import { NXInputPlugin } from './plugins/input/NXInputPlugin';

var gameCanvas = undefined;
var gameParent = 'game-container';

if (Switch !== undefined) { 
    //  @ts-expect-error
    gameCanvas = (screen) as HTMLCanvasElement;
    //  @ts-expect-error
    gameParent = null;
}

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: Phaser.CANVAS,
    canvas: gameCanvas,
    parent: gameParent,
    width: 1280,
    height: 720,
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.NONE
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainGame,
        GameOver
    ],
};

Phaser.Plugins.PluginCache.register('Loader', NXLoaderPlugin, 'load');
Phaser.Plugins.PluginCache.register('InputPlugin', NXInputPlugin, 'input');
export default new Game(config);
