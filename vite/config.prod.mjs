import { resolve } from 'path';
import { defineConfig } from 'vite';

const preprocessor = () => {
    return {
        name: 'preprocessor',
        buildStart() {
            process.stdout.write(`Building for production...\n`);
        },
        transform(code, id) {
            if (!id.includes("/node_modules/phaser/") && !id.includes("/nxjs-phaser-poc/src/")) {
                return;
            }
            process.stdout.write(`${id}\n`);
            return { 
                code: code
                    .replace(/HTMLVideoElement/g, 'false')
                    .replace('= checkBlendMode();', '= false;')
                    .replace('= checkInverseAlpha();', '= false;')
                    .replace(/CanvasPool\.create2D\(this,/g, 'new OffscreenCanvas(')
                    .replace(/CanvasPool\.create2D\(this\)/g, 'new OffscreenCanvas()')
                    // .replace('document.createElement("canvas")', 'screen')
                    , 
                map: null
            };
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
