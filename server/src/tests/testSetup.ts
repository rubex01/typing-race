import '@/server';
import container from "@/container";
import {socketServiceInterface} from "@/services/contracts/socketServiceInterface";
import symbols from "@/symbols";
import {mockSocketService} from "@/tests/mocks/socketService";
import { execSync } from 'child_process';
import {after, before} from "node:test";

before(() => {
    console.log('Running migrations...');
    execSync('npx prisma migrate reset --force --skip-seed', { stdio: 'inherit' });
});

after(() => {
    console.log('Cleaning up test database...');
    execSync('npx prisma migrate reset --force --skip-seed', { stdio: 'inherit' });
});

container.registerSingleton<socketServiceInterface>(symbols.socketServiceInterface, mockSocketService);