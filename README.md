# buffer-to-base64

A base64 encoder/decoder with `gzip` or `deflate` abilities.

```js
import { encode, decode } from 'buffer-to-base64';

// return a base64 string after compression
const packed = encode(buffer);

// return an ArrayBuffer after decompression
const original = decode(packed);
```

This module goal is to simplify the embedding of *WASM* or other blobs within code as `base64` that can return the original array without bloating space on the file.
