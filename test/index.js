import { CompressionStream, DecompressionStream } from '@ungap/compression-stream';
if (!globalThis.CompressionStream) Object.assign(globalThis, { CompressionStream, DecompressionStream });

import { readFileSync } from 'node:fs';
import test from './test.js';

const buffer = readFileSync('./package-lock.json');

await test(new Uint8Array(buffer).buffer, buffer.toString('base64'));

console.log('✅');
