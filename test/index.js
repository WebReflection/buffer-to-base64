import { readFileSync } from 'node:fs';
import test from './test.js';

const buffer = readFileSync('./package.json');

await test(new Uint8Array(buffer).buffer, buffer.toString('base64'));

console.log('✅');
