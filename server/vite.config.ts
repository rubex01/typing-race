/// <reference types="vitest" />
import { defineConfig } from 'vite';
import path from "path";
import dotenv from 'dotenv';

dotenv.config({ path: '.env.testing' });

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