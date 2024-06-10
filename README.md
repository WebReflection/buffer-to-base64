# buffer-to-base64

[![build status](https://github.com/WebReflection/buffer-to-base64/actions/workflows/node.js.yml/badge.svg)](https://github.com/WebReflection/buffer-to-base64/actions) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/buffer-to-base64/badge.svg?branch=main)](https://coveralls.io/github/WebReflection/buffer-to-base64?branch=main)

A base64 encoder/decoder with `gzip` or `deflate` abilities.

```js
import { encode, decode } from 'buffer-to-base64';

// return a base64 string after compression
const packed = await encode(buffer);

// return an ArrayBuffer after decompression
const original = await decode(packed);
```

This module goal is to simplify the embedding of *WASM* or other blobs within code as `base64` that can return the original array without bloating space on the file.
