import { resolve } from 'path';
import { defineConfig } from 'vite';

const preprocessor = () => {
    return {
        name: 'preprocessor',
        buildStart() {
            process.stdout.write(`Building for production...\n`);
        },
        transform(code, id) {
            if (id.includes("/node_modules/phaser/") || id.includes("/nxjs-phaser-poc/src/")) {
                process.stdout.write(`${id}\n`);
                return { 
                    code: code
                        .replace(/HTMLVideoElement/g, 'false')
                        .replace(/HTMLCanvasElement/g, 'Screen')
                        .replace('= checkBlendMode();', '= false;')
                        .replace('= checkInverseAlpha();', '= false;')
                        .replace(/CanvasPool\.create2D\(this,/g, 'new OffscreenCanvas(')
                        .replace(/CanvasPool\.create2D\(this\)/g, 'new OffscreenCanvas()')
                        .replace(/var orientation = \(screen\).*;/, 'var orientation = false;')
                        .replace(/function\s*\(\s*element\s*,\s*parent\s*\)\s*\{[\s\S]*?var\s+target\s*;/, 'function (element, parent) { return;')
                        .replace(/this\.canvas\.getBoundingClientRect\(\)/g, 'document.body.getBoundingClientRect()')
                        .replace(/var xhr = new XMLHttpRequest\(\);/g, 'return;')
                        // .replace(/document\.createElement\("canvas"\)/g, 'new OffscreenCanvas()')
                        , 
                    map: null
                };
            }
            return;
        },
        buildEnd() {
            process.stdout.write(`Done!\n`);
        }
    }
}

export default defineConfig({
    base: './',
    logLevel: 'warning',
    build: {
        target: 'es2022',
        lib: {
            entry: resolve(__dirname, '../src/main.ts'),
            name: 'nxjs-phaser-poc',
            fileName: () => { return 'nxjs.js' },
            formats: ['esm'],
        },
        minify: false,
        sourcemap: true,
        polyfillModulePreload: false,
    },
    server: {
        port: 8080
    },
    plugins: [
        preprocessor()
    ]
});
