/**
 * @typedef {Object} StreamOptions
 * @property {string} type the response content type that defaults to `application/octet-stream`
 * @property {CompressionFormat | ''} format n optional compression format with `deflate` as default.
 */

/**
 * Given a base64 string, returns a `Response` object and optionally decompress it while streaming.
 * This is the fastest decoding option in this module, but it requires an explicit
 * `await (await response).arrayBuffer()` to retrieve the original buffer.
 * @param {string} base64 a previously encoded base64 representation of a buffer.
 * @param {StreamOptions} options an optional compression format with `deflate` as default.
 * @returns {Promise<Response>} resolves to a response instance usable to stream or await its `body.arrayBuffer()`
 */
export const stream = async (
  base64,
  { type = 'application/octet-stream', format = 'deflate' } = {}
) => {
  const data = 'data:application/octet-stream;base64,' + base64;
  const { body } = await fetch(data);
  return new Response(
    format ? body.pipeThrough(new DecompressionStream(format)) : body,
    { headers: { 'content-type': type } }
  );
};
