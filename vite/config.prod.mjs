import { resolve } from 'path';
import { defineConfig } from 'vite';

const preprocessor = () => {
    return {
        name: 'preprocessor',
        buildStart() {
            process.stdout.write(`Building for production...\n`);
        },
        transform(code, id) {
            if (id.includes("/phaser/dist/phaser.js")) {
                process.stdout.write(`${id}\n`);
                return { 
                    code: code
                        // basic patches in order to boot without errors
                        .replace(/HTMLVideoElement/g, 'false')
                        .replace(/HTMLCanvasElement/g, 'OffscreenCanvas')
                        .replace(/document\.createElement\('canvas'\)/g, 'new OffscreenCanvas(1280, 720)')
                        .replace(/var orientation = \(screen\).*;/, 'var orientation = false;')
                        .replace(/function\s*\(\s*element\s*,\s*parent\s*\)\s*\{[\s\S]*?var\s+target\s*;/, 'function (element, parent) { return;')
                        .replace(/this\.canvas\.getBoundingClientRect\(\)/g, 'document.body.getBoundingClientRect()')
                        .replace(/var xhr = new XMLHttpRequest\(\);/g, 'return;')
                        .replace(/manager\.canvas\.style\.cursor = manager\.defaultCursor;/, '')
                        , 
                    map: null
                };
            }
        },
        buildEnd() {
            process.stdout.write(`Done!\n`);
        }
    }
}

export default defineConfig({
    base: './',
    logLevel: 'warning',
    esbuild: {
        pure: ['console.log', 'console.log.apply'],
        minifyIdentifiers: false,
    },
    build: {
        target: 'es2022',
        lib: {
            entry: resolve(__dirname, '../src/main.ts'),
            name: 'nxjs-phaser-poc',
            fileName: () => { return 'nxjs.js' },
            formats: ['esm'],
        },
        minify: 'esbuild',
        sourcemap: false,
        polyfillModulePreload: false,
        assetsDir: 'nxjs-phaser-poc/assets'
    },
    server: {
        port: 8080
    },
    plugins: [
        preprocessor()
    ],
});
