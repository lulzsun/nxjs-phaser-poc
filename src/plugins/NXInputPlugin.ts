export class NXInputPlugin extends Phaser.Input.InputPlugin {
    constructor(scene: Phaser.Scene) {
        super(scene);
    }

    boot() {
        // @ts-ignore
        super.boot();
        console.log('NXInputPlugin boot called.');
    }

    once(event: string | symbol, fn: Function, context?: any): this {
        if (globalThis.Switch === undefined) {
            return super.once(event, fn, context);
        }
        if (event === 'pointerdown') {
            // @ts-expect-error: nx.js
            screen.addEventListener('touchstart', (event) => {
                if (event.touches.length > 1) {
                    return; // Ignore if touching with more than 1 finger
                }
                fn();
                event.preventDefault();
            }, { once: true });
            return this;
        }
        return super.once(event, fn, context);
    }
}