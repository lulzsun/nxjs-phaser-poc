export class NXInputPlugin extends Phaser.Input.InputPlugin {
    constructor(scene: Phaser.Scene) {
        super(scene);
    }

    once(event: string | symbol, fn: Function, context?: any): this {
        if (Switch === undefined) {
            return super.once(event, fn, context);
        }
        if (event === 'pointerdown') {
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