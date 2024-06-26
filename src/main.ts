import './preload';
import './phaser';

import { Boot } from './scenes/Boot';
import { Game as MainGame } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';

import { Game, Types } from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: Phaser.CANVAS,
    canvas: Switch !== undefined ? screen : undefined,
    parent: Switch !== undefined ? null : 'game-container',
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

export default new Game(config);
