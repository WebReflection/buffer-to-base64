import { encode, decode, stream } from '../esm/index.js';

const assert = (truthy, message) => {
    if (!truthy) throw new Error(message);
};

const equals = (a, b) => {
    const ta = new Uint8Array(a);
    const tb = new Uint8Array(b);
    return ta.length === tb.length && ta.every((v, i) => v === tb[i]);
};

export default (pkg, b64) => Promise.all([
  encode(pkg, '').then(async base64 => {
    assert(
      base64 === b64,
      'encoding with no compression'
    );
  
    let buffer = await decode(base64, '');
    assert(
      equals(pkg, buffer),
      'decoding works'
    );
  
    buffer = await (await stream(base64, {format: ''})).arrayBuffer();
    assert(
      equals(pkg, buffer),
      'non-compressed streaming works'
    );
  }),

  encode(pkg).then(async base64 => {
    assert(
      base64 !== b64,
      'compression works'
    );
    let buffer = await decode(base64);
    assert(
      equals(pkg, buffer),
      'decompression works'
    );
  
    buffer = await (await stream(base64)).arrayBuffer();
    assert(
      equals(pkg, buffer),
      'compressed streaming works'
    );
  }),
]);
