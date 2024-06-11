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

    console.time('no-comp decoding');
    let buffer = await decode(base64, '');
    console.timeEnd('no-comp decoding');

    assert(
      equals(pkg, buffer),
      'decoding works'
    );

    console.time('no-comp streaming');
    buffer = await (await stream(base64, {format: ''})).arrayBuffer();
    console.timeEnd('no-comp streaming');

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

    console.time('comp decoding');
    let buffer = await decode(base64);
    console.timeEnd('comp decoding');

    assert(
      equals(pkg, buffer),
      'decompression works'
    );

    console.time('comp streaming');
    buffer = await (await stream(base64)).arrayBuffer();
    console.timeEnd('comp streaming');

    assert(
      equals(pkg, buffer),
      'compressed streaming works'
    );
  }),
]);
