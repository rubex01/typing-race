/// <reference types="vitest" />
import { defineConfig } from 'vite';
import path from "path";

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        setupFiles: './src/tests/testSetup.ts',
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});