const { readFileSync } = require('node:fs');
const { encode, decode } = require('../cjs');

const package = readFileSync('./package.json');

encode(package, '').then(base64 => {
  console.assert(
    base64 === package.toString('base64'),
    'encoding with no compression'
  );
  decode(base64, '').then(buffer => {
    console.assert(
      package.equals(Buffer.from(buffer)),
      'decoding works'
    );
  });
});

encode(package).then(base64 => {
  console.assert(
    base64 !== package.toString('base64'),
    'compression works'
  );
  decode(base64).then(buffer => {
    console.assert(
      package.equals(Buffer.from(buffer)),
      'decompression works'
    );
  });
});
