import { Plugins } from "phaser";
const { BasePlugin } = Plugins;

export class NXInputPlugin extends BasePlugin {
    constructor(pluginManager: Phaser.Plugins.PluginManager) {
        super(pluginManager);
        console.log('Constructor was called.');
    }

    init() {
        console.log('Init was called.');
    }

    once(event: string | symbol, fn: Function, context?: any) {
        if (event === 'pointerdown') {
            // @ts-expect-error: nx.js
            screen.addEventListener('touchstart', (event) => {
                if (event.touches.length > 1) {
                    return; // Ignore if touching with more than 1 finger
                }
                fn();
                event.preventDefault();
            }, { once: true });
        }
    }
}