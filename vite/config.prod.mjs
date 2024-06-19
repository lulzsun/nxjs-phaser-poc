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
                        .replace(/HTMLCanvasElement/g, 'Screen')
                        .replace('= checkBlendMode();', '= false;')
                        .replace('= checkInverseAlpha();', '= false;')
                        .replace(/CanvasPool\.create2D\(this,/g, 'new OffscreenCanvas(')
                        .replace(/CanvasPool\.create2D\(this\)/g, 'new OffscreenCanvas()')
                        .replace(/var orientation = \(screen\).*;/, 'var orientation = false;')
                        .replace(/function\s*\(\s*element\s*,\s*parent\s*\)\s*\{[\s\S]*?var\s+target\s*;/, 'function (element, parent) { return;')
                        .replace(/this\.canvas\.getBoundingClientRect\(\)/g, 'document.body.getBoundingClientRect()')
                        .replace(/var xhr = new XMLHttpRequest\(\);/g, 'return;')
                        .replace(/manager\.canvas\.style\.cursor = manager\.defaultCursor;/, '')
                        // patch fixing text(font) usage
                        .replace(/CanvasPool\.create\(this\)/g, 'new OffscreenCanvas()')
                        , 
                    map: null
                };
            }
            if (id.includes("/image-in-browser/lib/common/string-utils.js")) {
                process.stdout.write(`${id}\n`);
                return { 
                    code: code
                        .replace(/TextDecoder\('latin1'\)/g, 'TextDecoder(\'utf8\')'),
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
    },
    server: {
        port: 8080
    },
    plugins: [
        preprocessor()
    ],
});
