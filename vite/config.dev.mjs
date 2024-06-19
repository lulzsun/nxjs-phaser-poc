import { defineConfig } from 'vite';

export default defineConfig({
    base: './',
    server: {
        port: 8080
    },
    resolve: {
        alias: {
            'nxjs-runtime': '../src/preload.js', // for typing
        },
    },
});
